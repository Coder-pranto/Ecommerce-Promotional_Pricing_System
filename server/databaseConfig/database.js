const mongoose = require("mongoose");
const { mongo_uri } = require("../config");
const uri = mongo_uri;

const connectDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("> Database Connected...".rainbow.bgCyan);
  } catch (error) {
    console.log(
      `> Error while connecting to mongoDB : ${error.message}`.underline.red
    );
    process.exit(1);
  }
};

module.exports = connectDatabase;
