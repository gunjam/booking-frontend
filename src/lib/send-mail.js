const os = require('os');
const gmailNode = require('gmail-node');

if (process.env.GMAIL_CLIENT_ID === '') {
  console.warn('[GMAIL] no GMAIL_CLIENT_ID environment variable set');
}
if (process.env.GMAIL_PROJECT_ID === '') {
  console.warn('[GMAIL] no GMAIL_PROJECT_ID  environment variable set');
}
if (process.env.GMAIL_CLIENT_SECRET === '') {
  console.warn('[GMAIL] no GMAIL_CLIENT_SECRET environment variable set');
}

const hostname = (os.hostname().indexOf('.') > 0) ? os.hostname() : os.hostname() + '.com';
const from = `"Booking Bot 🤖" <hubbookingbot@${hostname}>`;

/* eslint-disable camelcase */
const clientSecret = {
  installed: {
    client_id: process.env.GMAIL_CLIENT_ID,
    project_id: process.env.PROJECT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://accounts.google.com/o/oauth2/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: process.env.GMAIL_CLIENT_SECRET,
    redirect_uris: [
      'urn:ietf:wg:oauth:2.0:oob'
    ]
  }
};

module.exports = function (mailOptions) {
  return new Promise((resolve, reject) => {
    gmailNode.init(clientSecret, './token.json', err => {
      if (err) {
        return reject(err);
      }

      mailOptions.from = from;

      gmailNode.send(mailOptions, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  });
};
