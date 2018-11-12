// TODO: This json files should be loaded only onetime when the service is lift up
const baccDE = require('../locales/bacc_de.json');
const baccEN = require('../locales/bacc_en.json');
const axeDE = require('../locales/axe_de.json');
const aceDE = require('../locales/ace_de.json');

const logger = require('../helper/logger');

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

    // console.log(JSON.stringify(this._data.groups));
    this.translate(this._data.groups.rules);
    this.translate(this._data.groups.hints);
  }


  translate(set) {

    let locale = axeDE;

    for (let j in set) {

      // aXe
      if (set[j].assertedBy === 'aXe')
      // It is not really required to load the local axe file. Because it will be directly
      // build into axe-lib during the post install. But it is good to check that all axe rules are translated.
        locale = axeDE;
      // Ace
      else if (set[j].assertedBy === 'Ace')
        locale = aceDE;
      else
        logger.log('error', 'Rule description localisation: assertedBy not valid.');

      var translatedRule = locale.rules[set[j].name];
      /* #### hack #### */
      if (set[j].name === "pagebreak-label" || set[j].name === "epub-type-has-matching-role") {
        set[j].assertedBy = 'Ace';
        locale = aceDE;
        translatedRule = locale.rules[set[j].name];
      }

      if (translatedRule == undefined) {
        logger.log('warn', 'No translation found for rule ' + set[j].name + ' from ' + set[j].assertedBy);
        continue;
      }

      if (set[j].assertedBy === 'Ace') {

        set[j].fails.map((obj) => {
          obj.help['dct:description'] = translatedRule.help;
          // obj['dct:description'] = translatedRule.description;
          obj['shortHelp'] = translatedRule.optimize;
        })
      }
    }
     // console.log(JSON.stringify(set));
  }

  setDefaultBACCLabeling() {

    this._data.labeling = baccEN.labeling;
  }

  localiseImpactLabel(lang) {

    var locale = baccEN;
    if (lang === 'de')
      locale = baccDE;

    this._data.totalAccessibilityLevel.label = locale.accessibilityLimitation[this._data.totalAccessibilityLevel.baccName];

    const rules = this._data.rules;
    for (let i in rules) {
      if (!rules[i].impact) {
        logger.log('warn', 'Unsupported impact identifier:' + rules[i].impact);
        return;
      }
      rules[i].impact.label = locale.accessibilityLimitation[rules[i].impact.baccName]
    }
  }

  localiseBACCLabeling(lang) {

    if (lang === 'en')
      return;

    if (lang === 'de')
      this._data.labeling = baccDE.labeling;
    else
      logger.log('warn', 'Unsupported language:' + lang);
  }

  replaceLocaliseHintsHelpText() {
    // hack to fit axe failureMessage for our hints
    try {

      let pattern = /<\/ul>.*?<ul>/;
      this._data.groups.hints.forEach((hint) => {
        hint.fails.forEach((fail) => {

          let newText = '';
          if (fail.shortHelp.indexOf("Fix") > -1)
            newText = baccEN.labeling.checkHints;

          if (fail.shortHelp.indexOf("Korrigiere") > -1)
            newText = baccDE.labeling.checkHints;

          if (newText)
            fail.shortHelp = fail.shortHelp.replace(pattern, '<\/ul>' + newText + '<ul>');
        });
      });
    } catch (err) {
      logger.log('error', err);
    }
  }


  build() {

    this.setDefaultBACCLabeling();
    this.localiseImpactLabel(this._locale);
    this.localiseRuleDescription(this._locale);
    this.localiseBACCLabeling(this._locale);
    this.replaceLocaliseHintsHelpText();

    return this._data;
  }
}

module.exports = Localise;
