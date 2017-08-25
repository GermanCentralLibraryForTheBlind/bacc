const express = require('express');
// const ip = require('ip');
const cors = require('cors');

const checkOver = require('./check-over');
const upload = require('./upload');
const logger = require('./logger');

const PORT = 3111;
const app = express();

app.use(cors({credentials: false}));
app.use('/uploads', express.static('uploads'));

/*
routes
*/
app.post('/upload', upload);
app.get('/checkover', checkOver);
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
