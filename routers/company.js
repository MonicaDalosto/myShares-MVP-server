const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const Company = require('../models/').company;

const router = new Router();

router.get('/', async (request, response, next) => {
  try {
    const company = await Company.findByPk(1);

    return response.send(company);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Something went wrong!');
  }
});

module.exports = router;
