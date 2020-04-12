const router = require('express').Router();
const { celebrate } = require('celebrate');
const { userCreate } = require('../controllers/users');
const userCreateObj = require('../celebrate_validation_objects/userCreateObj');

router.post('/', celebrate(userCreateObj), userCreate);

module.exports = router;
