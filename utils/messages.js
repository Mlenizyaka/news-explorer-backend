const messages = {
  registration: {
    wrongFields: 'Неверно указаны почта или пароль',
  },
  user: {
    isNotFound: 'Такой пользователь не найден',
    alreadyExists: 'Такой пользователь уже существует',
    unauthorizedUser: 'Необходимо авторизоваться чтобы удалить статью',
    loggedOut: 'Вы успешно вышли из системы',
  },
  article: {
    IdNotFound: 'Статья с таким id не найдена',
    isDeleted: 'Статья успешно удалена',
  },
};

module.exports = messages;
