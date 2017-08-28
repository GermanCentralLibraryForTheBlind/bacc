// const decache = require('decache');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const aceModule = path.join(__dirname, '/node_modules/ace-core/dist/cli/cli.js');

// class Baccify {
//
//   // const _input;
//   // const _output;
//
//   constructor() {
//   }
//
//   set output(value) {
//     this._output = value;
//     return this;
//   }
//
//   set input(value) {
//     this._input = value;
//     return this;
//   }
//
//   check() {
//     return spawn('node', [aceModule, '-o', this._output, this._input], {capture: ['stdout', 'stderr']})
//   }
// }


function baccify(input, output) {
  //
  // const aceModule = '/home/alan/workspace/ace-core-fork/dist';
  // // nightmare.end(...)
  // // A little bit hacky stuff: ATM ace module need to re-require for every checking task.
  // // Because ace close internally nightmare(electron) after the report is generated.
  // // If ace will be invoked again - nightmare come no more up...
  // // So the module need to be deached and require again
  // decache(aceModule);
  //
  // const ace = require(aceModule);
  //
  // return ace(input, {
  //   cwd: process.cwd(),
  //   outdir: output,
  //   tmpdir: ''
  // });
  return spawn('node', [aceModule, '-o', output, input], { capture: [ 'stdout', 'stderr' ]})

}

module.exports = baccify;
