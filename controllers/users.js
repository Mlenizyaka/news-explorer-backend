const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const messages = require('../utils/messages');

// Получаем данные залогиненного пользователя
const getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError(messages.user.isNotFound);
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const userCreate = async (req, res, next) => {
  let user;
  let hash;
  const { name, email, password } = req.body;
  try {
    user = await User.findOne({ email });
    if (user) throw new BadRequestError(messages.user.alreadyExists);
  } catch (err) {
    return next(err);
  }
  try {
    hash = await bcrypt.hash(password, 10);
  } catch (err) {
    return next(err);
  }
  return User.create({
    name, email, password: hash,
  })
    .then((newUser) => res.status(201).send({
      name: newUser.name,
      email: newUser.email,
    }))
    .catch(next);
};

const logout = (req, res, next) => {
  res.clearCookie('jwt', {
    httpOnly: true,
  });

  res.status(200).send({ status: '200', message: messages.user.loggedOut });
};

module.exports = {
  getUserData, userCreate, logout,
};
