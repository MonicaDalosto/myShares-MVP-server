const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const User = require('../models/').user;
const Employee = require('../models/').employee;

const router = new Router();

router.get('/', async (request, response, next) => {
  try {
    const allEmployees = await User.findAll({ include: [Employee] });

    return response.send(allEmployees);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Something went wrong!');
  }
});

module.exports = router;
