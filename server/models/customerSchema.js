const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      lowercase: true,
      maxLength: [50, "Name is too large"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [isEmail, "Invalid email"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [6, "Password should be at least 6 character"],
    },
    role: {
      type: String,
      enum: {
        values: ["customer", "seller"],
        message:
          "{VALUE} is not accepted, Please provide customer/seller as role",
      },
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.pre("save", function () {
  const bcryptHashRegex = /^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/;
  if (!bcryptHashRegex.test(this.password)) {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
});

customerSchema.methods.comparePassword = function (customerPassword) {
  const isMatch = bcrypt.compareSync(customerPassword, this.password);
  return isMatch;
};

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
