// const decache = require('decache');
const spawn = require('child-process-promise').spawn;
const fs = require('fs');
const logger = require('./helper/logger');
const ReportModeler = require('./report/ReportModeler');
const constants = require('./constants');


class Baccify {

  constructor() {
  }

  setOutputPath(value) {
    this._outputPath = value;
    return this;
  }

  setInputFile(value) {
    this._inputPath = value;
    return this;
  }

  setLanguage(value) {
    this._language = value || 'en';
    return this;
  }

  check() {

    const that = this;

    return new Promise(function (resolve, reject) {

      try {
        that.patchAceLocale(that._language);
      }
      catch (e) {
        logger.log('error', 'patch locale: ' + e);
      }

      that.runAce()
        .then((result) => {

          logger.log('info', 'ace:stdout:\n' + result.stdout.toString());

          const r = new ReportModeler(that._outputPath, that._language);
          resolve(r.build());
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  runAce() {
    return spawn('node', [constants.ACE, '-o', this._outputPath, this._inputPath], {capture: ['stdout', 'stderr']});
  }

  patchAceLocale(lang) {

    var locale = __dirname + '/report/locales/ace_patch/checker-chromium.js';

    if (lang === 'de')
      locale = __dirname + '/report/locales/ace_patch/checker-chromium-de.js';

    const dest = __dirname + '/node_modules/ace-core/packages/ace-core/lib/checker/checker-chromium.js';

    fs.writeFileSync(dest, fs.readFileSync(locale));

  }
}

module.exports = Baccify;

// function baccify(setInputFile, setOutputPath) {
//   //
//   // const aceModule = '/home/alan/workspace/ace-core-fork/dist';
//   // // nightmare.end(...)
//   // // A little bit hacky stuff: ATM ace module need to re-require for every checking task.
//   // // Because ace close internally nightmare(electron) after the report is generated.
//   // // If ace will be invoked again - nightmare come no more up...
//   // // So the module need to be deached and require again
//   // decache(aceModule);
//   //
//   // const ace = require(aceModule);
//   //
//   // return ace(setInputFile, {
//   //   cwd: process.cwd(),
//   //   outdir: setOutputPath,
//   //   tmpdir: ''
//   // });
//   return spawn('node', [aceModule, '-o', setOutputPath, setInputFile], { capture: [ 'stdout', 'stderr' ]})
//
// }
//
// module.exports = baccify;
