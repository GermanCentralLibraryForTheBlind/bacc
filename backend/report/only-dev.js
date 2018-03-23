const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/0ada3cd3-1adf-4bba-91d1-94725a198ec7', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
