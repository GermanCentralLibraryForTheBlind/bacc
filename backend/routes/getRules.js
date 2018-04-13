const spawn = require('child-process-promise').spawn;
const fs = require('fs');

const util = require('../helper/util');
const logger = require('../helper/logger');
const constants = require('../constants');
const RULES_FILE = 'uploads/rules.html';

module.exports = function (req, res) {

  util.ensureUploadDirExists(req.app.UploadDir);

  const runAce = spawn('node', [constants.ACE, '-R'],
    {
      capture: ['stdout', 'stderr'],
      cwd: req.app.UploadDir
    }
  );

  runAce.then((result) => {

    removeUnusedRules(req.app.UploadDir);
    logger.log('info', 'Send rules...');
    res.type('text/plain');
    res.send(util.setHost(req, RULES_FILE));

  }).catch((err) => {

    logger.log('error', err);
    res.status(501).send(err);
  });


  // TODO: fix this in Ace
  function removeUnusedRules(uploadDir) {

    const file = uploadDir + '/rules.html';
    const rules = fs
      .readFileSync(file, 'utf8')
      .replace(/<tr>\s+<td>bypass<\/td>\s+<td>.*?<\/td>\s+<td><\/td>\s+<\/tr>/g,'');
    fs.writeFileSync(file, rules);
  }
};

