const Product = require('../model/Product');

const productsController = {
  getProducts: async (req, res) => {
    try {
      const product = await Product.find();
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const existingProduct = await Product.findOne({
        title: req.body.title,
      });
      if (existingProduct) {
        return res.status(403).json('Product already exists');
      } else {
        const product = new Product({
          title: req.body.title,
          description: req.body.description,
          urlImage: req.body.urlImage,
          category: req.body.category,
          price: req.body.price,
          quantity: req.body.quantity,
          isHot: req.body.isHot,
        });
        const savedProduct = await product.save();
        res.json(savedProduct);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const existingProduct = await Product.findById(req.params.id);
      if (!existingProduct) {
        return res.status(404).json('Product not found');
      }
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            urlImage: req.body.urlImage,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            isHot: req.body.isHot,
          },
        },
        { new: true },
      ).exec();

      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deleteProcduct = await Product.deleteOne({ _id: req.params.id });
      res.json(deleteProcduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = productsController;
