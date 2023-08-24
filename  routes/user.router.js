const router = require("express").Router();
const {
  createUser,
  getAllUser,
  deleteUser,
  updateUser,
} = require("../controllers/User.controller");
const middlewareController = require("../controllers/middleware.controller");

router.post("/createUser", createUser);
router.get("/getAllUser", middlewareController.verifyTokenAdmin, getAllUser);
router.put(
  "/updateUser/:id",
  middlewareController.verifyTokenMember,
  updateUser
);
router.delete(
  "/deleteUser/:id",
  middlewareController.verifyTokenAdmin,
  deleteUser
);

module.exports = router;
