const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/ea288313-35bd-4ff8-a608-651423214e15', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
