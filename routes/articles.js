const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');

const createArticleObj = require('../celebrate_validation_objects/createArticleObj');
const articleIdObj = require('../celebrate_validation_objects/articleIdObj');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.use(auth);

router.get('/', getArticles);

router.post('/', celebrate(createArticleObj), createArticle);

router.delete('/:id', celebrate(articleIdObj), deleteArticle);

module.exports = router;
