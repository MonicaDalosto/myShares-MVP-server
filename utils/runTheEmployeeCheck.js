const cron = require('node-cron');
const moment = require('moment');
const { Sequelize, Op } = require('sequelize');
const { DEFAULT_COMPANY } = require('../config/constants');
const User = require('../models/').user;
const Employee = require('../models/').employee;
const Contract = require('../models/').contract;
const Company = require('../models/').company;
const {
  calculateSharesSpecificEmployee
} = require('../utils/shareCalculation');
const { sendUpdatedSharesEmail } = require('../emails/updateSharesTemplate');

const getUserAndSendEmail = async (userId, companyValuation, companyShares) => {
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Employee,
          include: [Contract]
        }
      ],
      attributes: { exclude: ['password'] }
    });

    const userFullContractsSummary = calculateSharesSpecificEmployee(
      user,
      companyValuation,
      companyShares,
      today
    );

    sendUpdatedSharesEmail(userFullContractsSummary);
  } catch (error) {
    console.log(error);
  }
};

const checkEmployeeContracts = async () => {
  try {
    const today = moment(new Date()).endOf('day');
    // const dayToday = moment(today).date();
    // console.log('today: ', today, 'dayToday: ', dayToday);
    // find all contracts where: the cliffDate <= today && the day of cliffDate === today;
    // include Employee Table;
    const contracts = await Contract.findAll({
      include: [
        {
          model: Employee,
          where: {
            isActive: {
              [Op.is]: true
            }
          }
        }
      ],
      where: {
        [Op.and]: [
          // Sequelize.where(
          //   Sequelize.fn('date_trunc', 'day', Sequelize.col('cliffDate')),
          //   dayToday
          // ),
          { cliffDate: { [Op.lte]: today } }
        ]
      }
    });

    if (contracts.length > 0) {
      // console.log('contracts: ', contracts);
      const contractsFilteredToday = contracts.filter(
        item => moment(item.cliffDate).date() === moment(today).date()
      );
      console.log('contractsFilteredToday: ', contractsFilteredToday);
      // get the unique userId of the active user;
      const uniqueUserIdList = [];
      contractsFilteredToday.map(
        item =>
          !uniqueUserIdList.includes(item.employee.userId) &&
          uniqueUserIdList.push(item.employee.userId)
      );
      console.log('uniqueUserIdList: ', uniqueUserIdList);

      // get the company
      const company = await Company.findByPk(DEFAULT_COMPANY);
      // console.log('company: ', company);

      // map over the userId array and for each userId, get the User, Employee and Contracts >> calculate the update >> send the email
      // const employeesToSendEmail = uniqueUserIdList.map(employee => {
      //   // console.log(employee);
      //   getUserAndSendEmail(
      //     employee,
      //     company.currentValuation,
      //     company.totalCompanyShares
      //   );
      // });

      for (const employee of uniqueUserIdList) {
        await getUserAndSendEmail(
          employee,
          company.currentValuation,
          company.totalCompanyShares
        );
      }

      // test only one e-mail:
      // getUserAndSendEmail(
      //   32,
      //   company.currentValuation,
      //   company.totalCompanyShares
      // );
    }
  } catch (error) {
    console.log(error);
  }
};

const scheduleSendEmail = () => {
  cron.schedule(
    '0 20 * * *',
    () => {
      console.log('running a task on 20:00');
      checkEmployeeContracts();
    },
    {
      scheduled: true,
      timezone: 'Europe/Amsterdam'
    }
  );
};

module.exports = { scheduleSendEmail };
