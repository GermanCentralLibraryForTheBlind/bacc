const ReportModeler = require('./ReportModeler');
const meow = require('meow');

const cli = meow(``, {});

const path = cli.input[0] || '/home/alan/workspace/bacc/uploads/16919fc6-6ba0-422a-9a79-8739aa03ee86';

const r = new ReportModeler(path, 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
