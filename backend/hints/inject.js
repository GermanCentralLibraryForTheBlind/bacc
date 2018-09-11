'use strict';

const readline = require('readline');
const fs = require('fs');
const definition = require('./definition');

const IN = './node_modules/ace-core/packages/ace-core/src/scripts/ace-axe.js';
const OUT = './node_modules/ace-core/packages/ace-core/lib/scripts/ace-axe.js';
const temp = [];
var validateInject = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(IN),
  output: process.stdout,
  terminal: false
});

console.log('Prepare hints.');


// rl.on('line', function (line) {
//
//   temp.push(line);
//
//   if (line.includes("checks:")) {
//     console.log('Start inject checks.');
//     validateInject += 1;
//     definition.checks.forEach((check) => { temp.push(dumpObject(check) + ','); });
//     console.log('Injected...');
//   }
//
//   if (line.includes("rules:")) {
//     console.log('Start inject rules.');
//     validateInject += 1;
//     definition.rules.forEach((rule) => { temp.push(dumpObject(rule) + ','); });
//     console.log('Injected...');
//   }
//
// });
//
// rl.on('close', function () {
//
//   if (validateInject !== 2) {
//     console.error('Something goes wrong: No injection possible.');
//     return;
//   }
//
//   const ws = fs.createWriteStream(OUT);
//   temp.forEach(value => ws.write(`${value}\n`));
//   console.log('Ready new file written.')
// });
//
//
// function dumpObject(obj) {
//   var buff, prop;
//   buff = [];
//   for (prop in obj) {
//     buff.push(dumpToString(prop) + ': ' + dumpToString(obj[prop]))
//   }
//   return '{' + buff.join(', ') + '}';
// }
//
// function dumpArray(arr) {
//   var buff, i, len;
//   buff = [];
//   for (i = 0, len = arr.length; i < len; i++) {
//     buff.push(dumpToString(arr[i]));
//   }
//   return '[' + buff.join(', ') + ']';
// }
//
// function dumpToString(obj) {
//   if (toString.call(obj) == '[object Function]') {
//     return obj.toString();
//   } else if (toString.call(obj) == '[object Array]') {
//     return dumpArray(obj);
//   } else if (toString.call(obj) == '[object String]') {
//     return '"' + obj.replace('"', '\\"') + '"';
//   } else if (obj === Object(obj)) {
//     return dumpObject(obj);
//   }
//   return obj.toString();
// }
