const jwt = require('jsonwebtoken');

// Convention of token request 'Bearer {{token}}'
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret_this_should_be_longer');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth failed!'});
  }
};
