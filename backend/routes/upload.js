const uap = require('ua-parser');
const multer = require('multer');
const uuid = require('uuid/v4');
const path = require('path');
const fs = require('fs');

const util = require('../helper/util');
const logger = require('../helper/logger');
const constants = require('../constants');

module.exports = function (req, res) {

  util.ensureUploadDirExists(constants.UPLOAD_DIR);

  uaParser(req);

  // todo: check prefix .epub
  upload(req, res, function (err) {

    if (err) {
      const err = err.toString();
      logger.log('error', err);
      return res.status(500).send(err);
    }

    req.files.forEach(function (element) {
      logger.log('info', `File uploaded to ${element.path}`);
      res.json({
        msg: `File is uploaded.`,
        uploadID: element.destination.substring(element.destination.lastIndexOf('/') + 1),
        name: element.originalname
      });
    });

  });
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, mkTasKFolder(constants.UPLOAD_DIR))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    logger.log('info', `Upload ${file.originalname} is started ...`);
    cb(null, true);
  }
}).any();

function mkTasKFolder(uploadDir) {

  const taskName = uuid();
  const taskPath = path.join(uploadDir, taskName);
  fs.mkdirSync(taskPath);
  return taskPath;
}


function uaParser(req) {

  try {
    let userAgent;
    const ua = req.headers['user-agent'];
    userAgent = uap.parseUA(ua).toString();
    userAgent += ' -> ';
    userAgent += uap.parseOS(ua).toString();
    userAgent += ' -> ';
    userAgent += uap.parseDevice(ua).toString();
    logger.log('info', userAgent);

  } catch (err) {
    logger.log('error', err);
  }
}

