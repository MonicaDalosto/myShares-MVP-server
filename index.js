//packages
const cors = require('cors');
const express = require('express');

//routers
const authRouter = require('./routers/auth');
const employeeRouter = require('./routers/employee');
const contractRouter = require('./routers/contract');
const companyRouter = require('./routers/company');

//constants
const { PORT } = require('./config/constants');

// Create an express app
const app = express();

// CORS middleware:  * Since our api is hosted on a different domain than our client
// we are are doing "Cross Origin Resource Sharing" (cors)
// Cross origin resource sharing is disabled by express by default
app.use(cors());

// express.json() to be able to read request bodies of JSON requests a.k.a. body-parser
app.use(express.json());

//routes
app.use('/auth', authRouter);
app.use('/employees', employeeRouter);
app.use('/contracts', contractRouter);
app.use('/company', companyRouter);

//start listening
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
