const { orderSchema } = require('./orderValidation.js');

const orderValidate = {
  validateOrder: async (req, res, next) => {
    try {
      const { error } = orderSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
module.exports = orderValidate;
