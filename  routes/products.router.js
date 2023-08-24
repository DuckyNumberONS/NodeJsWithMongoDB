const router = require("express").Router();
const productsController = require("../controllers/Product.controller");
const middlewareController = require("../controllers/middleware.controller");

router.get("/getAllProducs", productsController.getProducts);
router.post(
  "/createProduct",
  middlewareController.verifyTokenAdmin, //Admin
  productsController.createProduct
);
router.put(
  "/updateProduct/:id",
  middlewareController.verifyTokenAdmin, //Admin
  productsController.updateProduct
);
router.delete(
  "/deleteProduct/:id",
  middlewareController.verifyTokenAdmin, //Admin
  productsController.deleteProduct
);

module.exports = router;
