const router = require("express").Router();
const product = require("./products.router");
const order = require("./order.router");
const user = require("./user.router");
const auth = require("./auth.router");

// Router

router.use("/product", product);
router.use("/user", user);
router.use("/authen", auth);
router.use("/order", order);

module.exports = router;
