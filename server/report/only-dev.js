const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/26bc6bba-7d07-4764-9860-88e2a5d62829', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');
process.exit(0);
