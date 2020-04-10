const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

// Получаем данные залогиненного пользователя
const getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Такой пользователь не найден');
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

// Создаем нового пользоввателя
const userCreate = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new BadRequestError('Такой пользователь уже существует');
      }
    });
  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => res.status(201).send({
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        }))
        .catch(next);
    });
};

module.exports = {
  getUserData, userCreate,
};
