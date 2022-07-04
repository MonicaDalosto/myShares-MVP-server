const { Router, request, response } = require('express');
const authMiddleware = require('../auth/middleware');
const User = require('../models/').user;
const Employee = require('../models/').employee;
const Contract = require('../models/').contract;

const router = new Router();

// http -v POST :4000/contracts signatureDate=2020-01-01 companyValuation=2000000 totalCompanyShares=500000 grantedShares=3000 cliffDate=2021-01-01 employeeId=6 Authorization:"Bearer token"
router.post('/', authMiddleware, async (request, response, next) => {
  const userIsAdmin = request.user.dataValues.isAdmin;

  if (!userIsAdmin) {
    return response
      .status(403)
      .send({ message: 'Denied: You are not authorized to do this action!' });
  }

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
});

// get all contracts - I am not using this endpoint, it was just a test:
router.get('/', async (request, response, next) => {
  try {
    const allContracts = await Contract.findAll();

    return response.send(allContracts);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Something went wrong!');
  }
});

module.exports = router;
