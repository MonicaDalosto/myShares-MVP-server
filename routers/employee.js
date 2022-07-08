const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const User = require('../models/').user;
const Employee = require('../models/').employee;
const Contract = require('../models/').contract;
const Company = require('../models/').company;
const {
  calculateShares,
  calculateTheTotalEachEmployee,
  calculateSharesSpecificEmployee,
  calculateSharesAllEmployees
} = require('../utils/shareCalculation');

const router = new Router();

// Get all the users/employees: http -v :4000/employees
router.get('/', async (request, response, next) => {
  try {
    const allEmployees = await User.findAll({
      include: [Employee],
      attributes: { exclude: ['password'] }
    });

    return response.send(allEmployees);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Something went wrong!');
  }
});

// http -v :4000/employees/calculation/1 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NzI2NzQwMSwiZXhwIjoxNjU3Mjc0NjAxfQ.5JU_lp0diLuHwvmGLfv9SwVwR8zvvlopRATB7yh56fI"
// http -v :4000/employees/calculation/3?specificDate=2022-12-31 Authorization:"Bearer token"
// Execute the User Shares calculation:
router.get(
  '/calculation/:id',
  authMiddleware,
  async (request, response, next) => {
    const userIsAdmin = request.user.dataValues.isAdmin;
    const { id } = request.params;

    try {
      // find user by pk and get his contracts
      const user = await User.findByPk(id, {
        include: [{ model: Employee, include: [Contract] }],
        attributes: { exclude: ['password'] }
      });
      const company = await Company.findByPk(1);

      const specificDate = user.employee.isActive
        ? request.params.specificDate || new Date()
        : user.employee.endDate; // this specific date can be past from the client, then i can use this endpoint to get the projection; but I need to think on the company valuation input from the employee;
      // do math
      const fullContractsSummary = calculateSharesSpecificEmployee(
        user,
        company,
        specificDate
      );

      // previous code, without the
      // const employeeContractsSummary = calculateShares(
      //   user.employee.contracts,
      //   company,
      //   specificDate
      // );

      // const totalContractsSummary = calculateTheTotalEachEmployee(
      //   employeeContractsSummary,
      //   user.employee.id
      // );
      // send data back
      // const fullContractsSummary = {
      //   employeeContractsSummary, // [{}, {} ,{}]
      //   totalContractsSummary // 23534
      // };
      response.send(fullContractsSummary);
    } catch (error) {
      next(error);
    }
  }
);

// execute the shares calculation of the all employees:
// http -v :4000/employees/allemployeescalculation Authorization:"Bearer token"
router.get(
  '/all-employees-calculation',
  authMiddleware,
  async (request, response, next) => {
    const userIsAdmin = request.user.dataValues.isAdmin;

    if (!userIsAdmin) {
      return response
        .status(403)
        .send({ message: 'Denied: You are not authorized to do this action!' });
    }
    try {
      // find all users and get all contracts
      const users = await User.findAll({
        include: [{ model: Employee, include: [Contract] }],
        attributes: { exclude: ['password'] }
      });

      const company = await Company.findByPk(1);

      // do math
      const allEmployeeContractsSummary = calculateSharesAllEmployees(
        users,
        company
      );
      // send data back
      response.send(allEmployeeContractsSummary);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

/// ------- Matias code of allEmployees calculation -------- ///
// const users = [];

// const companyTemp = await Company.findByPk(1);

// const perUser = users.map((u) => {
//   const contracts = await Contract.findAll({
//     where: { employeeId: u.employee.id }
//   });

//   const calculation = calculateShares(contracts, company, new Date());
//   return { userId: u.id, calculation };
// })
// ---- END MATIAS CODE -------- //
