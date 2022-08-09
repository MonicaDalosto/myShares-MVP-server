const bcrypt = require('bcrypt');
const { Router } = require('express');
const generator = require('generate-password');
const { toJWT, toData } = require('../auth/jwt');
const authMiddleware = require('../auth/middleware');
const userIsAdminMidd = require('../auth/userIsAdminMiddleware');
const { SALT_ROUNDS, APP_URL } = require('../config/constants');
const { validatePassword } = require('../utils/validatePassword');
const {
  buildResetPasswordEmail,
  buildUserCreatedWithPasswordEmail
} = require('../emails/passwordTemplate');
const User = require('../models/').user;
const Employee = require('../models/').employee;

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

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get('/me', authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues['password'];
  res.status(200).send({ ...req.user.dataValues });
});

// the admin creates the new employee:
router.post(
  '/createEmployee',
  authMiddleware,
  userIsAdminMidd,
  async (request, response) => {
    try {
      const { name, email, department, isAdmin, startDate } = request.body;

      if (!name || !email || !department || !startDate) {
        return response.status(400).send({
          message:
            'Please provide valid name, email, department and start date of the new employee!'
        });
      }

      const password = generator.generate({
        length: 8,
        numbers: true,
        symbols: '!@#$%&*',
        strict: true
      });

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

      buildUserCreatedWithPasswordEmail({
        newUser,
        password,
        appUrl: APP_URL
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

// Change the password
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

// When the user request to reset the password, this endpoint sends the e-mail to reset it:
router.post('/forgotPassword', async (request, response, next) => {
  try {
    const { email } = request.body;
    //  find the user...
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] }
    });
    // if no user return error...
    if (!user) {
      return response
        .status(400)
        .send({ message: 'User not found! Please, provide valid email!' });
    }
    // if user, generate the token passing the user.id
    const resetToken = toJWT({ userId: user.id });

    await user.update({
      passwordResetToken: resetToken
    });

    const emailUrl = `${APP_URL}/reset-password/${resetToken}`;

    buildResetPasswordEmail(user, emailUrl);

    return response
      .status(200)
      .send({ message: 'Email sent! Please, check your email!' });
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ message: 'Something went wrong, sorry' });
  }
});

// Check if the token to change the password is still valid:
router.post('/checkResetPasswordToken', async (request, response, next) => {
  try {
    const { resetToken } = request.body;

    toData(resetToken);

    return response.send({ message: 'The Reset Password Token is valid!' });
  } catch (error) {
    console.log(error);
    return response.status(400).send(error);
  }
});

// Change the password using the reset password token:
router.patch('/resetPassword', async (request, response, next) => {
  try {
    const { resetToken, password, confirmPassword } = request.body;
    const isValidPassword = validatePassword(password);
    const userData = toData(resetToken);

    if (!isValidPassword || password !== confirmPassword) {
      return response.status(400).send({
        name: 'PasswordError',
        message: 'Invalid Password! Please provide correct data!'
      });
    }

    const user = await User.findByPk(userData.userId);

    if (!user) {
      return response.status(400).send({
        name: 'UserNotFound',
        message:
          'User not found! Please, request for your password to be reset again.'
      });
    }
    if (user.passwordResetToken !== resetToken) {
      return response.status(400).send({
        name: 'UrlTokenAlreadyUsed',
        message:
          'Url already used! The url can be used just once. Please, request for your password to be reset again.'
      });
    }

    await user.update({
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      passwordResetToken: null
    });

    return response
      .status(200)
      .send({ message: 'Successful! Password updated!' });
  } catch (error) {
    console.log(error);
    return response.status(400).send(error);
  }
});

module.exports = router;
