const paypal = require('../paypal/config');

const paypalController = {
  create_payment: async (req, res) => {
    try {
      const create_payment_json = req.body;

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              const hrefSandbox = payment.links[i].href;
              res.status(200).json({ hrefSandbox });
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
      const total = req.body;
      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: 'USD',
              total: total,
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
            res.send('Success');
          }
        },
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cancelPayment: async (req, res) => res.send('Cancelled'),
};

module.exports = paypalController;
