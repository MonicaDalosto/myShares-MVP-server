const cron = require('node-cron');
const moment = require('moment');
const { Op } = require('sequelize');
const { DEFAULT_COMPANY } = require('../config/constants');
const User = require('../models/').user;
const Employee = require('../models/').employee;
const Contract = require('../models/').contract;
const Company = require('../models/').company;
const {
  calculateSharesSpecificEmployee
} = require('../utils/shareCalculation');
const { sendUpdatedSharesEmail } = require('../emails/updateSharesTemplate');

// const getUserAndSendEmail = async (
//   userId,
//   companyValuation,
//   companyShares,
//   today
// ) => {
//   try {
//     const user = await User.findByPk(userId, {
//       include: [
//         {
//           model: Employee,
//           include: [Contract]
//         }
//       ],
//       attributes: { exclude: ['password'] }
//     });

//     // console.log('user dentro da função: ', user);

//     const userFullContractsSummary = calculateSharesSpecificEmployee(
//       user,
//       companyValuation,
//       companyShares,
//       today
//     );

//     sendUpdatedSharesEmail(userFullContractsSummary);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const checkEmployeeContracts = async () => {
//   try {
//     const today = moment(new Date()).endOf('day');

//     // find all contracts where: the cliffDate <= today && the day of cliffDate === today;
//     // include Employee Table;
//     const contracts = await Contract.findAll({
//       include: [
//         {
//           model: Employee,
//           where: {
//             isActive: {
//               [Op.is]: true
//             }
//           }
//         }
//       ],
//       where: {
//         [Op.and]: [{ cliffDate: { [Op.lte]: today } }]
//       }
//     });

//     if (contracts.length > 0) {
//       // console.log('contracts: ', contracts);
//       const contractsFilteredToday = contracts.filter(
//         item => moment(item.cliffDate).date() === moment(today).date()
//       );
//       // console.log('contractsFilteredToday: ', contractsFilteredToday);
//       // get the unique userId of the active user;
//       const uniqueUserIdList = [];
//       contractsFilteredToday.map(
//         item =>
//           !uniqueUserIdList.includes(item.employee.userId) &&
//           uniqueUserIdList.push(item.employee.userId)
//       );
//       console.log('uniqueUserIdList: ', uniqueUserIdList);

//       // get the company
//       const company = await Company.findByPk(DEFAULT_COMPANY);
//       // console.log('company: ', company);

//       for (const employee of uniqueUserIdList) {
//         await getUserAndSendEmail(
//           employee,
//           company.currentValuation,
//           company.totalCompanyShares,
//           today
//         );
//       }

//       // test only one e-mail:
//       // getUserAndSendEmail(
//       //   32,
//       //   company.currentValuation,
//       //   company.totalCompanyShares
//       // );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const checkEmployeeContracts = async () => {
  try {
    const today = moment(new Date()).endOf('day');

    // get all active users, with their contracts...
    const allUsers = await User.findAll({
      include: [
        {
          model: Employee,
          where: {
            isActive: {
              [Op.is]: true
            }
          },
          include: [Contract]
        }
      ],
      attributes: { exclude: ['password'] }
    });

    // console.log('allUsers: ', allUsers);

    // get the company
    const company = await Company.findByPk(DEFAULT_COMPANY);
    // console.log('company: ', company);

    // if allUsers...
    if (allUsers.length > 0) {
      // iterate over them, and for each user, calculate the Shares and send the e-mail:
      for (const user of allUsers) {
        const userFullContractsSummary = calculateSharesSpecificEmployee(
          user,
          company.currentValuation,
          company.totalCompanyShares,
          today
        );

        // console.log('userFullContractsSummary: ', userFullContractsSummary);

        sendUpdatedSharesEmail(userFullContractsSummary);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const scheduleSendEmail = () => {
  cron.schedule(
    '0 2 4 * *',
    () => {
      console.log('running a task on 02:00 every 4th day');
      checkEmployeeContracts();
    },
    {
      scheduled: true,
      timezone: 'Europe/Amsterdam'
    }
  );
};

module.exports = { scheduleSendEmail };
