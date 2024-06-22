const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const authServices = require("../services/authService");
const generateJwtToken = require("../utils/generateJwtToken");

const login = async (req, res) => {
  console.log("from auth controller");
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Email and Password are required!");
  }
  const user = await authServices.loginService(email);

  if (!user) {
    throw new CustomError.BadRequestError("Invalid email or password!");
  }

  // check the password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new CustomError.BadRequestError("Invalid email or password!");
  }

  // generate jwt token
  const payload = {
    email: user.email,
    role: user.role,
  };

  // console.log(customer);
  const token = await generateJwtToken(payload); 

  const { password: pwd, ...otherInfoWithoutPass } = user.toObject();
  otherInfoWithoutPass.token = token;

  res.status(StatusCodes.OK).json({
    status: "success",
    data: otherInfoWithoutPass,
  });
};

module.exports = {
  login,
};
