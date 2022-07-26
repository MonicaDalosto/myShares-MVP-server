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

// http -v :4000/contracts/calculation/1 Authorization:"Bearer token"
// http -v :4000/contracts/calculation/3?specificDate=2022-12-31 Authorization:"Bearer token"
// Execute the User Shares calculation: (the ? at the endpoint makes the id optional)
router.get(
  '/calculation/:id?:projectedValuation?:projectedDate?',
  authMiddleware,
  async (request, response, next) => {
    const userIsAdmin = request.user.dataValues.isAdmin;
    const id =
      userIsAdmin && request.query.id ? request.query.id : request.user.id;

    // console.log('the request inside the endpoint: ', request.query);

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
// http -v :4000/contracts/allemployeescalculation Authorization:"Bearer token"
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

      // console.log('users inside the endpoint: ', users);

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

// http -v DELETE :4000/contracts/15 Authorization:"Bearer token"
router.delete(
  '/:id',
  authMiddleware,
  userIsAdminMidd,
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const contractToDelete = await Contract.findByPk(id);

      if (!contractToDelete) {
        return response.status(404).send('Contract not found!');
      }

      await contractToDelete.destroy();

      return response.send({ message: 'Contract terminated!' });
    } catch (error) {
      console.log('error from the delete endpoint: ', error);
      next(error);
    }
  }
);

module.exports = router;
