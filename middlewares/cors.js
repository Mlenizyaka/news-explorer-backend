const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://mlenizyaka.github.io'],
  optionsSuccessStatus: 200,
  credentials: true,
};

router.use(cors(corsOptions));

module.exports = router;
