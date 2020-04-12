const router = require('express').Router();
const auth = require('../middlewares/auth');

const { getUserData } = require('../controllers/users.js');

router.use(auth);

router.get('/me', getUserData);

module.exports = router;
