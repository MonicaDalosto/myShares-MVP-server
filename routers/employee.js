const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const userIsAdminMidd = require('../auth/userIsAdminMiddleware');
const moment = require('moment');
const { Op } = require('sequelize');
const { DEFAULT_COMPANY } = require('../config/constants');
const User = require('../models/').user;
const Employee = require('../models/').employee;
const Contract = require('../models/').contract;
const Company = require('../models/').company;

const router = new Router();

// Get all the users/employees: http -v :4000/employees
router.get(
  '/',
  authMiddleware,
  userIsAdminMidd,
  async (request, response, next) => {
    try {
      const allEmployees = await User.findAll({
        include: [
          {
            model: Employee,
            include: [Contract]
          }
        ],
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

      const setIsAdmin = !isActive ? false : isAdmin;

      console.log('setIsAdmin: ', setIsAdmin);

      await user.update({ name, email, isAdmin: setIsAdmin });

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

//

// http -v DELETE :4000/employees/delete/12  Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NzcxMjE5NCwiZXhwIjoxNjU3NzE5Mzk0fQ.pZ5_yyHab2pWg6CmrQVRDT8CpM5xHDl8ORxc6BczBEQ"
router.delete(
  '/delete/:id',
  authMiddleware,
  userIsAdminMidd,
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const userToDelete = await User.findByPk(id);

      if (!userToDelete) {
        return response.status(404).send({ message: 'User not found!' });
      }

      if (userToDelete.isAdmin) {
        const checkOtherAdmin = await User.findAll({
          where: {
            id: {
              [Op.not]: userToDelete.id
            },
            isAdmin: {
              [Op.is]: true
            }
          },
          include: {
            model: Employee,
            where: { isActive: true }
          }
        });

        // console.log(
        //   'checkOtherAdmin: ',
        //   checkOtherAdmin.length,
        //   checkOtherAdmin
        // );

        if (checkOtherAdmin.length === 0) {
          return response.status(400).send({
            message: "User can't be deleted because is the last Admin!"
          });
        }
      }

      const employeeToDelete = await Employee.findOne({
        where: { userId: userToDelete.id }
      });

      const employeeHasContracts = await Contract.findOne({
        where: { employeeId: employeeToDelete.id }
      });

      if (employeeHasContracts) {
        return response.status(400).send({
          message: "User can't be deleted because still has active contracts!"
        });
      }

      await userToDelete.destroy();

      await employeeToDelete.destroy();

      return response.send({ message: 'User terminated!' });
    } catch (error) {
      console.log('error from the delete endpoint: ', error);
      next(error);
    }
  }
);

module.exports = router;
