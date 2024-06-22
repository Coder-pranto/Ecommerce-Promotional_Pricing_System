// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import LoadingSpinner from "../components/loadingSpinner";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const tableHeadings = [
  "Name",
  "Email",
  "Phone Number",
  "Role",
  // "Status",
  "Action",
];

export default function Discount() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  const token = Cookies.get("token");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/customer",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // console.log("response", response.data.data);
      setTimeout(() => {
        setCustomers(
          response.data.data.filter((customer) => customer?.role === "customer")
        );
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
      toast.error("An error occurred while retrieving the list of customers", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleStatusChange = async (customerId, newStatus) => {
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:5000/api/v1/discount/${customerId}`,
  //       {
  //         status: newStatus,
  //       },
  //       {
  //         headers: {
  //           Authorization: `${token}`,
  //         },
  //       }
  //     );
  //     console.log(customerId);
  //     if (response.status === 200) {
  //       setCustomers((prevCustomers) =>
  //         prevCustomers.map((customer) =>
  //           customer._id === customerId
  //             ? { ...customer, status: newStatus }
  //             : customer
  //         )
  //       );
  //     } else {
  //       console.error("Failed to update status:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error updating status:", error.message);
  //   }
  // };

  // const handleUpdateCustomer = async (customerId) => {
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:5000/api/v1//customer/${customerId}`,
  //       {
  //         headers: {
  //           Authorization: `${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       fetchCustomers();
  //       toast.success("Customer updated successfully !!!", {
  //         position: "top-center",
  //         autoClose: 2000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error updating customer:", error.message);
  //     toast.error("An error occurred while updating the customer", {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //   }
  // };

  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1//customer/${customerId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchCustomers();
        toast.success("Customer deleted successfully !!!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting customer:", error.message);
      toast.error("An error occurred while deleting the customer", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="m-5 h-90% overflow-auto">
      <table className="relative min-w-full bg-[#FEF4F2] rounded-lg overflow-hidden ">
        <thead className="bg-primary text-white">
          <tr>
            {tableHeadings.map((heading, index) => (
              <th key={index} className="py-2 px-4 text-nowrap">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={customer._id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2 px-4">{customer?.name}</td>
              <td className="py-2 px-4">{customer?.email}</td>
              <td className="py-2 px-4">{customer?.phone}</td>
              <td className="py-2 px-4">{customer?.role}</td>
              {/* <td
                className={`py-2 px-4 ${
                  customer.status === "approved"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {customer.status}
              </td> */}
              <td className="py-2 px-4 flex">
                {/* <button
                  className="action-btns"
                  onClick={() => handleStatusChange(customer._id, "approved")}
                >
                  <IoCheckmarkDoneCircleOutline size="25px" />
                </button>
                <button
                  className="action-btns"
                  onClick={() => handleStatusChange(customer._id, "rejected")}
                >
                  <TiDeleteOutline size="25px" />
                </button> */}
                {/* <button
                  className="action-btns"
                  onClick={() => handleUpdateCustomer(customer._id)}
                >
                  <FaRegEdit size="25px" />
                </button> */}
                <button
                  className="action-btns"
                  onClick={() => handleDeleteCustomer(customer._id)}
                >
                  <MdOutlineDeleteForever size="25px" />
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
}
