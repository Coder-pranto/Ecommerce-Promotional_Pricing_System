import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/v1/customer",
        formData
      );

      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
      });
      navigate("/login");
      toast.success("Signed up successfully! Please login now.");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <section className="lg:flex-1 flex justify-center items-center bg-zinc-200">
        <div className="p-5">
          <img
            src="./DiscountHutBlack.svg"
            alt="DiscountHut Logo"
            className="w-[400px]"
          />
        </div>
      </section>

      <div className="lg:flex-1">
        <div className="container mx-auto p-8 lg:mt-24 lg:w-3/5">
          <h2 className="text-4xl font-semibold pb-8">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="block font-semibold text-lg pb-2">
              Name<sup className="text-red-500 font-bold">*</sup>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              required
              className="border-2 rounded-md px-3 py-2 mb-4 w-full"
            />

            <label htmlFor="phone" className="block font-semibold text-lg pb-2">
              Phone Number<sup className="text-red-500 font-bold">*</sup>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Your Phone Number"
              required
              className="border-2 rounded-md px-3 py-2 mb-4 w-full"
            />

            <label htmlFor="email" className="block font-semibold text-lg pb-2">
              Email<sup className="text-red-500 font-bold">*</sup>
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
                minLength="8"
                required
                className="border-2 rounded-md px-3 py-2 mb-2 w-full"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <span className="text-primary pl-3">
              Must be at least 8 characters
            </span>

            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary w-full mt-3"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-lg text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary text-lg">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
