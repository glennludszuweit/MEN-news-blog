const nodemailer = require('nodemailer');
const pug = require('pug');
const HTMLToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.from = `NewsBlog <${process.env.EMAIL_FROM}>`;
    this.to = user.email;
    this.firsName = user.name.split(' ')[0];
    this.url = url;
  }

  newMailTransport() {
    if (process.env.NODE_ENV === 'production') {
      //Sendgrid
      return 1;
    }

    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io', //process.env.MAILTRAP_HOST,
      port: 25, //process.env.MAILTRAP_PORT,
      secure: false,
      auth: {
        user: 'd262be34a8992c', //process.env.MAILTRAP_USER,
        pass: 'cc5cf3e73fc3cb', //process.env.MAILTRAP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  //SEND EMAIL
  async send(template, subject) {
    //render html email from pug
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firsName: this.firsName,
        url: this.url,
        subject,
      }
    );

    //define email option
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: HTMLToText.fromString(html),
    };

    //create transporter and send the email
    await this.newMailTransport().transporter.sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to NEWSBLOG!');
  }
};
