const findRemoveSync = require('find-remove');
const sendMail = require('sendmail')({silent: true});
const winston = require('winston');
const schedule = require('node-schedule');

const Del = {};

/*

*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

*/

const rule = new schedule.RecurrenceRule();
// every 1st of month
rule.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
rule.date = 1;
rule.hour = 0;
rule.minute = 0;

schedule.scheduleJob(rule, () => {

  // delete reports older than 3 month
  const removed = findRemoveSync(__dirname + '/../uploads', {age: {seconds: 7776000 /*3 month*/}, dir: "*", files: "*.*"});

    sendMail({
      from: 'no-reply@bacc.com',
      to: 'lars.voigt@dzb.de',
      subject: 'Delete old reports',
      html: 'removed:' + JSON.stringify(removed),
      attachments: []
    }, (err, reply) => {

      if(err)
        winston.log('error', err && err.stack);
    });
  });

module.exports = Del;
