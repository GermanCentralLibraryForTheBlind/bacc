// const decache = require('decache');
const spawn = require('child-process-promise').spawn;
const path = require('path');

const logger = require('./logger');
const ReportModeler = require('./report/ReportModeler');

const aceModule = path.join(__dirname, '/node_modules/ace-core/dist/cli/cli.js');


class Baccify {

  constructor() {
  }

  setOutputPath(value) {
    this._output = value;
    return this;
  }

  setInputFile(value) {
    this._input = value;
    return this;
  }

  check() {

    const that = this;

    return new Promise(function (resolve, reject) {

      that.runAce()
        .then((result) => {

          logger.log('info', 'ace:stdout:\n' + result.stdout.toString());

          const r = new ReportModeler(that._output);
          resolve(r.build());
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  runAce() {
    return spawn('node', [aceModule, '-o', this._output, this._input], {capture: ['stdout', 'stderr']});
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
