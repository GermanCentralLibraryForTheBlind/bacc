const fs = require('fs');
const path = require('path');


const logger = require('./logger');
const Baccify = require('./Baccify');

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

    let epubFile;
    files.forEach((file) => {
      if (path.extname(file) === ".epub") {
        epubFile = file;
        return;
      }
    });

    if (!epubFile)
      return res.status(500).send(`No EPUB file for ${uploadID} found`);

    logger.log('info', 'Run baccify ...');

    const baccify = new Baccify();
    baccify.setInputFile(path.join(workingPath, epubFile));
    baccify.setOutputPath(workingPath);
    baccify.check()
      .then((report) => {

        logger.log('info', 'Run baccify ready');

        report = setHost(req, report);
        setTimeout(function () {
          logger.log('info', `Send report path: ${report.path}`);
          return res.json(report);
        }, 1000);
      })
      .catch((err) => {

        logger.log('info', 'Baccify stopped with errors ...');
        logger.log('error', err);
        return res.status(500).send(err);
      });
  });

  function setHost(req, report) {
    report.path = `http://${req.headers.host}/` + report.path;
    return report;
  }
};
