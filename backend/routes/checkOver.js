const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const readDirAsync = promisify(fs.readdir);

const logger = require('../helper/logger');
const Baccify = require('../Baccify');
const Util = require('../helper/util');
const constants = require('../constants');

const SendMail = require('sendmail')({silent: true});

module.exports = function (req, res) {

  req.setTimeout(0);

  const uploadID = req.query['uploadID'];
  if (!uploadID) {
    res.status(400).send('Parameter uploadID is missing!');
    return;
  }
  const lang = req.query['lang'];
  const workingPath = path.join(constants.UPLOAD_DIR, uploadID);

  getEPUBPath(workingPath).then(epubFile => {

    if (!epubFile)
      return res.status(404).send(`No EPUB file for ${uploadID} found`);

    Util.setCheckProgressState(workingPath, {state: 'inProgress', filename : epubFile});

    logger.log('info', `Run baccify for ${uploadID} ...`);

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

          if (process.env.BACC)
            sendTaskInfo(epubFile, report.path);

          // Util.writeRequestAddressToStatistics(req);
          report.state = 'ready';
          report.filename = epubFile;
          Util.setCheckProgressState(workingPath, report);

        }, 100);
      })
      .catch((err) => {

        deleteEPUB(epubPath);
        if (process.env.BACC)
          sendTaskInfo(epubFile);
        logger.log('error', 'Baccify stopped with errors ...');
        logger.log('error', err);
        Util.setCheckProgressState(workingPath,
          {
            state: 'error',
            msg: err.stderr,
            filename: epubFile
          });
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

  const statePath = Util.setHost(req, workingPath + '/' + constants.CHECK_PROGRESS_STATE_FILE);
  return res.status(200).send(statePath);
};
