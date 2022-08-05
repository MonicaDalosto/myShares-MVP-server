const bcrypt = require('bcrypt');
const { Router } = require('express');
const { toJWT } = require('../auth/jwt');
const authMiddleware = require('../auth/middleware');
const userIsAdminMidd = require('../auth/userIsAdminMiddleware');
const User = require('../models/').user;
const Employee = require('../models/').employee;
const { SALT_ROUNDS } = require('../config/constants');
const { validatePassword } = require('../utils/validatePassword');

const router = new Router();

//login
router.post('/login', async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .send({ message: 'Please provide both email and password' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return response.status(400).send({
        message: 'User with that email not found or password incorrect'
      });
    }

    delete user.dataValues['password']; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return response.status(200).send({ token, user: user.dataValues });
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ message: 'Something went wrong, sorry' });
  }
});

// I will use this router, when the admin creates the new employee:
// http -v POST :4000/auth/signup name=kiwi email=kiwi@kiwi.com department=operations password=kiwi isAdmin=false startDate=2019-03-01 Authorization:"Bearer token"
router.post(
  '/createEmployee',
  authMiddleware,
  userIsAdminMidd,
  async (request, response) => {
    const { name, email, department, password, isAdmin, startDate } =
      request.body;
    const isValidPassword = validatePassword(password);
    // console.log(name, email, department, password, isAdmin, startDate);

    if (
      !name ||
      !email ||
      !password ||
      !department ||
      !startDate ||
      !isValidPassword
    ) {
      return response.status(400).send({
        message:
          'Please provide valid name, email, password, department and start date of the new employee!'
      });
    }

    try {
      const newUser = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
        isAdmin
      });

      await Employee.create({
        startDate,
        department,
        userId: newUser.dataValues.id
      });

      response
        .status(201)
        .send({ message: 'Successfull! Employee has been created!' });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return response.status(400).send({
          message: 'There is an existing account with this name and/or email'
        });
      }

      return response
        .status(400)
        .send({ message: 'Something went wrong, sorry' });
    }
  }
);

// http -v PATCH :4000/auth/changePassword password=apple@12 newPassword=apple@12 confirmNewPassword=apple@12 Authorization:"Bearer token"
router.patch(
  '/changePassword',
  authMiddleware,
  async (request, response, next) => {
    try {
      // get the passwords from the body, and the id from the request...
      const { password, newPassword, confirmNewPassword } = request.body;
      const { id } = request.user.dataValues;
      const isValidPassword = validatePassword(newPassword);

      // if no passwords, return error...
      if (
        !password ||
        !newPassword ||
        !confirmNewPassword ||
        password === newPassword ||
        newPassword !== confirmNewPassword ||
        !isValidPassword
      ) {
        return response
          .status(400)
          .send({ message: 'Please provide correct data' });
      }
      // find the user
      const user = await User.findByPk(id);

      // if no user or the password doesn't match, return error...
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return response.status(400).send({
          message: 'User with that email not found or password incorrect'
        });
      }

      await user.update({
        password: bcrypt.hashSync(newPassword, SALT_ROUNDS)
      });

      return response
        .status(200)
        .send({ message: 'Successful! Password updated!' });
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .send({ message: 'Something went wrong, sorry' });
    }
  }
);

// http -v POST :4000/auth/forgotPassword email=monica.kerber@gmail.co
router.post('/forgotPassword', async (request, response, next) => {
  try {
    const { email } = request.body;

    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return response
        .status(400)
        .send({ message: 'User not found! Please, provide valid email!' });
    }
    // console.log('user inside the endpoint: ', user);
    const token = toJWT({ userId: user.id });
    console.log('token inside the endpoint: ', token);

    return response.status(200).send({ message: 'Email sent!' });
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ message: 'Something went wrong, sorry' });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get('/me', authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues['password'];
  res.status(200).send({ ...req.user.dataValues });
});

module.exports = router;
