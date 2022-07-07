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

const calculateTheTotalEachEmployee = (
  employeeContractsSummary,
  employeeId
) => {
  // const employeeId = employeeContractsSummary.reduce(
  //   (accum, contract) => (accum = contract.employeeId),
  //   0
  // );
  const numberOfContracts = employeeContractsSummary.length;
  const totalOfVirtualGrantedShares = employeeContractsSummary.reduce(
    (accumulator, contract) => {
      return accumulator + contract.grantedShares;
    },
    0
  );
  const totalOfVirtualOwnedShares = employeeContractsSummary.reduce(
    (accumulator, contract) => {
      return accumulator + contract.virtualOwnedShares;
    },
    0
  );
  const totalOfSharesValueBasedCompanyCurrentValuation =
    employeeContractsSummary.reduce((accumulator, contract) => {
      return accumulator + contract.sharesValueBasedCompanyCurrentValuation;
    }, 0);

  const totalOfEmployeeShares = {
    employeeId,
    numberOfContracts,
    totalOfVirtualGrantedShares,
    totalOfVirtualOwnedShares,
    totalOfSharesValueBasedCompanyCurrentValuation
  };
  // console.log(totalOfEmployeeShares);
  return totalOfEmployeeShares;
};

const calculateSharesAllEmployees = (
  users,
  contracts,
  company,
  specificDate
) => {
  // map over user, get the employeeId >> return the user >> employee >> and its contracts with the summary;
  const fullDataUsers = users.map(user => {
    // filter the contracts per employeeId >> return the contracts with the summary
    // console.log('user.employee.id: ', user.employee.id);
    const contractsPerEmployee = contracts.filter(
      contract => user.employee.id === contract.employeeId
    );
    // console.log('contractsPerEmployee: ', contractsPerEmployee);
    // invoke the calculateShares function passing the filteredContracts >> return the summary
    const employeeContractsSummary = calculateShares(
      contractsPerEmployee,
      company,
      specificDate
    );

    const totalOfEmployeeShares = calculateTheTotalEachEmployee(
      employeeContractsSummary,
      user.employee.id
    );

    // console.log('contractsPerEmployee: ', contractsPerEmployee);
    // console.log('contracts summary: ', employeeContractsSummary);
    // add all the data inside the fullEmployee and return it;
    const fullUser = {
      ...user.dataValues,
      totalOfEmployeeShares: totalOfEmployeeShares
    };
    // console.log('fullUser: ', fullUser);
    return fullUser;
  });
  return fullDataUsers;
};

module.exports = { calculateShares, calculateSharesAllEmployees };

// call this from route and from email generation.

// Trigger something once a month (or periodically) => cron jobs = https://www.npmjs.com/package//node-cron
// for the email sending => nodemailer
