const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const User = require('../models/').user;
const Employee = require('../models/').employee;
const Contract = require('../models/').contract;
const Company = require('../models/').company;
const {
  calculateShares,
  calculateSharesAllEmployees
} = require('../utils/shareCalculation');

const router = new Router();

// Get all the users/employees:
router.get('/', async (request, response, next) => {
  try {
    const allEmployees = await User.findAll({ include: [Employee] });

    return response.send(allEmployees);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Something went wrong!');
  }
});

// http -v :4000/employees/calculation/3 Authorization:"Bearer token"
// Execute the User Shares calculation:
router.get(
  '/calculation/:id',
  authMiddleware,
  async (request, response, next) => {
    const userIsAdmin = request.user.dataValues.isAdmin;
    const { id } = request.params;

    if (!userIsAdmin) {
      return response
        .status(403)
        .send({ message: 'Denied: You are not authorized to do this action!' });
    }
    try {
      // find user by pk
      const user = await User.findByPk(id, { include: [Employee] });
      // get his contracts
      const contracts = await Contract.findAll({
        where: { employeeId: user.employee.id }
      });
      const company = await Company.findByPk(1);

      // do math
      const specificDate = new Date(); // this specific date can be past from the client, then i can use this endpoint to get the projection; but I need to think on the company valuation input from the employee;
      const employeeContractsSummary = calculateShares(
        contracts,
        company,
        specificDate
      );
      // send data back
      response.send(employeeContractsSummary);
    } catch (error) {
      next(error);
    }
  }
);

// execute the shares calculation of the all employees:
// http -v :4000/employees/allemployeescalculation Authorization:"Bearer token"
router.get(
  '/allemployeescalculation',
  authMiddleware,
  async (request, response, next) => {
    const userIsAdmin = request.user.dataValues.isAdmin;

    if (!userIsAdmin) {
      return response
        .status(403)
        .send({ message: 'Denied: You are not authorized to do this action!' });
    }
    try {
      // find all users
      const users = await User.findAll({ include: [Employee] });
      // get all contracts
      const contracts = await Contract.findAll();
      const company = await Company.findByPk(1);

      const specificDate = new Date();
      // do math
      const allEmployeeContractsSummary = calculateSharesAllEmployees(
        users,
        contracts,
        company,
        specificDate
      );
      // send data back
      response.send(allEmployeeContractsSummary);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
