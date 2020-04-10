const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.use(auth);

router.get('/', getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
    // добавить параметры в валидацию, перенести в отдельный файл
  }),
}), createArticle);

router.delete('/articleId', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
    // добавить параметры в валидацию, перенести в отдельный файл
  }),
}), deleteArticle);

module.exports = router;
