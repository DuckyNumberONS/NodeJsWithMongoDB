const Order = require('../model/Order');
const User = require('../model/User');

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
      const { username, product, totalOrder } = req.body;
      if (!username || !product || !totalOrder) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }
      const user = await User.findOne({ username: username });

      const newOrder = new Order({
        username: user._id,
        product: product,
        totalOrder: totalOrder,
      });

      const savedOrder = await newOrder.save();
      res.json(savedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = orderController;
