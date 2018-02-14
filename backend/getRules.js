const spawn = require('child-process-promise').spawn;

const util = require('./util');
const logger = require('./logger');
const constants = require('./constants');

module.exports = function (req, res) {

  util.ensureUploadDirExists(req.app.UploadDir);

  const runAce = spawn('node', [constants.ACE, '-R'],
    {
      capture: ['stdout', 'stderr'],
      cwd: req.app.UploadDir
    }
  );

  runAce.then((result) => {

    logger.log('info', 'Send rules...');

    res.send(util.setHost(req, 'uploads/rules.html'));

  }).catch((err) => {

    logger.log('error', err);
    res.status(501).send(err);
  });
};

