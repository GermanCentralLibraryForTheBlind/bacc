const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/1d2b4441-a74e-40eb-9ae7-8f8f2880fbb6', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');
process.exit(0);
