const router = require('express').Router();
const {
  createUser,
  getAllUser,
  deleteUser,
  updateUser,
} = require('../controllers/user.controller');

const userValidate = require('../validation/user/userValidationMiddleware');
const middlewareController = require('../middleware/token/token');
router.post('/createUser', userValidate.validateUser, createUser);
router.get('/getAllUser', middlewareController.verifyTokenAdmin, getAllUser);
router.put(
  '/updateUser/:id',
  userValidate.validateUser,
  middlewareController.verifyTokenMember,
  updateUser,
);
router.delete(
  '/deleteUser/:id',
  middlewareController.verifyTokenAdmin,
  deleteUser,
);

module.exports = router;
