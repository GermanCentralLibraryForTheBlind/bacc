const fs = require('fs');
const os = require('os');
const shell = require('child_process').execSync;
const rimraf = require('rimraf');
const dateFormat = require('dateformat');

const logger = require('../helper/logger');
const util = require('../helper/util');
const constants = require('../constants');

const path = require('path');

module.exports = function (req, res) {

  logger.log('info', 'Export reports...');

  const ids = req.query.ids;

  if (!ids || ids.length === 0)
    return res.status(400).send('Missing Id paramters.');

  const uploadDir = req.app.UploadDir;
  const temp = path.join(os.tmpdir(), 'BACC');

  makeTempFolder(temp);

  shell(`cp -r ${uploadDir}/report.css ${temp}`);

  ids.forEach(id => {

    const workingPath = path.join(uploadDir, id);

    if (fs.existsSync(workingPath)) {

      if (util.isReadyState(workingPath)) {

        const fileName = fs.readFileSync(path.join(workingPath, constants.SUCCEEDED_FLAG)).toString();
        try {

          const reportPath = path.join(temp, fileName);
          // Hint only for linux/unix OS
          shell(`mkdir -p ${reportPath}`);
          shell(`cp -r ${workingPath}/bacc_report.html ${reportPath}`);
          shell(`cp -r ${workingPath}/data ${reportPath}`);

        } catch (err) {
          console.error(err)
        }
      }
    }
    else
      logger.log('error', 'Report ID not exits: ' + id);
  });


  const reportsZipped = `bacc_reports_${dateFormat(Date.now(), "dd_mmmm_yyyy_HH:MM:ss")}.zip`
  const fullReportsZipped = `${os.tmpdir()}/${reportsZipped}`;
  shell(`cd ${temp} && zip -r ${reportsZipped} .`);

  res.writeHead(200, {"Content-Type": "application/zip", "Content-Disposition": "attachment; filename=" + reportsZipped});
  fs.createReadStream(fullReportsZipped).pipe(res);
  res.end("Export reports ready.");

  rimraf.sync(temp);
  rimraf.sync(fullReportsZipped);

  logger.log('info', 'Export reports ready');
};


function makeTempFolder(temp) {

  if (fs.existsSync(temp))
    rimraf.sync(temp);

  fs.mkdirSync(temp);
}

