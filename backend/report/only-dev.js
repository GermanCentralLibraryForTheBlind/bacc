const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/f8857e07-d334-4b7d-b3f6-b53e814300fd', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
