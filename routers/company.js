const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const userIsAdminMidd = require('../auth/userIsAdminMiddleware');
const { DEFAULT_COMPANY } = require('../config/constants');
const Company = require('../models/').company;
const { sendEmail } = require('../emails/updateSharesTemplate');

const router = new Router();

// Get the information about the Company:
router.get('/', authMiddleware, async (request, response, next) => {
  try {
    const company = await Company.findByPk(DEFAULT_COMPANY);

    return response.send(company);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Something went wrong!');
  }
});

// Update the Company's valuation:
router.put(
  '/',
  authMiddleware,
  userIsAdminMidd,
  async (request, response, next) => {
    try {
      const { name, currentValuation, totalCompanyShares } = request.body;

      const myCompany = await Company.findByPk(DEFAULT_COMPANY);

      const companyUpdated = await myCompany.update({
        name,
        currentValuation,
        totalCompanyShares
      });

      return response.send(companyUpdated);
    } catch (error) {
      console.log(error);
      // next(error);
      return response.status(400).send('Something went wrong!');
    }
  }
);

module.exports = router;
