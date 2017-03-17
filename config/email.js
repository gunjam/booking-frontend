const isEmail = require('validator/lib/isEmail');

const service = 'gmail';
const user = process.env.EMAIL_ADDRESS || '';
const pass = process.env.EMAIL_PASSWORD || '';

if (!user) {
  console.warn('No EMAIL_ADDRESS environment variable set, email will fail');
} else if (!isEmail(user)) {
  console.warn('EMAIL_ADDRESS environement variable is not valid');
}

if (!pass) {
  console.warn('No EMAIL_PASSWORD environment variable set, email will fail');
}

module.exports = {service, auth: {user, pass}};
