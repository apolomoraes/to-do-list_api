const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const { host, port, user, pass } = require('../config/mail.json');
// const smtpTransport = require('nodemailer-smtp-transport');

// const transport = nodemailer.createTransport(smtpTransport({
//   host,
//   port,
//   auth: { user, pass }
// }));

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  }
});

transport.use('compile', hbs({
  viewEngine: {
    layoutsDir: path.resolve('./src/resources/mail/'),
    partialsDir: path.resolve('./src/resources/mail/'),
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}));

// transport.use('compile', hbs({
//   viewEngine: {
//     defaultLayout: undefined,
//     partialsDir: path.resolve('./src/resources/mail/')
//   },
//   viewPath: path.resolve('./src/resources/mail/'),
//   extName: '.html',
// }));

// const handlebarOptions = {
//   viewEngine: {
//     extName: '.html',
//     partialsDir: path.resolve('./src/resources/mail/auth/'),
//     layoutsDir: path.resolve('./src/resources/mail/auth/'),
//     defaultLayout: 'recover_password.html',
//   },
//   viewPath: path.resolve('./src/resources/mail/auth/'),
//   extName: '.html',
// };

// transport.use('compile', hbs(handlebarOptions));




// transport.use('compile', hbs({
//   viewEngine: 'handlebars',
//   viewPath: path.resolve('./src/resources/mail/'),
//   extName: '.html',
// }));

module.exports = transport;