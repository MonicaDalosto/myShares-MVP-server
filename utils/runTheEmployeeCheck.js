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

    // get the company
    const company = await Company.findByPk(DEFAULT_COMPANY);

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

        sendUpdatedSharesEmail(userFullContractsSummary);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const scheduleSendEmail = () => {
  cron.schedule(
    '0 5 * * monday',
    () => {
      console.log('running a task every monday at 05:00am');
      checkEmployeeContracts();
    },
    {
      scheduled: true,
      timezone: 'Europe/Amsterdam'
    }
  );
};

module.exports = { scheduleSendEmail };
