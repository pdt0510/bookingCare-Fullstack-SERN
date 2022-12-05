import nodemailer from 'nodemailer';
import 'dotenv/config';

export const sendEmailWithAttachment = async (emailData) => {
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FOR_RESPONSE,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport(smtpConfig);

      if (transporter) {
        const { clientEmail, clientSubject, htmlText, attachments } = emailData;
        const webSite = 'Bookingcare.vn';

        await transporter.sendMail({
          from: `${webSite} <${process.env.EMAIL_FOR_RESPONSE}>`,
          to: [clientEmail],
          subject: `${clientSubject} ✔`,
          attachments: attachments, //57ms44ss
          html: htmlText,
        });
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const sendSimpleEmail = async ({ ...clientInfo }) => {
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FOR_RESPONSE,
      pass: process.env.EMAIL_APP_PASSWORD,
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
