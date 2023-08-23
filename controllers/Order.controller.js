const Order = require("../model/Order");
const User = require("../model/User");
const Product = require("../model/Product");

const orderController = {
  getOrder: async (req, res) => {
    try {
      const order = await Order.find();
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const { username, products, totalOrder } = req.body;

      if (!username || !products || !totalOrder) {
        return res.status(400).json({ error: "Missing required fields." });
      }
      const user = await User.findOne({ username: username });

      const newOrder = new Order({
        username: user._id,
        product: products,
        totalOrder: totalOrder,
      });

      const savedOrder = await newOrder.save();
      res.json(savedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //   updateProduct: async (req, res) => {
  //     try {
  //       const updatedProduct = await Todo.findOneAndUpdate(
  //         { _id: req.params.id },
  //         {
  //           $set: {
  //             title: req.body.title,
  //             description: req.body.description,
  //             completed: req.body.completed,
  //           },
  //         },
  //         { new: true }
  //       ).exec();

  //       res.json(updatedProduct);
  //     } catch (error) {
  //       res.status(500).json({ error: error.message });
  //     }
  //   },

  //   deleteProduct: async (req, res) => {
  //     try {
  //       const deleteProcduct = await Todo.deleteOne({ _id: req.params.id });
  //       res.json(deleteProcduct);
  //     } catch (error) {
  //       res.status(500).json({ error: error.message });
  //     }
  //   },
};

module.exports = orderController;
