class Impact {

  constructor() {
    this.init();
  }

  init() {
    this._impacts = {
      critical: {'name': 'critical', 'color': 'Red'},
      serious: {'name': 'serious', 'color': 'OrangeRed'},
      moderate: {'name': 'moderate', 'color': 'Orange'},
      minor: {'name': 'minor', 'color': 'Yellow'}
    };
  }

  getImpactLevel(aceData) {

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
    this._aceData = require('./../' + this._output + '/ace.json');
  }


  // public
  build() {
    this.loadAceOutput();
    const iLevel = this._impacts.getImpactLevel(this._aceData);


    return this._output;
  }
}

module.exports = ReportModeler;
