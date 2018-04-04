const SendMail = require('sendmail')({silent: true});

const logger = require('../helper/logger');

module.exports = function (req, res) {

  var body = "";
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    body = JSON.parse(body);
    sendFeedback(body.name, body.email, body.message);
  });


  function sendFeedback(name, mail, message) {

    try {
      SendMail({
        from: 'feedback@bacc.com',
        to: 'sarah.bohnert@dzb.de, lars.voigt@dzb.de',
        subject: 'BACC Feedback from ' + name + ' --- ' + mail,
        text: message,
      }, (err, reply) => {

        if (err) {
          logger.log('error', err && err.stack);
          return res.status(500).send(err);
        } else
          return res.status(200).send('Email sended');
      });
    } catch (e) {
      return res.status(500).send(e);
    }
  }
};
