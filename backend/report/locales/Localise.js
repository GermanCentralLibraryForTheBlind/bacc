// TODO: This json files should be loaded only onetime at startup of web service
const baccDE = require('./bacc_de.json');
const baccEN = require('./bacc_en.json');
const axeDE = require('./axe_de.json');
const aceDE = require('./ace_de.json');

const logger = require('../../helper/logger');

// default language is english
class Localise {

  constructor() {
  }

  setReportData(value) {
    this._data = value;
    return this;
  }

  setLocale(value) {

    if (value !== 'de' && value !== 'en')
      logger.log('warn', 'Unsupported language:' + value);

    this._locale = value || 'en';
    logger.log('info', 'Report localisation ' + this._locale);
    return this;
  }

  localiseRuleDescription(lang) {

    // default en
    if (lang !== 'de')
      return;

    this._data.lang = lang;

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

      const translatedRule = locale.rules[groups[i].name]

      if (translatedRule == undefined) {
        logger.log('warn', 'No translation found for rule ' + groups[i].name + ' from ' + groups[i].assertedBy);
        continue;
      }

      if (groups[i].assertedBy === 'Ace') {

        const localeDescription = translatedRule.description;


        if (localeDescription !== "No translation") {
          groups[i].violations.map((obj) => {
            obj['dct:description'] = localeDescription;
            obj['shortHelp'] = localeDescription;
          })
        }
      }
    }

    // console.log(JSON.stringify(groups));
  }

  setDefaultBACCLabeling() {

    this._data.labeling = baccEN.labeling;
  }

  localiseImpactLabel(lang) {

    var locale = baccEN;
    if (lang === 'de')
      locale = baccDE;

    this._data.totalAccessibilityLevel.label = locale.accessibilityLimitation[this._data.totalAccessibilityLevel.baccName];

    const groups = this._data.groups;
    for (let i in groups)
      groups[i].impact.label = locale.accessibilityLimitation[groups[i].impact.baccName]
  }

  localiseBACCLabeling(lang) {

    if (lang === 'de')
      this._data.labeling = baccDE.labeling;
    else
      logger.log('warn', 'Unsupported language:' + lang);
  }


  build() {

    this.setDefaultBACCLabeling();
    this.localiseImpactLabel(this._locale);
    this.localiseRuleDescription(this._locale);
    this.localiseBACCLabeling(this._locale);

    return this._data;
  }
}

module.exports = Localise;
