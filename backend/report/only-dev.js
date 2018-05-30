const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/22a01146-02f2-46a7-8cfb-54375a0e85d8', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
