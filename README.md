# news-explorer-backend

Бекенд для проекта News Explorer.

К апи можно обратиться по `api.mlews.site` или `www.api.mlews.site`.

## API

- `POST /signup` создаёт пользователя с переданными в теле `email`, `password` и `name`.
>
**Пример запроса**
```
{
    "name": "Nastya",
    "email": "nastya@gmail.com",
	  "password": "12qwaszx"
}
```

- `POST /signin` проверяет переданные в теле почту и пароль и возвращает `JWT`;

- `GET /users/me` возвращает информацию о пользователе (email и имя);
- `GET /articles` возвращает все сохранённые пользователем статьи;
- `POST /articles` создаёт статью с переданными в теле keyword, title, text, date, source, link и image.
>
**Пример запроса**
```
{
  "keyword": "nature",
  "title": "nature ruined",
  "text": "nature ruined for some reason",
  "date": "12/04/2020",
  "source": "The Guardian",
  "link": "https://theguardian.com",
  "image": "https://guardian.com/abc"
}
```
- `DELETE /articles/articleId` удаляет сохранённую статью  по `_id`;

## Запуск сервера
`npm run start` Запустит сервер на `localhost:3000`.

`npm run dev` Запустит сервер на `localhost:3000` с с хот релоудом.
