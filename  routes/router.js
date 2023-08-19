const router = require("express").Router();
const todo = require("./todo.router");
const user = require("./user.router");

// Router
router.use("/todo", todo);
router.use("/user", user);

module.exports = router;
