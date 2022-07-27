require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = employeeData => {
  const msg = {
    to: 'monica.kerber@gmail.com', // Change to your recipient
    from: 'monica.kerber@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    // text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = { sendEmail };
