const fs = require('fs');

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

module.exports = Util;
