
var Util = {};

Util.setHost = function (host, path) {
  return `http://${host}/` + path.substring(path.lastIndexOf('uploads'));
};

module.exports = Util;
