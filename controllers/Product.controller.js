const Product = require("../model/Product");

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
      const product = new Product({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        category: req.body.category,
        price: req.body.price,
      });
      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
          },
        },
        { new: true }
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
