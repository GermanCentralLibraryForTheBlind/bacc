const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/39072943-a415-4fdb-a400-528988dc1a8f', 'en');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
