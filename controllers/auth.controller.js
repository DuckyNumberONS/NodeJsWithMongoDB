// const bcrypt = require("bcrypt"); this libery private password
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authController = {
  // RegisterUser
  //   registerUser: async (req, res) => {
  //     try {
  //     } catch (error) {
  //       res.status(500).json(err);
  //     }
  //   },

  accessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACESS_KEY,
      { expiresIn: "2h" }
    );
  },

  // refreshToken: (user) => {
  //   return jwt.sign(
  //     {
  //       id: user.id,
  //       admin: user.admin,
  //     },
  //     process.env.JWT_REFRESH_KEY,
  //     { expiresIn: "1d" }
  //   );
  // },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user != null) {
        if (user.password == req.body.password) {
          const accessToken = authController.accessToken(user);
          // const refreshToken = authController.refreshToken(user);
          const { password, ...userFilter } = user._doc;

          res.status(200).json({ userFilter, accessToken });
        } else {
          res.status(404).json("Wrong password");
        }
      } else {
        res.status(404).json("Wrong email ! ");
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // logoutUser: async (req, res) => {
  //   try {
  //   } catch (error) {
  //     return res.status(500).json({ error: "" });
  //   }
  // },
};
module.exports = authController;
