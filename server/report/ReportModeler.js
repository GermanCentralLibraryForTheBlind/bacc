const mustache = require('mustache');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const _ = require('underscore');

const logger = require('./../logger');
const Localise = require('./locales/Localise');

const REPORT_SYTLE = 'report.css';
const PATH_TO_TEMPLATE_REPORT = __dirname + '/report.mustache';
const BACC_REPORT = '/bacc_report.html';


class Impact {

  constructor() {
    this.init();
  }

  init() {
    this._impacts = {
      critical: {'name': 'critical', 'color': 'Red'},
      serious: {'name': 'serious', 'color': 'Orange'},
      moderate: {'name': 'moderate', 'color': 'Yellow'},
      minor: {'name': 'minor', 'color': 'GreenYellow'}
    };
  }

  getAccessibilityLevel(aceData) {

    let iLevel = {'name': 'no', 'color': 'Green'}; // default no impact
    const aceDataAsString = JSON.stringify(aceData);

    const impactLevels = this._impacts;

    for (let prop in impactLevels)
      if (aceDataAsString.indexOf(prop) >= 0) {
        iLevel = impactLevels[prop];
        break;
      }

    return iLevel;
  }
}


class ReportModeler {

  constructor(output, lang) {
    this._output = output;
    this._language = lang || 'en';
    this._impacts = new Impact();
  }

  // private ???
  loadAceOutput() {
    this._aceData = require(this._output + '/ace.json');
  }

  generateReport() {

    let dataToRender = {};
    // TODO own mapper module
    dataToRender.groups = this.getBACCReportData().groups;
    dataToRender.outlines = this._aceData.outlines;
    dataToRender.images = this._aceData.data.images;

    // console.log(JSON.stringify(dataToRender));
    dataToRender = new Localise()
      .setReportData(dataToRender)
      .setLocale(this._language)
      .build();

    const reportTemplate = fs.readFileSync(PATH_TO_TEMPLATE_REPORT, 'utf-8');
    const output = mustache.render(reportTemplate.toString(), dataToRender);
    fs.writeFileSync(this._output + BACC_REPORT, output, 'utf-8');

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
  getBACCReportData() {

    let violations = [];

    const violationsGroupedBySpineItem = this._aceData.assertions;

    for (let i in violationsGroupedBySpineItem) {

      let violationsInSpineItem = violationsGroupedBySpineItem[i];
      let spineItem = violationsInSpineItem["earl:testSubject"].url;
      console.log('spineItem: ' + spineItem);

      for (let j in violationsInSpineItem.assertions) {

        let violation = violationsInSpineItem.assertions[j];

        violation['earl:test'].assertedBy = violation['earl:assertedBy'];
        violation['earl:test'].spineItem = spineItem;

        console.log('assertedBy: ' + violation['earl:test'].assertedBy);
        violations.push(violation['earl:test']);
      }
    }
    return this.makeViolationGroups(violations);
  }

  makeViolationGroups(violations) {

    let groupedByViolation = _.groupBy(violations, 'dct:title');

    let baccData = {};
    baccData.groups = [];

    _(groupedByViolation).each(function (elem, key) {
      let group = {};

      if (elem.length == 0)
        logger.log('error', 'Found no violations in group!');

      group.name = key;
      group.violations = elem;
      group.assertedBy = elem.length > 0 ? elem[0].assertedBy : 'No violations in group!';
      group.violations.map(function (vio, i) {
        vio.index = i + 1
      }); // attention real index used
      group.count = group.violations.length;
      baccData.groups.push(group);
      // todo: delete 'dct:title'
    });

    return baccData;
  }

  // mv report style to upload folder
  copyReportStyle() {
    try {
      fsExtra.copySync(path.resolve(__dirname, REPORT_SYTLE), path.join(this._output, '../' + REPORT_SYTLE));
    } catch (err) {
      logger.log('error', err);
    }
  }

  // public
  build() {

    this.loadAceOutput();
    const aLevel = this._impacts.getAccessibilityLevel(this._aceData);
    this.generateReport();
    this.copyReportStyle();

    const Report = {
      aLevel: aLevel,
      path: this._output + BACC_REPORT
    };

    return Report;
  }
}

module.exports = ReportModeler;
