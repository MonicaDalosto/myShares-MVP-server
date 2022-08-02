const moment = require('moment');
require('dotenv').config();
// const dotenv = require('dotenv');
// dotenv.config();
const sgMail = require('@sendgrid/mail');

// console.log(process.env.SENDGRID_API_KEY);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = user => {
  console.log('user dentro da function sendEmail: ', user);
  const msg = {
    // to: 'monica.kerber@gmail.com',
    to: `${user.email}`, // Change to your recipient
    from: 'monica.kerber@gmail.com', // Change to your verified sender
    subject: `Update of Company's Shares`,
    text: 'What is this part?',
    // html: `Teste de envio de email`
    html: `
          <h2>Hi, ${user.name} </h2>
          <table>
            <thead>
              <tr>
                <th>Signature Date</th>
                <th>Granted Shares</th>
                <th>End Cliff Period</th>
                <th>Months after Signature Date</th>
                <th>Virtual Owned Shares</th>
                <th>Shares Value based on Current valuation
                </th>
              </tr>
            </thead>
            <tbody>
              ${user.employeeContractsSummary.map(
                item =>
                  `<tr>
                  <td> ${moment(item.signatureDate).format('DD/MM/YYYY')} </td>
                  <td> ${item.grantedShares} </td>
                  <td> ${moment(item.cliffDate).format('DD/MM/YYYY')} </td>
                  <td> ${item.numberOfMonthsAfterSignatureDate} </td>
                  <td> ${item.virtualOwnedShares} </td>
                  <td> ${item.sharesValueBasedCompanyCurrentValuation} </td>
                </tr>`
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td> ${
                  user.totalContractsSummary.totalOfVirtualGrantedShares
                } </td>
                <td>  </td>
                <td>  </td>
                <td> ${
                  user.totalContractsSummary.totalOfVirtualOwnedShares
                } </td>
                <td> ${
                  user.totalContractsSummary
                    .totalOfSharesValueBasedCompanyCurrentValuation
                } </td>
              </tr>
            </tfoot>
          </table>
          `
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
