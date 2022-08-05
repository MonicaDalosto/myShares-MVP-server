const { sendGridSendEmail } = require('./sendEmailService');
const { EMAIL_SENDER } = require('../config/constants');

const buildResetPasswordEmail = (user, emailUrl) => {
  const msg = {
    to: user.email,
    from: EMAIL_SENDER,
    subject: `Reset the Password`,
    text: `Reset the Password`,
    html: `
            <div>
              <h1>We've received a request to reset your password!</h1>
              <p>
              Hello, ${user.name}!
              </p>
              <p>
                If you requested your password to be reset, please click <a href=${emailUrl}>here</a>.
              </p>
              <p>
                Please, note that this link will expire 2 hours after being requested. 
              </p>
              <p>
                If you are unable to reset your password within this time, please, request for your password to be reset again.
              </p>
            </div>
          `
  };

  sendGridSendEmail(msg);
};

module.exports = { buildResetPasswordEmail };
