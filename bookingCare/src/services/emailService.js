//src26
import nodemailer from 'nodemailer';
import 'dotenv/config'; //12ms12ss

const sendSimpleEmail = async ({ ...clientInfo }) => {
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_FOR_RESPONSE, //12ms12ss
      pass: process.env.EMAIL_APP_PASSWORD, //v95xx1,
    },
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  if (transporter) {
    const { clientEmail, clientSubject, htmlText } = clientInfo;
    const webSite = 'Bookingcare.vn';

    await transporter.sendMail({
      from: `${webSite} <${process.env.EMAIL_FOR_RESPONSE}>`,
      to: [clientEmail],
      subject: `${clientSubject} ✔`,
      html: htmlText,
    });
  }
};

export default sendSimpleEmail;
