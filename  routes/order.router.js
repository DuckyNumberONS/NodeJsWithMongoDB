const router = require("express").Router();
const orderController = require("../controllers/Order.controller");
const middlewareController = require("../controllers/middleware.controller");

router.get(
  "/getOrder",
  middlewareController.verifyTokenMember,
  orderController.getOrder
);
router.post(
  "/createOrder",
  middlewareController.verifyTokenMember,
  orderController.createOrder
);

module.exports = router;
