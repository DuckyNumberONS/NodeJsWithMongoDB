const paypal = require("../paypal/config");

const paypalController = {
  create_payment: async (req, res) => {
    try {
      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:3000",
          cancel_url: "http://localhost:3000",
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: "Iphone 4S",
                  sku: "001",
                  price: "25.00",
                  currency: "USD",
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: "USD",
              total: "25.00",
            },
            description: "Iphone 4S cũ giá siêu rẻ",
          },
        ],
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              res.redirect(payment.links[i].href);
            }
          }
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  detailPayment: async (req, res) => {
    try {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;

      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: "25.00",
            },
          },
        ],
      };
      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        function (error, payment) {
          if (error) {
            console.log(error.response);
            throw error;
          } else {
            console.log(JSON.stringify(payment));
            res.send("Success (Mua hàng thành công)");
          }
        }
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cancelPayment: async (req, res) => res.send("Cancelled (Đơn hàng đã hủy)"),
};

module.exports = paypalController;
