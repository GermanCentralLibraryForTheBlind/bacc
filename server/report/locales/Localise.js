// TODO: This json files should be loaded only onetime at startup of web service
const baccDE = require('./bacc_de.json');
const baccEN = require('./bacc_en.json');
const axeDE = require('./axe_de.json');
const aceDE = require('./ace_de.json');

class Localise {

  constructor() {}

  setReportData(value) {
    this._data = value;
    return this;
  }

  setLocale(value) {
    this._locale = value;
    return this;
  }

  localiseRuleDescription(lang) {

    const groups = this._data.groups;
    let locale = axeDE;
    // console.log(groups)
    for (let i in groups) {
      // aXe
      if (groups[i].assertedBy === 'aXe')
        locale = axeDE;
      // Ace
      else if (groups[i].assertedBy === 'Ace')
        locale = aceDE;
      else
        logger.log('error', 'Rule description localisation: assertedBy not valid.');

      groups[i].violations.map((obj) => {
        obj['dct:description'] = locale.rules[groups[i].name].description;
      })
    }
    // console.log(JSON.stringify(groups));
  }

  localiseBACCLabeling(lang) {

    this._data.labeling = baccEN.labeling;

    if (lang === 'de')
      this._data.labeling = baccDE.labeling;
  }

  build() {

    this.localiseRuleDescription(this._locale);
    this.localiseBACCLabeling(this._locale);

    return this._data;
  }
}

module.exports = Localise;
