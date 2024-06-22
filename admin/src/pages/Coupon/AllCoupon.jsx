/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { MdDoneOutline, MdOutlineCancel } from "react-icons/md";

const AllCoupon = () => {
  const [coupons, setCoupons] = useState([]);

  const token = Cookies.get("token");

  const fetchCoupons = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/coupon", {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status === 200) {
        setCoupons(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error.message);
      toast.error("An error occurred while retrieving the list of coupons", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleToggleStatus = async (couponId, currentStatus) => {
    currentStatus = currentStatus === "active" ? "inactive" : "active";
    handleUpdateCoupon(couponId, { status: currentStatus });
  };

  const handleUpdateCoupon = async (couponId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/coupon/update/${couponId}`,
        updatedData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      //   console.log(response);

      if (response.status === 200) {
        fetchCoupons();
        toast.success("Coupon updated successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating coupon:", error.message);
      toast.error("An error occurred while updating the coupon", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (couponId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/coupon/${couponId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      //   console.log(response);
      if (response.status === 200) {
        fetchCoupons();
        toast.success("Coupon deleted successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting coupon:", error.message);
      toast.error("An error occurred while deleting the coupon", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col m-auto items-center mt-16">
      <table className="min-w-full bg-[#FEF4F2] rounded-lg overflow-hidden border border-gray-200">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-2 px-4">Coupon Code</th>
            <th className="py-2 px-4">Coupon Type</th>
            <th className="py-2 px-4">Discount Percentage</th>
            <th className="py-2 px-4">Validity Period</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2 px-4">{coupon.couponCode}</td>
              <td className="py-2 px-4">{coupon.couponType}</td>
              <td className="py-2 px-4 text-center">
                {coupon.discountPercentage}
                {coupon.couponType === "fixed" ? " ৳" : "%"}
              </td>
              <td className="py-2 px-4 text-center">
                {coupon.validityPeriod} days
              </td>
              <td
                className={`py-2 px-4 text-center ${
                  coupon.status == "active" ? "text-green-500" : "text-red-500"
                }`}
              >
                {coupon.status}
              </td>
              <td className="py-2 px-4">
                <button
                  className="py-2 px-4"
                  onClick={() => handleToggleStatus(coupon._id, coupon.status)}
                >
                  <MdDoneOutline size="25px" />
                </button>
                <button
                  className="py-2 px-4"
                  onClick={() => handleDelete(coupon._id)}
                >
                  <MdOutlineCancel size="25px" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default AllCoupon;
