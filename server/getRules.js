const spawn = require('child-process-promise').spawn;
const path = require('path');

const util = require('./util');
const logger = require('./logger');
const aceModule = path.join(__dirname, '/node_modules/ace-core/dist/cli/cli.js');

module.exports = function (req, res) {

  util.ensureUploadDirExists(req.app.UploadDir);

  const runAce = spawn('node', [aceModule, '-R'],
    {
      capture: ['stdout', 'stderr'],
      cwd: req.app.UploadDir
    }
  );

  runAce.then((result) => {

    logger.log('info', 'Send rules...');

    res.send(util.setHost(req.headers.host, 'uploads/rules.html'));

  }).catch((err) => {

    logger.log('error', err);
    res.status(501).send(err);
  });
};

