const spawn = require('child-process-promise').spawn;
const fs = require('fs');

const util = require('../helper/util');
const logger = require('../helper/logger');
const constants = require('../constants');
const RULES_FILE = 'uploads/rules.html';

const axeDE = require('../report/locales/axe_de.json');
const aceDE = require('../report/locales/ace_de.json');

module.exports = function (req, res) {

  util.ensureUploadDirExists(constants.UPLOAD_DIR);

  const lang = req.query['lang'];

  const runAce = spawn('node', [constants.ACE, '-R'],
    {
      capture: ['stdout', 'stderr'],
      cwd: constants.UPLOAD_DIR
    }
  );

  runAce.then((result) => {

    const file = constants.UPLOAD_DIR + '/rules.html';
    var rules = fs.readFileSync(file, 'utf8');

    rules = removeUnusedRules(rules);
    rules = localize(lang, rules);

    fs.writeFileSync(file, rules);

    logger.log('info', 'Send rules...');
    res.type('text/plain');
    res.send(util.setHost(req, RULES_FILE));

  }).catch((err) => {
    logger.log('error', err);
    res.status(501).send(err);
  });


  // TODO: fix this in Ace  ingored: bypass, href-no-hash
  function removeUnusedRules(rules) {
    return rules.replace(/<tr>\s+<td>bypass<\/td>\s+<td>.*?<\/td>/g, '')
      .replace(/<tr>\s+<td>href-no-hash<\/td>\s+<td>.*?<\/td>/g, '');
  }

  function localize(lang, rulesWithinHTML) {

    if (lang !== 'de' && lang !== 'en')
      logger.log('warn', 'Unsupported language:' + lang);

    if (lang == 'de') {

      const replaceWithLocal = (key, rules) => {

        // Hint!!! this expression can be invalid if html input structure changed!!!
        const regex = RegExp('<tr>\\s+<td>' + key + '<\\/td>\\s+<td>.*?<\\/td>\\s+<\\/tr>', 'g');
        const replaceWith = '<tr><td>' + key + '<td>'
          + rules[key].help.replace(/</g, '&lt;').replace(/>/g, '&gt;')
          + '<td></td></tr>';
        // console.log(regex);
        // console.log(replaceWith + '\n');
        rulesWithinHTML = rulesWithinHTML.replace(regex, replaceWith);
      };

      for (let key in axeDE.rules)
        replaceWithLocal(key, axeDE.rules);
      for (let key in aceDE.rules)
        replaceWithLocal(key, aceDE.rules);
    }
    return rulesWithinHTML;
  }
};

