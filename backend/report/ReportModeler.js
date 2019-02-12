const mustache = require('mustache');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const _ = require('underscore');
const glob = require('glob');

const logger = require('../helper/logger');
const Localise = require('./Localise');
const constants = require('../constants');
const util = require('../helper/util');

const guidelineTags = {wcag2a: 'WCAG 2.0 A', wcag2aa: 'WCAG 2.0 AA'};
let epubVersion = "3.0"; // how we can this dynamically. From Ace?

class Impact {

  constructor() {
    this.init();
  }

  init() {

    this._impacts = {
      critical: {'name': 'critical', 'baccName': 'veryStrong', 'color': 'Red', 'level': 4},
      serious: {'name': 'serious', 'baccName': 'strong', 'color': 'Orange', 'level': 3},
      moderate: {'name': 'moderate', 'baccName': 'partially', 'color': 'Yellow', 'level': 2},
      minor: {'name': 'minor', 'baccName': 'minor', 'color': 'GreenYellow', 'level': 1},
    };
  }

  getAccessibilityImpactLevel(impact) {
    return this._impacts[impact];
  }
}


class ReportModeler {

  constructor(outputPath, lang) {
    this._outputPath = outputPath;
    this._language = lang || 'en';
    this._impacts = new Impact(lang);
    this.statistics = {};
    this._totalAccessibilityLevel = {'name': 'no', 'baccName': 'none', 'color': 'Green', 'level': 0}; // default no impact
  }

  // private ???
  loadAceOutput() {
    this._aceData = require(this._outputPath + constants.ACE_REPORT);
  }

  updateTotalAccessibilityImpactLevel(assertion) {

    if (this.isHint(assertion))
      return;

    const impact = assertion["earl:test"]["earl:impact"];
    const impactDefintion = this._impacts.getAccessibilityImpactLevel(impact);

    if (impactDefintion.level > this._totalAccessibilityLevel.level)
      this._totalAccessibilityLevel = impactDefintion;
  }

  generateReport() {

    // TODO own mapper module
    let reportData = this.getDataForReport();
    reportData.lang = "en";
    reportData.outlines = this.setOwnOutlinesStyle(this._aceData.outlines);
    reportData.images = this._aceData.data.images;

    this.statistics.cover = reportData.images ? reportData.images[0] : '';

    reportData = new Localise()
      .setReportData(reportData)
      .setLocale(this._language)
      .build();

    // console.log(JSON.stringify(reportData), undefined, 2);
    const reportTemplate = fs.readFileSync(constants.PATH_TO_TEMPLATE_REPORT, 'utf-8');

    var partials = {};
    const files = glob.sync('./report_partials/*.mustache', {cwd: __dirname});
    files.forEach((file) => {
      partials[path.basename(file, '.mustache')] = fs.readFileSync(path.join(__dirname, file), 'utf-8')
    });

    const output = mustache.render(reportTemplate.toString(), reportData, partials);
    const reportPath = this._outputPath + constants.BACC_REPORT;
    fs.writeFileSync(reportPath, output, 'utf-8');
    this.statistics.reportPath = reportPath;

    util.addToStatistics(this.statistics)
  }


  setOwnOutlinesStyle(outlines) {
    // console.log(outlines);
    if (outlines.toc)
      outlines.toc = outlines.toc.replace(/<ol(.*?)>/g, '<ul $1>').replace(/<\/ol>/g, '</ul>');
    if (outlines.html) {
      outlines.html = outlines.html.replace(/<ol>/g, '<ul>').replace(/<\/ol>/g, '</ul>');//<ol style="list-style-type:none">');//.replace(/<\/ol>/g,'</ul>');
      outlines.html = outlines.html.replace(/<li><ul>/g, '').replace(/<\/ul><\/li>/g, '<\/ul>');
    }
    return outlines;
  }

  // todo: make ace-> bacc mapper module -> ReportData
  // Ace comes with a list of violation grouped by spineitem. But atm groups of violations types preferred.
  // Means group all violations of the same type independent in which spine item it was find.
  // That makes possible for the user to start to fix all violation of the same type for the whole epub and he don't
  // switch between different violation topics. The assumption is a good usability for our users...
  // But occurrence of violation grouped is also very interesting ... maybe a switcher can here help

// ace mapping to bacc output example
//   {
//     "groups": [
//       {
//         "name": "bypass",
//         "violations": [ { "earl:impact": "critical",
//             "dct:title": "bypass",
//             "dct:description": "...", "helpUrl": "...",
//             "spineItem": "Text/epub-html-math.xhtml"
//           }
//         ],
//         "count": 1
//       },
//       {
//         "name": "document-title",
//         "violations": [ ... ],
//         "count": 1
//       },
//       {
//         "name": "html-has-lang",
//         "violations": [ ... , ...],
//         "count": 2
//       }
//     ]
//   }
  getDataForReport() {

    let assertions = [];

    const violationsGroupedBySpineItem = this._aceData.assertions;

    for (let i in violationsGroupedBySpineItem) {

      let violationsInSpineItem = violationsGroupedBySpineItem[i];
      let spineItem = violationsInSpineItem["earl:testSubject"].url;
      // console.log('spineItem: ' + spineItem);

      for (let j in violationsInSpineItem.assertions) {

        let assertion = violationsInSpineItem.assertions[j];

        this.updateTotalAccessibilityImpactLevel(assertion);

        // assertedBy Ace or Axe or ...
        assertion['earl:test'].assertedBy = assertion['earl:assertedBy'];
        if (assertion['earl:test'].assertedBy === 'Ace')
          assertion['earl:test'].help['dct:description'] = assertion['earl:test']['dct:description'];

        assertion['earl:test'].shortHelp = this.formatHelp(assertion['earl:result']['dct:description']);
        assertion['earl:test'].spineItem = spineItem;
        assertion['earl:test'].code = assertion['earl:result']['html'];

        if (assertion['earl:test'].code)
          assertion['earl:test'].code = assertion['earl:test'].code.replace('\n', '').replace(/\s+/g, ' ');

        assertions.push(assertion['earl:test']);
      }
    }
    return this.aceBaccMapping(assertions);
  }

