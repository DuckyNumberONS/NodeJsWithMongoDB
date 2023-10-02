const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    totalOrder: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

// orderSchema.statics.getOrderDetails = function (orderId) {
//   return this.aggregate([
//     {
//       $match: { _id: mongoose.Types.ObjectId(orderId) },
//     },
//     {
//       $lookup: {
//         from: 'users',
//         localField: 'username',
//         foreignField: '_id',
//         as: 'userDetails',
//       },
//     },
//     {
//       $unwind: '$products',
//     },
//     {
//       $lookup: {
//         from: 'products',
//         localField: 'product.id',
//         foreignField: '_id',
//         as: 'productDetails',
//       },
//     },
//     {
//       $group: {
//         _id: '$_id',
//         userDetails: { $first: '$userDetails' },
//         products: { $push: '$product' },
//         totalOrder: { $first: '$totalOrder' },
//       },
//     },
//   ]).exec();
// };

module.exports = mongoose.model('Order', orderSchema);
