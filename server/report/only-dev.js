const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/549c4270-b5bc-4e63-ba6b-2292cf7908aa');
console.log('start report build ...');
r.build();
console.log('build ready');
process.exit(0);
