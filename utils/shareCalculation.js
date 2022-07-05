const moment = require('moment');

function monthDiff(fromDate, toDate) {
  const momentFrom = moment(fromDate);
  const momentTo = moment(toDate);

  return (months = momentTo.diff(momentFrom, 'months'));
}

// per user
function calculateShares(contracts, company, specificDate) {
  const numberMonthsOwnedFullContract = 60;
  const numberMonthsCliffPeriod = 12;
  const currentSharesPrice =
    company.currentValuation / company.totalCompanyShares;

  const employeeContractsSummary = contracts.map(contract => {
    const { signatureDate, grantedShares } = contract;

    const numberOfMonthsAfterSignatureDate = monthDiff(
      signatureDate,
      specificDate
    );

    const virtualOwnedShares =
      numberOfMonthsAfterSignatureDate >= numberMonthsCliffPeriod
        ? (grantedShares * numberOfMonthsAfterSignatureDate) /
          numberMonthsOwnedFullContract
        : 0;

    const sharesValueBasedCompanyCurrentValuation =
      virtualOwnedShares * currentSharesPrice;

    return (contractSummary = {
      ...contract.dataValues,
      numberOfMonthsAfterSignatureDate,
      virtualOwnedShares,
      sharesValueBasedCompanyCurrentValuation
    });
  });

  // math
  return employeeContractsSummary;
}

module.exports = { calculateShares };

// call this from route and from email generation.

// Trigger something once a month (or periodically) => cron jobs = https://www.npmjs.com/package//node-cron
// for the email sending => nodemailer
