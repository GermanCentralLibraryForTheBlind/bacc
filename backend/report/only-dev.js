const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/896ad788-2461-471e-ba8a-d14a1da621ab', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
