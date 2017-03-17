'use strict';

const nodemailer = require('nodemailer');
const emailConfig = require('../../config/email');

const transporter = nodemailer.createTransport(emailConfig);

module.exports = function (mailOptions) {
  return new Promise((resolve, reject) => {
    const from = `"Booking Bot 🤖" <${emailConfig.auth.user}>`;
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
