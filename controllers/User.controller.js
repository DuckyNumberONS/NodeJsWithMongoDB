const userSchema = require("../model/User");

const createUser = async (req, res) => {
  try {
    const existingUser = await userSchema.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(403).json("Email already exists");
    } else {
      const user = new userSchema({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
      });

      const savedUser = await user.save();
      res.json(savedUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await userSchema.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userSchema.findById(req.body.id);
    res.status(200).json("Delete successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  getAllUser,
  deleteUser,
};
