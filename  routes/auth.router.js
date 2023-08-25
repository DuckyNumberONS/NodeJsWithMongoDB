const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.loginUser);
// router.post("/logout", authController.logoutUser);

module.exports = router;