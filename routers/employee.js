const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const userIsAdminMidd = require('../auth/userIsAdminMiddleware');
const moment = require('moment');
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

// router.get(
//   '/:id',
//   authMiddleware,
//   userIsAdminMidd,
//   async (request, response, next) => {
//     try {
//       const { id } = request.params;
//       const employee = await User.findByPk(id, {
//         include: [Employee],
//         attributes: { exclude: ['password'] }
//       });

//       return response.send(employee);
//     } catch (error) {
//       console.log(error);
//       return response.status(400).send('Something went wrong!');
//     }
//   }
// );

// http -v PUT :4000/employees/update/2 name=berry email=berry@berry.com isAdmin=true startDate="2015-06-25" isActive=false department=Marketing endDate="2018-11-04" Authorization:"Bearer token"
router.put(
  '/update/:id',
  authMiddleware,
  userIsAdminMidd,
  async (request, response, next) => {
    const { id } = request.params;
    const { name, email, isAdmin, startDate, isActive, department, endDate } =
      request.body;

    try {
      if (
        !name ||
        !email ||
        !startDate ||
        !department ||
        moment(endDate).isBefore(moment(startDate)) ||
        (!isActive && !endDate) ||
        (isActive && endDate)
      ) {
        return response.status(400).send('Please provide valid data!');
      }

      const user = await User.findByPk(id);

      if (!user) {
        return response.status(400).send('User was not found!');
      }

      const employee = await Employee.findOne({ where: { userId: user.id } });

      await user.update({ name, email, isAdmin });

      await employee.update({
        startDate,
        isActive,
        department,
        endDate
      });

      return response.send('User Updated!!!');
    } catch (error) {
      console.log(error);
      return response.status(400).send('Something went wrong!');
    }
  }
);

module.exports = router;
