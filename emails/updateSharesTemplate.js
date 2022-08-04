const moment = require('moment');
const { sendGridSendEmail } = require('../emails/sendEmailService');
const { EMAIL_SENDER } = require('../config/constants');

const sendUpdatedSharesEmail = user => {
  const msg = {
    to: user.email,
    from: EMAIL_SENDER,
    subject: `Company's Shares Update`,
    text: `Company's Shares Update`,
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
                ${buildTableBody(user)}
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

const buildTableBody = user => {
  let tableBodyLines = '';
  for (const item of user.employeeContractsSummary) {
    tableBodyLines += `<tr style="border: thin solid #f8f8f8; height: 40px; ">
        <td> 
          ${moment(item.signatureDate).format('DD/MM/YYYY')} 
        </td>
        <td> 
          ${item.grantedShares.toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })} 
        </td>
        <td> ${moment(item.cliffDate).format('DD/MM/YYYY')} </td>
        <td> ${item.numberOfMonthsAfterSignatureDate} </td>
        <td> ${item.virtualOwnedShares.toLocaleString('en-GB', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })} </td>
        <td> 
        ${item.sharesValueBasedCompanyCurrentValuation.toLocaleString('en-GB', {
          style: 'currency',
          currency: 'EUR'
        })} 
        </td>
      </tr>`;
  }

  return tableBodyLines;
};

module.exports = { sendUpdatedSharesEmail };
