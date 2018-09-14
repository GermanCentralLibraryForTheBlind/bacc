const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');


const logger = require('./logger');
const constants = require('../constants');

const Util = {};

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
  return fs.existsSync(path.join(workingPath, constants.CHECK_PROGRESS_STATE_FILE)) // TODO:
};

Util.addToStatistics = (task) => {

  // ensure statistics exists
  if (!fs.existsSync(constants.STATISTICS)) {
    jsonfile.writeFileSync(constants.STATISTICS, {reports: []}, {spaces: 2});
    logger.log('info', `Written new STATISTICS file to : ${constants.STATISTICS}`);
  }

  const current = jsonfile.readFileSync(constants.STATISTICS);
  current.reports.push(task);
  jsonfile.writeFileSync(constants.STATISTICS, current, {spaces: 2});
  logger.log('info', `Written task to STATISTICS`);
};


// Util.addPropertyToLastTaskofStatistics = (property, value) => {
//
//   try {
//     const current = jsonfile.readFileSync(constants.STATISTICS);
//     current.reports[current.reports.length - 1][property] = value;
//     jsonfile.writeFileSync(constants.STATISTICS, current, {spaces: 2});
//   } catch (err) {
//     logger.log('error', `Error add property to last task of statistics` + err);
//   }
// };
//
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

module.exports = Util;
