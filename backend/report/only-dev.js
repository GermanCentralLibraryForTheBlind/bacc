const ReportModeler = require('./ReportModeler');
const meow = require('meow');

const cli = meow(``, {});

const path = cli.input[0] || '/home/alan/workspace/bacc/uploads/5a6bd880-7789-41d2-b354-56938108d2b8';

const r = new ReportModeler(path, 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
