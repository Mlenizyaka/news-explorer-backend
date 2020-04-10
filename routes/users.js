const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const { getUserData } = require('../controllers/users.js');

router.use(auth);

router.get('/me', celebrate({
  params: Joi.string().alphanum().length(24),
}), getUserData);

module.exports = router;
