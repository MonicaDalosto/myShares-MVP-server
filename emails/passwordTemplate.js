const { sendGridSendEmail } = require('../emails/sendEmailService');

const buildResetPasswordEmail = user => {
  const msg = {};

  sendGridSendEmail(msg);
};
