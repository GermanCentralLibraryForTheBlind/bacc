const ReportModeler = require('./ReportModeler');
const meow = require('meow');

const cli = meow(``, {});

const path = cli.input[0] || '/home/alan/workspace/bacc/uploads/c2e04318-97eb-4284-bf8c-87d300d57d7a';

const r = new ReportModeler(path, 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
