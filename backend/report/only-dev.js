const ReportModeler = require('./ReportModeler');
const meow = require('meow');

const cli = meow(``, {});

const path = cli.input[0] || '/home/alan/workspace/bacc/uploads/53248e33-35fb-4025-b57e-6f51502afb6a';

const r = new ReportModeler(path, 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
