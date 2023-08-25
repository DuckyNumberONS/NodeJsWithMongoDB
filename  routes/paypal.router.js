const router = require("express").Router();
const paypalController = require("../controllers/paypal.controller");
const middlewareController = require("../controllers/middleware.controller");

router.post(
  "/pay",
  // middlewareController.verifyTokenMember, //Admin
  paypalController.create_payment
);
router.get("/success", paypalController.detailPayment);
router.delete(
  "/cancel",
  middlewareController.verifyTokenMember, //Admin
  paypalController.cancelPayment
);

module.exports = router;
