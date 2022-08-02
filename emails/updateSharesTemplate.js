const moment = require('moment');
const { sendGridSendEmail } = require('../emails/sendEmailService');

const sendUpdatedSharesEmail = user => {
  // console.log('user dentro da function sendEmail: ', user);
  const msg = {
    to: `${user.email}`, // Change to your recipient
    from: 'monica.kerber@gmail.com', // Change to your verified sender
    subject: `Update of Company's Shares`,
    // text: 'What is this part?',
    html: `
          <div style="width: 800px; font-family: Arial, Helvetica, sans-serif; color: #343a40; font-size: 12px; text-align: center; ">
            <h2 style="font-size: 16px; height: 30px; ">Hi, ${user.name} </h2>
            <p style="height: 30px; ">Your shares from Company have been updated, here you can see the updated value:</p>
            <table style="border-collapse: collapse; font-size: 14px; width: 700px; border: thin solid #f8f8f8; font-family: Arial, Helvetica, sans-serif;">
              <thead>
                <tr style="background-color: #f8f8f8; height: 60px; font-size: 14px">
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
                    `<tr style="border: thin solid #f8f8f8; height: 40px; ">
                    <td> ${moment(item.signatureDate).format(
                      'DD/MM/YYYY'
                    )} </td>
                    <td> ${item.grantedShares.toLocaleString('en-GB', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })} </td>
                    <td> ${moment(item.cliffDate).format('DD/MM/YYYY')} </td>
                    <td> ${item.numberOfMonthsAfterSignatureDate} </td>
                    <td> ${item.virtualOwnedShares.toLocaleString('en-GB', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })} </td>
                    <td> ${item.sharesValueBasedCompanyCurrentValuation.toLocaleString(
                      'en-GB',
                      {
                        style: 'currency',
                        currency: 'EUR'
                      }
                    )} </td>
                  </tr>`
                )}
              </tbody>
              <tfoot>
                <tr style="background-color: #f8f8f8; height: 40px;">
                  <td><strong>Total</strong></td>
                  <td><strong>
                     ${user.totalContractsSummary.totalOfVirtualGrantedShares.toLocaleString(
                       'en-GB',
                       { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                     )}
                  </strong></td>
                  <td>  </td>
                  <td>  </td>
                  <td><strong>
                     ${user.totalContractsSummary.totalOfVirtualOwnedShares.toLocaleString(
                       'en-GB',
                       { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                     )}
                  </strong></td>
                  <td><strong>
                     ${user.totalContractsSummary.totalOfSharesValueBasedCompanyCurrentValuation.toLocaleString(
                       'en-GB',
                       {
                         style: 'currency',
                         currency: 'EUR'
                       }
                     )}
                  </strong></td>
                </tr>
              </tfoot>
            </table>
            <p style="height: 30px; ">You can see more information about your Shares on <a href="https://myshares.netlify.app/login">myShares</a> website.</p>
          </div>
          `
  };

  sendGridSendEmail(msg);
};

module.exports = { sendUpdatedSharesEmail };
