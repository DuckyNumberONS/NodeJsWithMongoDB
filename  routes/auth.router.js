const router = require('express').Router();
const authController = require('../middleware/auth/authMiddleware');
const validate = require('../middleware/validation/validationMiddleware');
const { authSchema } = require('../validation/auth/authValidation.js');

router.post('/login', validate(authSchema), authController.loginUser);

module.exports = router;
