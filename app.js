require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routers = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(routers);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
