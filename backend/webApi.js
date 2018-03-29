const express = require('express');
const cors = require('cors');
const path = require('path');


const checkOver = require('./routes/checkOver');
const upload = require('./routes/upload');
const logger = require('./helper/logger');
const getRules = require('./routes/getRules');

const PORT = 3111;
const app = express();
app.UploadDir = path.join(process.cwd(),'uploads');
app.use(cors({credentials: false}));
app.use('/uploads', express.static('uploads'));

/*
routes
*/
app.post('/upload', upload);
app.get('/checkover', checkOver);
app.get('/allRules', getRules);
app.get('/bacc', function (req, res) {
  // res.end('Test: Greetings from baccy! IP:' + ip.address());
  res.end('Test: Greetings from baccy!');
});


const port = process.env.PORT || PORT;

app.listen(port, () => {
  logger.log('info', '');
  logger.log('info', '#########################################');
  logger.log('info', '  Baccy working on port ' + port);
  logger.log('info', '#########################################');
});

module.exports = app;