  formatHelp(help) {

    if (!help)
      return help;

    help = help.replace(/</g, '&lt;');
    help = help.replace(/>/g, '&gt;');
    help = help.replace(/&lt;/g, '<i>&lt;');
    help = help.replace(/&gt;/g, '&gt;</i>');

    const helpItems = help.split("\n");

    if (helpItems.length <= 1)
      return help;

    let ul = '';

    helpItems.forEach(function (item) {

      if (item === "")
        return;

      if (item.indexOf("Fix") > -1 || item.indexOf("Korrigiere") > -1) {
        ul += ("</ul>");
        ul += item;
        ul += "<ul>";
      } else
        ul += ("<li>" + item + "</li>");
    });

    ul += ("</ul>");
    return ul;
  }

  guidelineTagForHumans(tag) {

    let found = _.intersection(Object.keys(guidelineTags), tag);
    return found.length > 0 ? guidelineTags[found] : tag.join();
  }


  isHint(assertion) {
    return assertion["earl:test"].rulesetTags.includes('hints');
  }

  extractHints(rule, bacc) {

    if (rule.ruleSet === 'hints') {
      bacc.groups.totalCountHints += rule.count;
      bacc.groups.hints.push(rule);
      this.isEPUB2(rule);

    } else {
      bacc.groups.totalCountRules += rule.count;
      bacc.groups.rules.push(rule);
    }

  }

  isEPUB2(rule) {

    try {
      if (rule.fails[0]['dct:title'] === "epub-version") {
        epubVersion = "2.0";
      }
    } catch (e) {
      logger.log('error', e);
    }

  }

  aceBaccMapping(results) {

    /*
    To get an better data overview all assertions are grouped by rule
    */
    let groupedByTitle = _.groupBy(results, 'dct:title');

    // console.log(JSON.stringify(groupedByViolation, null, '\t'));

    let bacc = {};
    bacc.version = constants.BACC_VERSION;
    this.statistics.checkDate = bacc.checkDate = this._aceData['dct:date'];
    this.statistics.fileName = bacc.fileName = this._aceData['earl:testSubject'].url;
    this.statistics.metaData = bacc.metaData = this._aceData['earl:testSubject'].metadata;
    this.statistics.impact = bacc.totalAccessibilityLevel = this._totalAccessibilityLevel;

    this.statistics.title = bacc.metaData['dc:title'];

    bacc.groups = {};
    bacc.groups.rules = [];
    bacc.groups.hints = [];
    bacc.groups.totalCountRules = 0;
    bacc.groups.totalCountHints = 0;


    _(groupedByTitle).each((elem, key) => {

      // console.log(elem);
      let rule = {};

      if (elem.length == 0) {
        logger.log('error', 'Found no violations in group!');
        return;
      }
      // name of rule
      rule.name = key;
      // grouped assertions
      rule.fails = elem;
      rule.impact = this._impacts.getAccessibilityImpactLevel(elem[0]['earl:impact']);
      // engine axe or ace
      rule.assertedBy = elem[0].assertedBy;
      // add index
      rule.fails.map(function (vio, i) {
        vio.index = i + 1
        // attention violation counter start on 1
      });
      // total count of rule fails
      rule.count = rule.fails.length;
      // add guideline
      const that = this;
      rule.ruleSet = that.guidelineTagForHumans(elem[0].rulesetTags);

      this.extractHints(rule, bacc);
      // todo: delete 'dct:title'
    });

    this.statistics.epubVersion = bacc.epubVersion = epubVersion;

    // sort rule violation by impact level ascending
    bacc.groups.rules = _.sortBy(bacc.groups.rules, obj => obj.impact.level).reverse();

    this.statistics.totalCount = bacc.groups.totalCountRules;
    // console.log(JSON.stringify(bacc, null, '\t'));
    return bacc;
  }

// public
  build() {

    this.loadAceOutput();
    this.generateReport();

    const Report = {
      aLevel: this._totalAccessibilityLevel,
      path: this._outputPath + constants.BACC_REPORT
    };

    return Report;
  }
}

module.exports = ReportModeler;
