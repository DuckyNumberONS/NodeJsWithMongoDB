const router = require('express').Router();
const productsController = require('../controllers/product.controller');
const middlewareController = require('../middleware/token/token');
const productValidate = require('../validation/product/productValidationMiddleware');

router.get('/getAllProducs', productsController.getProducts);
router.post(
  '/createProduct',
  productValidate.validateProduct,
  middlewareController.verifyTokenAdmin,
  productsController.createProduct,
);
router.put(
  '/updateProduct/:id',
  productValidate.validateProduct,
  middlewareController.verifyTokenAdmin,
  productsController.updateProduct,
);
router.delete(
  '/deleteProduct/:id',
  middlewareController.verifyTokenAdmin,
  productsController.deleteProduct,
);

module.exports = router;
