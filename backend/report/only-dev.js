const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/028df09f-d609-407f-b5fa-7bd0f2dcc59f', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');
process.exit(0);
