const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const User = require('../models/').user;
const Employee = require('../models/').employee;
const Contract = require('../models/').contract;
const Company = require('../models/').company;
const { calculateShares } = require('../utils/shareCalculation');

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

// http -v :4000/employees/calculation/1
// Execute the User Shares calculation:
router.get('/calculation/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    // find user by pk
    const user = await User.findByPk(id, { include: [Employee] });
    // get his contracts
    const contracts = await Contract.findAll({
      where: { employeeId: user.employee.id }
    });
    const company = await Company.findByPk(1);

    // do math
    const specificDate = new Date();
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
});

module.exports = router;
