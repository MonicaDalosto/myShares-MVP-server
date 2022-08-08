module.exports = {
  SALT_ROUNDS: 10,
  PORT: process.env.PORT || 4000, // heroku sets process.env.PORT
  DEFAULT_COMPANY: 1,
  EMAIL_SENDER: 'monica.kerber@gmail.com',
  APP_URL: 'https://myshares.netlify.app/'
};
