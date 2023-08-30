const router = require('express').Router();
const paypalController = require('../controllers/paypal.controller');
const middlewareController = require('../middleware/token/token');
const paymentValidate = require('../validation/payment/paymentValidationMiddleware');

router.post(
  '/pay',
  paymentValidate.validatePayment,
  middlewareController.verifyTokenMember,
  paypalController.create_payment,
);
router.get(
  '/success',
  middlewareController.verifyTokenMember,
  paypalController.detailPayment,
);
router.delete(
  '/cancel',
  middlewareController.verifyTokenMember,
  paypalController.cancelPayment,
);

module.exports = router;
