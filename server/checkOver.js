const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const readDirAsync = promisify(fs.readdir);

const logger = require('./logger');
const Baccify = require('./Baccify');
const SendMail = require('sendmail')({silent: true});

module.exports = function (req, res) {

  const uploadID = req.query['uploadID'];
  if (!uploadID) {
    res.status(500).send('check-over:  You have to request this route with parameter uploadID!');
    return;
  }

  const workingPath = path.join(req.app.UploadDir, uploadID);

  getEPUBPath(workingPath).then(epubFile => {

    if (!epubFile)
      return res.status(404).send(`No EPUB file for ${uploadID} found`);

    sendTaskInfo(epubFile);

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
    report.path = `http://${req.headers.host}/` + report.path.substring(report.path.lastIndexOf('uploads'));
    return report;
  }

  async function getEPUBPath(workingPath) {

    const files = await readDirAsync(workingPath);

    let epub;
    files.forEach((file) => {
      if (path.extname(file) === ".epub") {
        epub = file;
        return;
      }
    });
    return epub;
  }


  function sendTaskInfo(epub) {

    try {
      SendMail({
        from: 'no-reply@bacc.com',
        to: 'lars.voigt@dzb.de',
        subject: 'checkover epub',
        html: 'checkover epub:  ' + epub
      }, (err, reply) => {
        if (err)
          logger.log('error', err && err.stack);
      });
    } catch (e) {

    }
  }
};
