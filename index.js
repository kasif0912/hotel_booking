require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const { connectDB } = require("./db/connection");
const DefaultData = require("./defaultData");
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

connectDB()
  .then(() => app.listen(port, () => console.log("server started")))
  .catch(() => console.log("error"));

DefaultData();
