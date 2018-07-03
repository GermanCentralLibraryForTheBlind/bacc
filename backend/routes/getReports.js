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

  const uploadDir = constants.UPLOAD_DIR;
  const temp = path.join(os.tmpdir(), 'BACC');

  makeTempFolder(temp);

  shell(`cp -r ${uploadDir}/report.css ${temp}`);

  ids.forEach(id => {

    const workingPath = path.join(uploadDir, id);

    if (fs.existsSync(workingPath)) {

      if (util.isReadyState(workingPath)) {

        const fileName = fs.readFileSync(path.join(workingPath, constants.SUCCEEDED_FLAG)).toString();
        try {

          const reportPath = makeReportPath(temp, fileName);
          // Hint only for linux/unix OS
          shell(`mkdir ${reportPath}`);
          shell(`cp -r ${workingPath}/bacc_report.html ${reportPath}`);

          const dataPath = `${workingPath}/data`;

          if (fs.existsSync(dataPath))
            shell(`cp -r ${dataPath} ${reportPath}`);

        } catch (err) {
          console.error(err)
        }
      }
    }
    else
      logger.log('error', 'Report ID not exits: ' + id);
  });


  const reportsZipped = `bacc_reports_${dateFormat(Date.now(), "dd_mmmm_yyyy_HH:MM:ss")}.zip`;
  const fullReportsZipped = `${os.tmpdir()}/${reportsZipped}`;
  shell(`cd ${os.tmpdir()} && zip -r ${reportsZipped} ./BACC`);

  res.writeHead(200, {
    "Content-Type": "application/zip",
    "Content-Disposition": "attachment; filename=" + reportsZipped,
    'Access-Control-Expose-Headers': 'Content-Disposition'
  });
  fs.createReadStream(fullReportsZipped).pipe(res);
  rimraf.sync(temp);
  logger.log('info', 'Export reports ready');
};


function makeTempFolder(temp) {

  if (fs.existsSync(temp))
    rimraf.sync(temp);

  fs.mkdirSync(temp);
  logger.log('info', 'Make temp folder : ' + temp);
}

function makeReportPath(temp, fileName) {

  var idx = 0;
  var tempFileName = fileName.replace('.epub', '').replace("'", '_');

  while (fs.existsSync(path.join(temp, tempFileName))) {
    idx++;
    tempFileName = fileName + idx;
  }
  return path.join(temp, tempFileName);
}
