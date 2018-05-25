const express = require('express');
const cors = require('cors');


const getReports = require('./routes/getReports');
const checkOver = require('./routes/checkOver');
const getRules = require('./routes/getRules');
const contact = require('./routes/contact');
const upload = require('./routes/upload');
const logger = require('./helper/logger');

const PORT = 3111;
const app = express();
app.use(cors({credentials: false}));
app.use('/uploads', express.static('uploads'));

/*
routes
*/
app.get('/checkover', checkOver);
app.get('/reports', getReports);
app.get('/allRules', getRules);
app.post('/contact', contact);
app.post('/upload', upload);
app.get('/bacc', function (req, res) {
  // res.end('Test: Greetings from baccy! IP:' + ip.address());
  res.end('Test: Greetings from baccy!');
});

const port = process.env.PORT || PORT;

const server = app.listen(
  port, () => {
    logger.log('info', '');
    logger.log('info', '#########################################');
    logger.log('info', '      __                    ');
    logger.log('info', '     / /  ___ ___________ __');
    logger.log('info', '    / _ \\/ _ `/ __/ __/ // /');
    logger.log('info', '   /_.__/\\_,_/\\__/\\__/\\_, / ');
    logger.log('info', '                     /___/  ');
    logger.log('info', 'Port ' + port);
    logger.log('info', '#########################################');
    logger.log('info', '');
  });

// server.setTimeout(300000);

// server.on('connection', function (socket) {
//   logger.log('info', "A new connection was made by a client." + socket);
//   socket.setTimeout(5 * 60 * 1000);
// });

module.exports = app;
