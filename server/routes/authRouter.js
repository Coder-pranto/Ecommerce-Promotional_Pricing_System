const express = require("express");
const authControllers = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/login", authControllers.login);

module.exports = authRouter;
