const mustache = require('mustache');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const _ = require('underscore');

const logger = require('./../logger');

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

  constructor(output) {
    this._output = output;
    this._impacts = new Impact();
  }

  // private ???
  loadAceOutput() {
    this._aceData = require(this._output + '/ace.json');
  }

  generateReport() {

    const datatoRender = {greetings: "Have a good day!"};
    datatoRender.headers = ["Violation", "Count"];
    datatoRender.groups = this.getBACCReportData().groups;

    const reportTemplate = fs.readFileSync(PATH_TO_TEMPLATE_REPORT, 'utf-8');
    const output = mustache.render(reportTemplate.toString(), datatoRender);
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
// "dct:title": "bypass",
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

      let spineItemViolations = violationsGroupedBySpineItem[i];
      let spineItem = spineItemViolations["earl:testSubject"].url;


      for (let j in spineItemViolations.assertions) {
        let violation = spineItemViolations.assertions[j];

        violations.push(violation['earl:test']);
        violations[j].spineItem = spineItem;
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
      group.name = key;
      group.violations = elem;
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
    this.getBACCReportData();
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
