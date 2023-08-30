const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../model/User');

const authController = {
  accessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACESS_KEY,
      { expiresIn: '2h' },
    );
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user != null) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password,
        );
        if (validPassword) {
          const accessToken = authController.accessToken(user);
          const { password, ...userFilter } = user._doc;
          res.status(200).json({ userFilter, accessToken });
        } else {
          res.status(404).json('Wrong password');
        }
      } else {
        res.status(404).json('Wrong email ! ');
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
module.exports = authController;
