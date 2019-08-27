const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const jsonfile = require('jsonfile');


const logger = require('./logger');
const constants = require('../constants');

const Util = {};
let reportSchema;

setUpConnectionToStatisticDB();

Util.setHost = (req, path) => {

  var host = req.headers['x-forwarded-host'] || req.headers.host;
  host = req.headers.referer || `http://${host}/`;
  return host + path.substring(path.lastIndexOf('uploads'));
};

Util.ensureUploadDirExists = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

Util.setCheckProgressState = (workingPath, state) => {
  fs.writeFileSync(path.join(workingPath, constants.CHECK_PROGRESS_STATE_FILE), JSON.stringify(state), 'utf8');
};

Util.isReadyState = (workingPath) => {
  return jsonfile.readFileSync(path.join(workingPath, constants.CHECK_PROGRESS_STATE_FILE)).state === 'ready' //todo: state constants
};

Util.addToStatistics = (task) => {

  if (process.env.BACC) {

    const Report = mongoose.model('report', reportSchema, 'reports');

    const report = new Report({
      checkDate: task.checkDate,
      fileName: task.fileName,
      epubVersion: task.epubVersion,
      testResults: task.testResults,
      metaData : task.metaData,
      title: task.title,
      impact: task.impact,
      totalCount: task.totalCount,
      cover: task.cover,
      reportPath: task.reportPath
    });

    report.save((err, report) => {
      if (err) return logger.log('error', err);
      logger.log('info', report.title + " meta data saved to statics.");
    });

  }
};


// // works only if nginx is compiled with this module ngx_http_realip_module
// Util.writeRequestAddressToStatistics = (req) => {
//
//   var ip = req.get('x-real-ip') ||
//     req.headers['x-forwarded-for'] ||
//     req.connection.remoteAddress ||
//     req.socket.remoteAddress ||
//     req.connection.socket.remoteAddress;
//   ip = ip.split(',')[0];
//   ip = ip.split(':').slice(-1);
//
//   Util.addPropertyToLastTaskofStatistics('ip', ip);
// };


function setUpConnectionToStatisticDB() {

  const mongoDB = 'mongodb://mongodb/bacc';

  mongoose.connect(mongoDB, {useNewUrlParser: true});
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  reportSchema = mongoose.Schema({
    checkDate: String,
    fileName: String,
    epubVersion: String,
    testResults: Object,
    metaData: Object,
    title: String,
    impact: Object,
    totalCount: Number,
    cover: Object,
    reportPath: String
  });

  db.on('error', (err) => logger.log('error', 'MongoDB connection error:' + err));
  db.once('open', () => logger.log('info', 'Connected to statistic mongo server.'));
}

module.exports = Util;
