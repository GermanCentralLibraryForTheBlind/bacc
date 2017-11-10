const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/241775e7-07df-45a7-8538-7822d6bcab1c', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');
process.exit(0);
