const fs = require('fs');
const os = require('os');
const shell = require('child_process').execSync ;
const rimraf = require('rimraf');

const logger = require('../helper/logger');
const util = require('../helper/util');
const constants = require('../constants');

const path = require('path');

module.exports = function (req, res) {

  const ids = req.query.ids;

  if (!ids || ids.length === 0)
    return res.status(200).send();

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

  // rimraf.sync(temp);

  return res.status(200).send();
};


function makeTempFolder(temp) {

  if (fs.existsSync(temp))
    rimraf.sync(temp);

  fs.mkdirSync(temp);
}

