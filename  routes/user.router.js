const router = require("express").Router();
const { createUser } = require("../controllers/User");

router.post("/postdata", createUser);

module.exports = router;
