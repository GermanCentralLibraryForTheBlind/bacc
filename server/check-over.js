const fs = require('fs');
const path = require('path');


const logger = require('./logger');
const baccify = require('./baccify');

const UPLOAD_DIR = 'uploads'; // TODO: mv -> constants

module.exports = function (req, res) {

  const uploadID = req.query['uploadID'];
  if (!uploadID) {
    res.status(500).send('check-over:  You have to request this route with parameter uploadID!');
    return;
  }

  //TODO: get upload path dynamic
  const workingPath = path.join(UPLOAD_DIR, uploadID);

  fs.readdir(workingPath, function (err, files) {
    if (err) {
      logger.log('error', err);
      return
    }

    if (files.length > 1 || files.length == 0)
      return;

    logger.log('info', 'Run baccify ...');
    baccify(/*in*/path.join(workingPath, files[0]), /*out*/ workingPath)
      .then((result) => {

        logger.log('info','ace:stdout:\n' + result.stdout.toString());
        logger.log('info', 'Run baccify ready');

        const reportUrl = `http://${req.headers.host}/` + workingPath + '/report.html';

        setTimeout(function () {
          logger.log('info', `Send report path: ${reportUrl}`);
          return res.send(reportUrl);
        }, 1000);
      })
      .catch((err) => {
        logger.log('error', err.stderr);

        return res.status(500).send(err);
      });

  });
};
