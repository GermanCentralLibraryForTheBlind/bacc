const fs = require('fs');
const path = require('path');

const contants = require('../constants');

const Util = {};

Util.setHost = (req, path) => {

  var host = req.headers['x-forwarded-host'] || req.headers.host;
  host = req.headers.referer || `http://${host}/`;

  return host + path.substring(path.lastIndexOf('uploads'));
};

Util.ensureUploadDirExists = (path) => {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
};

Util.setCheckFinishedFlag = (workingPath, epubFileName) => {
  fs.writeFileSync(path.join(workingPath, contants.SUCCEEDED_FLAG), epubFileName, 'utf8');
};

Util.isReadyState = (workingPath) => {
  return fs.existsSync(path.join(workingPath, contants.SUCCEEDED_FLAG))
};

module.exports = Util;
