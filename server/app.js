const express = require("express");
require("express-async-errors"); // for handling asynchronous error

const app = express();
const http = require('http');
const server = http.createServer(app);

const socketInitializer = require('./config/socketInitializer')
socketInitializer.initializeSocketIO(server);

const connectDatabase = require("./databaseConfig/database");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const notFoundMiddleware = require("./middlewares/notFound.js");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware.js");
const Routes = require('./routes/index')

//* middlewares
require("dotenv").config();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.use(cookieParser());
app.use(fileUpload());

//* routes
app.use("/api/v1", Routes);

//* default
app.get("/", (req, res) => {
  res.send("server running");
});

//* error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = 5000;
server.listen(port, async() => { //Note: for socket.io u have to use server instead of app in listen function
  await connectDatabase();
  console.log(
    `> Server is up and running on : http://localhost:${port} `.brightGreen
      .bgWhite
  );
});

