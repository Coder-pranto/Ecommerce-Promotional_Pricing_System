import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // location to navigate after login

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        formData
      );
      const userId = response.data.data._id;
      const userToken = response.data.data.token;
      const tokenExpiration = rememberMe ? { expires: 7 } : { expires: 1 };
      Cookies.set("token", userToken, tokenExpiration, {
        sameSite: "None",
        secure: true,
      });
      Cookies.set("userId", userId, { sameSite: "None", secure: true });

      const authToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGRlc2hpdC1iZC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTA4MTQ3MDQsImV4cCI6MTcxMDkwMTEwNH0.wx-JuX10xjpNUy1sVXsTRn0eCXKjAdLw0wA-fbciKVg"; // static admin token

      Cookies.set("auth", authToken, { sameSite: "None", secure: true });

      const response2 = await axios.get(
        `http://localhost:5000/api/v1/seller/all`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      const seller = response2?.data?.data?.find(
        (item) => item.customerId === userId
      );

      if (seller && seller.status === "approved") {
        Cookies.set("isSeller", true, { sameSite: "None", secure: true });
        Cookies.set("sellerID", seller._id, { sameSite: "None", secure: true });
      } else {
        Cookies.set("isSeller", false, { sameSite: "None", secure: true });
      }
      toast("Logged in successfully");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      toast("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:flex-1 flex justify-center items-center bg-zinc-200">
        <div className="p-5">
          <img
            src="./DiscountHutBlack.svg"
            className="w-[400px]"
            alt="DiscountHut Logo"
          />
        </div>
      </div>

      <div className="lg:flex-1">
        <div className="container mx-auto p-8 lg:mt-24 lg:w-3/5">
          <h2 className="text-4xl font-semibold pb-2">Log In</h2>
          <p className="mb-4 text-lg">
            Welcome back! Please enter your details!
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block font-semibold text-lg pb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              required
              className="border-2 rounded-md px-3 py-2 mb-4 w-full"
            />

            <label
              htmlFor="password"
              className="block font-semibold text-lg pb-2"
            >
              Password<sup className="text-red-500 font-bold">*</sup>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="**********"
                required
                className="border-2 rounded-md px-3 py-2 mb-4 w-full"
              />
              <div
                className="absolute inset-y-0 right-0 bottom-2.5 flex pr-3 items-center  cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="mr-2 text-lg"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember-me" className="text-lg">
                  Remember me
                </label>
              </div>
              <div>
                <Link to="*" className="font-semibold text-lg text-primary">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary w-full"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-lg text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-primary text-lg">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
