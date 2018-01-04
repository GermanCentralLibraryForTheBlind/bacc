const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/448e528c-d5c9-43ee-9f39-f235312f48d5', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');
process.exit(0);
