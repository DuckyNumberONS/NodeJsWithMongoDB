const router = require('express').Router();
const authController = require('../middleware/auth/auth');
const authValidate = require('../validation/auth/authValidationMiddleware');

router.post('/login', authValidate.validateAuth, authController.loginUser);

module.exports = router;
