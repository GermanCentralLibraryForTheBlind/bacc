const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/2aa09635-47fb-417d-b4d2-9132d521b8df', 'de');
console.log('start report build ...');
r.build();
console.log('build ready');

process.exit(0);
