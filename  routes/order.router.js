const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const middlewareController = require('../middleware/token/token');
const orderValidate = require('../validation/order/orderValidationMiddleware');

router.get(
  '/getOrder',
  middlewareController.verifyTokenMember,
  orderController.getOrder,
);

router.post(
  '/createOrder',
  orderValidate.validateOrder,
  middlewareController.verifyTokenMember,
  orderController.createOrder,
);

module.exports = router;
