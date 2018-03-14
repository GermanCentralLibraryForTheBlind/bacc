const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const readDirAsync = promisify(fs.readdir);

const logger = require('./logger');
const Baccify = require('./Baccify');
const Util = require('./util');

const SendMail = require('sendmail')({silent: true});

module.exports = function (req, res) {

  const uploadID = req.query['uploadID'];
  if (!uploadID) {
    res.status(500).send('check-over:  You have to request this route with parameter uploadID!');
    return;
  }
  const lang = req.query['lang'];
  const workingPath = path.join(req.app.UploadDir, uploadID);

  getEPUBPath(workingPath).then(epubFile => {

    if (!epubFile)
      return res.status(404).send(`No EPUB file for ${uploadID} found`);

    logger.log('info', 'Run baccify ...');

    const baccify = new Baccify();
    const epubPath = path.join(workingPath, epubFile);

    baccify
      .setInputFile(epubPath)
      .setOutputPath(workingPath)
      .setLanguage(lang)
      .check()
      .then((report) => {

        logger.log('info', 'Run baccify ready');

        report.path = Util.setHost(req, report.path);
        deleteEPUB(epubPath);

        setTimeout(function () {
          logger.log('info', `Send report path: ${report.path}`);

          sendTaskInfo(epubFile, report.path);

          return res.json(report);

        }, 1000);
      })
      .catch((err) => {

        deleteEPUB(epubPath);
        sendTaskInfo(epubFile);
        logger.log('error', 'Baccify stopped with errors ...');
        logger.log('error', err.stderr);
        return res.status(500).send(err.stderr);
      });
  });


  function deleteEPUB(filePath) {

    try {
      fs.unlinkSync(filePath);
      logger.log('info', `Successfully ${filePath} deleted`);

    } catch (err) {
      logger.log('error', `Error delete ${filePath} ` + err);
    }
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


  function sendTaskInfo(epub, reportPath) {

    try {
      SendMail({
        from: 'no-reply@bacc.com',
        to: 'sarah.bohnert@dzb.de, lars.voigt@dzb.de',
        subject: epub,
        text: 'Report: ' + (reportPath !== null ? reportPath : "error"),
      }, (err, reply) => {
        if (err)
          logger.log('error', err && err.stack);
      });
    } catch (e) {

    }
  }
};
