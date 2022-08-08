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

const buildUserCreatedWithPasswordEmail = ({ newUser, password, appUrl }) => {
  const msg = {
    to: newUser.email,
    from: EMAIL_SENDER,
    subject: `Your access of myShares system`,
    text: `Your access of myShares system`,
    html: `
            <div>
              <h1>The user has been created!</h1>
              <p>
              Hello, ${newUser.name}!
              </p>
              <p>
                The "Company's team have created a user for you access the Shares System.
              </p>
              <p>
                You can access the system <a href=${appUrl}>here</a>.
              </p>
              <p>
                Your login information is:
              </p>
              <p>
                Email: ${newUser.email}
              </p>
              <p>
                Password: ${password}
              </p>
              <p>
                Important!!! The password informed is temporary. Please, update your password as soon as you log in on the system. To do this, just access the "Settings" link on the menu list.
              </p>
            </div>
          `
  };

  sendGridSendEmail(msg);
};

module.exports = { buildResetPasswordEmail, buildUserCreatedWithPasswordEmail };
