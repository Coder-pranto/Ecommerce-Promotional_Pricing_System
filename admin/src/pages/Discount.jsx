// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import LoadingSpinner from "../components/loadingSpinner";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const tableHeadings = [
  "Product",
  "Price",
  "Description",
  "Category",
  "Subcategory",
  "Discount Type",
  "Discount",
  "Seller",
  "Start Date",
  "End Date",
  "Status",
  "Action",
];

const Discount = () => {
  const [loading, setLoading] = useState(true);
  const [discounts, setDiscounts] = useState([]);

  const token = Cookies.get("token");

  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/discount",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // console.log("response", response.data.data);
      setTimeout(() => {
        setDiscounts(response.data.data);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching discounts:", error.message);
      toast.error("An error occurred while retrieving the list of discounts", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchDiscounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (discountId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/discount/${discountId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(discountId);

      if (response.status === 200) {
        setDiscounts((prevDiscounts) =>
          prevDiscounts.map((discount) =>
            discount._id === discountId
              ? { ...discount, status: newStatus }
              : discount
          )
        );
      } else {
        console.error("Failed to update status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  return (
    <div className="m-5 h-90% overflow-auto">
      <table className="relative min-w-full bg-[#FEF4F2] rounded-lg overflow-hidden ">
        <thead className="bg-primary text-white">
          <tr>
            {tableHeadings.map((heading, index) => (
              <th key={index} className="py-2 px-4">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {discounts.map((discount, index) => (
            <tr
              key={discount._id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2 px-4">{discount?.product_name}</td>
              <td className="py-2 px-4">{discount?.price}</td>
              <td className="py-2 px-4 max-w-[100px] truncate group">
                <span className="truncate">{discount?.description}</span>
                <span className="absolute hidden text-wrap group-hover:block  bg-white p-2 border border-gray-300 shadow-lg w-[400px] z-10">
                  {discount?.description}
                </span>
              </td>
              <td className="py-2 px-4">{discount?.category_id?.name}</td>
              <td className="py-2 px-4">{discount?.subcategory_id?.name}</td>
              <td className="py-2 px-4">{discount?.discount_type?.name}</td>
              <td className="py-2 px-4">{discount?.discount}</td>
              <td className="py-2 px-4">{discount?.seller_id?.shopName}</td>
              <td className="py-2 px-4">
                {new Date(discount.start_datetime).toLocaleDateString()}
              </td>
              <td className="py-2 px-4">
                {new Date(discount.end_datetime).toLocaleDateString()}
              </td>
              <td
                className={`py-2 px-4 ${discount.status === "approved"
                    ? "text-green-500"
                    : "text-red-500"
                  }`}
              >
                {discount.status}
              </td>
              <td className="py-2 px-4 flex">
                <button
                  className="action-btns"
                  onClick={() => handleStatusChange(discount._id, "approved")}
                >
                  <IoCheckmarkDoneCircleOutline size="25px" />
                </button>
                <button
                  className="action-btns"
                  onClick={() => handleStatusChange(discount._id, "rejected")}
                >
                  <TiDeleteOutline size="25px" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <LoadingSpinner />}
      <ToastContainer />
    </div>
  );
};

export default Discount;
