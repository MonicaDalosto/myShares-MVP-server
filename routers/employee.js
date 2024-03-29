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

// Get all the users/employees:
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

// Update the employee's data:
router.put(
  '/update/:id',
  authMiddleware,
  userIsAdminMidd,
  async (request, response, next) => {
    const { id } = request.params;
    const { name, email, isAdmin, startDate, isActive, department, endDate } =
      request.body;

    try {
      if (Number(id) === request.user.dataValues.id && !isActive) {
        return response
          .status(400)
          .send({ message: "You can't change yourself to inactive!" });
      }

      if (
        !name ||
        !email ||
        !startDate ||
        !department ||
        moment(endDate).isBefore(moment(startDate)) ||
        (!isActive && !endDate) ||
        (isActive && endDate)
      ) {
        return response
          .status(400)
          .send({ message: 'Please provide valid data!' });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return response.status(400).send({ message: 'User was not found!' });
      }

      const employee = await Employee.findOne({ where: { userId: user.id } });

      const setIsAdmin = !isActive ? false : isAdmin;

      await user.update({ name, email, isAdmin: setIsAdmin });

      await employee.update({
        startDate,
        isActive,
        department,
        endDate
      });

      return response.send({ messsage: 'User Updated!!!' });
    } catch (error) {
      console.log(error);
      return response.status(400).send({ message: 'Something went wrong!' });
    }
  }
);

// Delete the user/employee:
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
