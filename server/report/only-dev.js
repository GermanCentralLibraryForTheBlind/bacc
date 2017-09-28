const ReportModeler = require('./ReportModeler');
const r = new ReportModeler('/home/alan/workspace/bacc/uploads/0d78374d-6a48-441d-b3fa-a4106cfb8e19');
console.log('start report build ...');
r.build();
console.log('build ready');
process.exit(0);
