const userIsAdmin = async (request, response, next) => {
  const userIsAdmin = request.user.dataValues.isAdmin;

  if (!userIsAdmin) {
    return response
      .status(403)
      .send({ message: 'Denied: You are not authorized to do this action!' });
  }

  return next();
};

module.exports = userIsAdmin;
