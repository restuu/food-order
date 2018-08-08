const jwt = require('jsonwebtoken');

module.exports = (req, res, proceed) => {
  const { authorization } = req.headers;
  const decoded = jwt.verify(authorization, sails.config.custom.SECRET_KEY);

  if (!decoded) {
    return res.forbidden();
  }

  res.locals.user = decoded;
  return proceed();
};
