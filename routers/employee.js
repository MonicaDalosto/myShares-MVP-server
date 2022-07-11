const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const userIsAdminMidd = require('../auth/userIsAdminMiddleware');
const User = require('../models/').user;
const Employee = require('../models/').employee;
const Contract = require('../models/').contract;
const Company = require('../models/').company;
const { DEFAULT_COMPANY } = require('../config/constants');

const router = new Router();

// Get all the users/employees: http -v :4000/employees
router.get(
  '/',
  authMiddleware,
  userIsAdminMidd,
  async (request, response, next) => {
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
  }
);

router.get(
  '/:id',
  authMiddleware,
  userIsAdminMidd,
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const employee = await User.findByPk(id, {
        include: [Employee],
        attributes: { exclude: ['password'] }
      });

      return response.send(employee);
    } catch (error) {
      console.log(error);
      return response.status(400).send('Something went wrong!');
    }
  }
);

module.exports = router;
