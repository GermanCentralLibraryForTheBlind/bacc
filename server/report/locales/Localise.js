// TODO: This json files should may load only onetime at startup the web service
const localDE = require('./bacc_de.json');
const axeDE = require('./axe_de.json');

class Localise {

  constructor() {
    this.setup();
  }

  setup() {

    this._locale_en = {
      labeling: {
        greetings: "Have a good day!",
        violation: "Violation",
        count: "Count",
        outlines: "Outlines",
        imgDescription: "Image description",
        details: "Details",
        impact: "Impact of Accessibility",
        help: "More help",
        code: "Source Code",
        tocEPUB: "EPUB Table of Contents",
        headingsOutline: "Headings outline",
        htmlOutline: "HTML outline",
        description: "Description",
        image: "Image",
        location: "Location"
      }
    };

    this._locale_de = localDE;
  }

  setReportData(value) {
    this._data = value;
    return this;
  }

  setLocale(value) {
    this._locale = value;
    return this;
  }

  build() {

    this._data.labeling = this._locale_en.labeling;

    if (this._locale === 'de')
      this._data.labeling = this._locale_de.labeling;

    return this._data;
  }
}

module.exports = Localise;
