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

Util.setCheckFinishedFlag = (workingPath, epubFileName) => {
  fs.writeFileSync(path.join(workingPath, constants.SUCCEEDED_FLAG), epubFileName, 'utf8');
};

Util.isReadyState = (workingPath) => {
  return fs.existsSync(path.join(workingPath, contants.SUCCEEDED_FLAG))
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

module.exports = Util;
