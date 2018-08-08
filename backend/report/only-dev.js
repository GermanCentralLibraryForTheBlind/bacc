const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/ca1080d1-6d89-453b-8555-a3211ebd943e', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
