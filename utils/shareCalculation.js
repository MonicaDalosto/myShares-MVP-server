const moment = require('moment');

function monthDiff(fromDate, toDate) {
  const momentFrom = moment(fromDate);
  const momentTo = moment(toDate);

  return momentTo.diff(momentFrom, 'months');
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

    return {
      ...contract.dataValues,
      numberOfMonthsAfterSignatureDate,
      virtualOwnedShares,
      sharesValueBasedCompanyCurrentValuation
    };
  });

  // math
  return employeeContractsSummary;
}

const calculateTheTotalEachEmployee = (
  employeeContractsSummary,
  employeeId
) => {
  const numberOfContracts = employeeContractsSummary.length;
  const totalOfVirtualGrantedShares = employeeContractsSummary.reduce(
    (accumulator, contract) => accumulator + contract.grantedShares,
    0
  );
  const totalOfVirtualOwnedShares = employeeContractsSummary.reduce(
    (accumulator, contract) => accumulator + contract.virtualOwnedShares,
    0
  );
  const totalOfSharesValueBasedCompanyCurrentValuation =
    employeeContractsSummary.reduce(
      (accumulator, contract) =>
        accumulator + contract.sharesValueBasedCompanyCurrentValuation,
      0
    );

  return {
    employeeId,
    numberOfContracts,
    totalOfVirtualGrantedShares,
    totalOfVirtualOwnedShares,
    totalOfSharesValueBasedCompanyCurrentValuation
  };
};

const calculateSharesAllEmployees = (users, company, specificDate) => {
  // map over user, get the employeeId >> return the user >> employee >> and its contracts with the summary;
  const fullDataUsers = users.map(user => {
    // invoke the calculateShares function passing the userContracts >> return the summary
    const employeeContractsSummary = calculateShares(
      user.employee.contracts,
      company,
      specificDate
    );
    // invoke the calculateTheTotalEachEmployee function passing the employeeContractsSummary
    const totalOfEmployeeShares = calculateTheTotalEachEmployee(
      employeeContractsSummary,
      user.employee.id
    );
    // add all the totalOfEmployeeShares data inside the fullEmployee and return it;
    delete user.dataValues['password']; // don't send back the password hash
    const fullUser = {
      ...user.dataValues,
      totalOfEmployeeShares: totalOfEmployeeShares
    };
    return fullUser;
  });
  return fullDataUsers;
};

module.exports = {
  calculateShares,
  calculateTheTotalEachEmployee,
  calculateSharesAllEmployees
};

// call this from route and from email generation.

// Trigger something once a month (or periodically) => cron jobs = https://www.npmjs.com/package//node-cron
// for the email sending => nodemailer
