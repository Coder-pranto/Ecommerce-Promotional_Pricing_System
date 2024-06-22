import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdvertisePackageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    duration: 0,
    price: 0,
    status: false,
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:5000/api/v1/advertise",
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("API Response:", response.data);

      setFormData({
        name: "",
        position: "",
        duration: 0,
        price: 0,
        status: false,
      });
      toast.success("Advertise Creation Successful!!!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error creating ad package:", error.message);
      toast.error("Something went wrong! Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-[#FEF4F2] border border-gray-300 rounded-md shadow-md"
      >
        <label className="mb-4 flex flex-col" htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="mb-4 flex flex-col" htmlFor="position">
          Position:
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="mb-4 flex flex-col" htmlFor="duration">
          Duration (in days):
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="mb-4 flex flex-col" htmlFor="price">
          Price:
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="mb-4 flex flex-row items-start" htmlFor="status">
          Status:
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="ml-4 mt-2"
          />
        </label>

        <button
          type="submit"
          className="bg-primary text-white w-40 h-auto p-3 mx-24 mt-4 hover:bg-secondary rounded-md cursor-pointer"
        >
          Create Package
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default AdvertisePackageForm;
