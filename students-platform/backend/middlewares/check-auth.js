const jwt = require('jsonwebtoken');

// Convention of token request 'Bearer {{token}}'
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
    req.userData = {
      email: decodedToken.email,
      id: decodedToken.userId
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated!'});
  }
};
