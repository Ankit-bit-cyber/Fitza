const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validateRegister, validateLogin } = require('../middlewares/validation.middleware');

router.post('/register', validateRegister, register);
router.post('/login',    validateLogin,    login);
router.get('/me',        protect,          getProfile);

module.exports = router;