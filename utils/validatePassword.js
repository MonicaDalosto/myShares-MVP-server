const validatePassword = password => {
  const regexPassword = new RegExp(
    '(^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]))(?=.{8,}))'
  );
  return regexPassword.test(password);
};

module.exports = {
  validatePassword
};
