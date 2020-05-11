const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
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

  const mailOptions = {
    from: '"NewsBlog" <tony@email.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: output,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
