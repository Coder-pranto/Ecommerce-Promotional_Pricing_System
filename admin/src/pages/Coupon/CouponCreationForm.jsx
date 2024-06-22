import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const CouponForm = () => {
  const [formData, setFormData] = useState({
    couponCode: "",
    couponType: "percentage",
    discountPercentage: 0,
    validityPeriod: 0,
  });

  const token = Cookies.get("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/coupon",
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Coupon is created successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        setFormData({
          couponCode: "",
          couponType: "percentage",
          discountPercentage: 0,
          validityPeriod: 0,
        });
      }
    } catch (error) {
      console.error("Error creating coupon:", error.message);
      toast.error("An error occurred while creating coupon", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="couponCode">Coupon Code:</label>
        <input
          type="text"
          id="couponCode"
          name="couponCode"
          value={formData.couponCode}
          onChange={handleChange}
          required
        />

        <label htmlFor="couponType" className="w-full">
          Coupon Type:{" "}
          <select
            id="couponType"
            className="inline-block w-full text-center"
            name="couponType"
            value={formData.couponType}
            onChange={handleChange}
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
        </label>

        <label htmlFor="discountPercentage">Discount Percentage:</label>
        <input
          type="text"
          id="discountPercentage"
          name="discountPercentage"
          value={formData.discountPercentage}
          onChange={handleChange}
          required
        />

        <label htmlFor="validityPeriod">Validity Period:</label>
        <input
          type="text"
          id="validityPeriod"
          name="validityPeriod"
          value={formData.validityPeriod}
          onChange={handleChange}
          required
        />

        <div className="flex">
          <button
            type="submit"
            className="bg-primary text-white w-40 h-auto p-3 mx-auto mt-4 hover:bg-secondary rounded-md cursor-pointer"
          >
            Create Coupon
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default CouponForm;
