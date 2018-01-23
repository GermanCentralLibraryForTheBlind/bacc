const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/1342bbf8-bf39-48a3-8a44-92763d005eb4', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');
process.exit(0);
