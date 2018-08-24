const ReportModeler = require('./ReportModeler');
const meow = require('meow');

const cli = meow(``, {});

const path = cli.input[0] || '/home/alan/workspace/bacc/uploads/fd24cc42-c8b5-43b3-a1d0-b4c600fdc913';

const r = new ReportModeler(path, 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
