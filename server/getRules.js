const Util = require('./util');

module.exports = function (req, res) {

  // todo: call ace
  res.send(Util.setHost(req.headers.host, 'uploads/rules.html'));
};
