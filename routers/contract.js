const { Router, request, response } = require('express');
const authMiddleware = require('../auth/middleware');
const userIsAdminMidd = require('../auth/userIsAdminMiddleware');
const User = require('../models/').user;
const Employee = require('../models/').employee;
const Contract = require('../models/').contract;
const Company = require('../models/').company;
const {
  calculateSharesSpecificEmployee,
  calculateSharesAllEmployees
} = require('../utils/shareCalculation');
const { DEFAULT_COMPANY } = require('../config/constants');

const router = new Router();

// http -v POST :4000/contracts signatureDate=2020-01-01 companyValuation=2000000 totalCompanyShares=500000 grantedShares=3000 cliffDate=2021-01-01 employeeId=6 Authorization:"Bearer token"
// Create a new Contract:
router.post(
  '/',
  authMiddleware,
  userIsAdminMidd,
  async (request, response, next) => {
    try {
      const {
        signatureDate,
        companyValuation,
        totalCompanyShares,
        grantedShares,
        cliffDate,
        employeeId
      } = request.body;

      const newContract = await Contract.create({
        signatureDate,
        companyValuation,
        totalCompanyShares,
        grantedShares,
        cliffDate,
        employeeId
      });

      response.send(newContract);
    } catch (error) {
      console.log(error);
      next(error);
      return response.status(400).send('Something went wrong!');
    }
  }
);

// http -v :4000/contracts/calculation/1 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NzYxMjI2MSwiZXhwIjoxNjU3NjE5NDYxfQ.8h7hlPKpswg8pLGe_vZBZ1lleDGGkg9eoBbAy4kTRc0"
// http -v :4000/contracts/calculation/3?specificDate=2022-12-31 Authorization:"Bearer token"
// Execute the User Shares calculation: (the ? at the endpoint makes the id optional)
router.get(
  '/calculation/:id?:projectedValuation?:projectedDate?',
  authMiddleware,
  async (request, response, next) => {
    const userIsAdmin = request.user.dataValues.isAdmin;
    const id =
      userIsAdmin && request.query.id ? request.query.id : request.user.id;

    console.log('the request inside the endpoint: ', request.query);

    try {
      // find user by pk and get his contracts
      const user = await User.findByPk(id, {
        include: [
          {
            model: Employee,
            include: [Contract]
          }
        ],
        attributes: { exclude: ['password'] }
      });
      const company = await Company.findByPk(DEFAULT_COMPANY);

      const companyValuation = request.query.projectedValuation
        ? Number(request.query.projectedValuation)
        : company.currentValuation; // this projected valuation can be past from the client, then i can use this endpoint to get the projection;

      const specificDate = user.employee.isActive
        ? request.query.projectedDate || new Date()
        : user.employee.endDate; // this projected date can be past from the client, then i can use this endpoint to get the projection;

      console.log(
        'the values inside the endpoint: companyValuation ',
        companyValuation,
        'specificDate ',
        specificDate,
        'id ',
        id
      );

      // do math
      const fullContractsSummary = calculateSharesSpecificEmployee(
        user,
        companyValuation,
        company.totalCompanyShares,
        specificDate
      );
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
  userIsAdminMidd,
  async (request, response, next) => {
    try {
      // find all users and get all contracts
      const users = await User.findAll({
        include: [
          {
            model: Employee,
            include: [Contract]
          }
        ],
        attributes: { exclude: ['password'] }
      });

      const company = await Company.findByPk(DEFAULT_COMPANY);

      // do math
      const allEmployeeContractsSummary = calculateSharesAllEmployees(
        users,
        company.currentValuation,
        company.totalCompanyShares
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
