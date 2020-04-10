const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const secretKey = require('../utils/secretKey');

// Вход в систему (логин)
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        secretKey,
        { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });

      res.send({ token });
    })
    .catch(next);
};

module.exports = login;
