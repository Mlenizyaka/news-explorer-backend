const { Joi } = require('celebrate');

const articleIdObj = {
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),
};

module.exports = articleIdObj;
