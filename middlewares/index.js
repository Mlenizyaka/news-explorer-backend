const router = require('express').Router();

const bodyParser = require('./bodyParser');
const cookieParser = require('./cookieParser');
const limiter = require('./limiter');
const cors = require('./cors');

router.use(cors);
router.use(bodyParser);
router.use(cookieParser);
router.use(limiter);

module.exports = router;
