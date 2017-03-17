'use strict';

const os = require('os');
const nodemailer = require('nodemailer');
const emailConfig = require('../../config/email');

const transporter = nodemailer.createTransport(emailConfig);
const hostname = (os.hostname().indexOf('.') > 0) ? os.hostname() : os.hostname() + '.com';
const from = `"Booking Bot 🤖" <hubbookingbot@${hostname}>`;

module.exports = function (mailOptions) {
  return new Promise((resolve, reject) => {
    const options = Object.assign({from}, mailOptions);

    transporter.sendMail(options, (err, info) => {
      if (err) {
        return reject(err);
      }
      resolve();
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  });
};
