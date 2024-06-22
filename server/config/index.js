const path = require("path");

require("dotenv").config({
  path: path.join(process.cwd(), ".env"),
});

module.exports = {
  jwt_secret: process.env.JWT_SECRET,
  mongo_uri: process.env.MONGO_URI,
};
