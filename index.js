const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
require("dotenv").config();

const PORT = process.env.PORT || 8070;


app.use(credentials);

app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true }));



//Login routes
const loginRouter = require("./routes/login.routes");
app.use("main", loginRouter);

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connection success!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
