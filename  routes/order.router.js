const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const middlewareToken = require('../middleware/token/tokenMiddleware');
const validate = require('../middleware/validation/validationMiddleware');
const { orderSchema } = require('../validation/order/orderValidation.js');

router.get(
  '/getOrder',
  middlewareToken.verifyTokenMember,
  orderController.getOrder,
);

router.post(
  '/createOrder',
  validate(orderSchema),
  middlewareToken.verifyTokenMember,
  orderController.createOrder,
);

module.exports = router;
