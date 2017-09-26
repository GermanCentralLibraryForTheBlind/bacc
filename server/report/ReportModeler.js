const mustache = require('mustache');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const REPORT_SYTLE = 'report.css';
const PATH_TO_TEMPLATE_REPORT = __dirname + '/report.mustache';


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

    const object_to_render = {greetings: "Have a good day!"};
    const reportTemplate = fs.readFileSync(PATH_TO_TEMPLATE_REPORT, 'utf-8');
    const output = mustache.render(reportTemplate.toString(), object_to_render);
    fs.writeFileSync(this._output + '/report1.html', output, 'utf-8');

  }

  // mv report style to upload folder
  copyReportStyle() {
    try {
      fsExtra.copySync(path.resolve(__dirname, REPORT_SYTLE), path.join(this._output, '../' + REPORT_SYTLE));

      console.log('success!')
    } catch (err) {
      console.error(err)
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
      path: this._output + '/report1.html'
    };

    return Report;
  }
}

module.exports = ReportModeler;
