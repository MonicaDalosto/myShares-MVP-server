const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const Company = require('../models/').company;

const router = new Router();

// Get the information about the Company:
router.get('/', async (request, response, next) => {
  try {
    const company = await Company.findByPk(1);

    return response.send(company);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Something went wrong!');
  }
});

// http -v PUT :4000/company name="myCompany bv" currentValuation=5500000.00 totalCompanyShares=2750000 Authorization:"Bearer token"
// Update the Company's valuation:
router.put('/', authMiddleware, async (request, response, next) => {
  const userIsAdmin = request.user.dataValues.isAdmin;

  if (!userIsAdmin) {
    return response
      .status(403)
      .send({ message: 'Denied: You are not authorized to do this action!' });
  }

  try {
    const { name, currentValuation, totalCompanyShares } = request.body;
    console.log(request.body);

    const myCompany = await Company.findByPk(1);

    console.log(myCompany);

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
});

module.exports = router;
