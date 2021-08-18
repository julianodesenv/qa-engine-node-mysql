const express = require('express');
const router = express.Router();
const isAuth = require('./../../middlewares/isAuth');

router.post('/', isAuth, require('./answers-post'));

module.exports = router;
