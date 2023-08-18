const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const PORT = 8000;

const app = express();

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const router = require("./ routes/router");
app.use(router);
require("./mongoDB/config");
