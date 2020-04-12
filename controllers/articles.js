const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const messages = require('../utils/messages');

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
  Article.findById({ _id: req.params.id }).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(messages.article.IdNotFound);
      }
      if (article.owner.equals(req.user._id)) {
        return Article.findByIdAndRemove(req.params.id)
          .then(() => res.status(200).send({ message: messages.article.isDeleted }))
          .catch((err) => next(new BadRequestError(err.message)));
      }
      throw new ForbiddenError(messages.user.unauthorizedUser);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
