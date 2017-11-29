const fs = require('fs');

const Util = {};

Util.setHost = (host, path) => {
  return `http://${host}/` + path.substring(path.lastIndexOf('uploads'));
};

Util.ensureUploadDirExists = (path) => {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
};

module.exports = Util;
