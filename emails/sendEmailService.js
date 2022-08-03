require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendGridSendEmail = emailMessage => {
  sgMail
    .send(emailMessage)
    .then(() => {
      console.log('Email sent');
    })
    .catch(error => {
      console.error('Error from sendGrid: ', error, error.response.body);
    });
};

module.exports = { sendGridSendEmail };