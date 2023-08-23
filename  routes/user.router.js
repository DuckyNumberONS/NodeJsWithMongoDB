const router = require("express").Router();
const {
  createUser,
  getAllUser,
  deleteUser,
} = require("../controllers/User.controller");
const middlewareController = require("../controllers/middleware.controller");

router.post("/createUser", createUser);
router.get("/getAllUser", middlewareController.verifyTokenAdmin, getAllUser);
router.delete(
  "/deleteUser/:id",
  middlewareController.verifyTokenAdmin,
  deleteUser
);

module.exports = router;
