const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');

// Возвращает список всех статей пользователя
const getArticles = (req, res, next) => {
  Article.find({})
    .populate('owner')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

// Создает новую статью с переданными параметрами
const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const userId = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: userId,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

// Удаляет сохранённую статью  по _id
const deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Статья с таким id не найдена');
      }
      if (article.owner._id.toString() === req.user._id) {
        return Article.findByIdAndRemove(req.params.id)
          .then((result) => res.status(200).send({ message: `Статья с id ${result._id} удалена` }))
          .catch((err) => next(new BadRequestError(err.message)));
      }
      throw new AuthorizationError('Необходимо авторизоваться чтобы удалить статью');
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
