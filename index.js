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
app.use("/main", loginRouter);

// Bus routes
const busRouter = require("./routes/bus.routes");
app.use("/bus", busRouter);

// Ticket routes
const ticketRouter = require("./routes/ticket.routes");
app.use("/ticket", ticketRouter);

// Timetable routes
const timetableRouter = require("./routes/timetable.routes");
app.use("/timetable", timetableRouter);

//BusRoute routes
const addNewBusRoute = require("./routes/busRoute.routes");
app.use("/busroute", addNewBusRoute);

//UserAccount routes
const userAccountRouter = require("./routes/user.routes");
const DatabaseConnectionSingleton = require("./dbConnection");
app.use("/user", userAccountRouter);

// Instanciate the singleton
DatabaseConnectionSingleton.getInstance();

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connection success!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
