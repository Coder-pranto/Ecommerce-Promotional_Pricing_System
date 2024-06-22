import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import UpdateModal from "./UpdateModal";

const AllBrands = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = Cookies.get("token");

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/brand",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        // console.log(response.data.brands);
        setBrands(response.data.brands);
      }
    } catch (error) {
      console.error("Error fetching brands:", error.message);
      toast.error("An error occurred while retrieving the list of brands", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleUpdatedData = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const activeChecker = (brandId, currentStatus) => {
    console.log(brandId, currentStatus);
    handleUpdateBrand(brandId, { status: !currentStatus });
  };

  const handleUpdateBrand = async (brandId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/brand/update/${brandId}`,
        updatedData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log({ response });
      // console.log({ updatedData });

      if (response.status === 200) {
        fetchBrands();
        toast.success("Brand updated successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating brand:", error.message);
      toast.error("An error occurred while updating the brand", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteBrand = async (brandId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/brand/${brandId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchBrands();
        toast.success("Brand deleted successfully !!!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting brand:", error.message);
      toast.error("An error occurred while deleting the brand", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-5 h-[90%] overflow-auto text-nowrap w-full">
      <table className="min-w-50% bg-[#FEF4F2] rounded-xl">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-2 px-4 w-1/4">Name</th>
            <th className="py-2 px-4 w-1/4">Brand Type</th>
            <th className="py-2 px-4 w-1/4">Phone</th>
            <th className="py-2 px-4 w-1/4">Status</th>
            <th className="py-2 px-4 w-1/4">Action</th>
          </tr>
        </thead>
        <tbody className="border-2 border-gray-300">
          {brands.slice().reverse().map((brand, index) => (
            <tr
              key={brand._id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2 px-4 font-bold">{brand?.brandName}</td>
              <td className="py-2 px-4">{brand?.brandType}</td>
              <td className="py-2 px-4">{brand?.brandPhone}</td>
              <td
                className={`py-2 px-4 text-center ${brand.status ? "text-green-500" : "text-red-500"
                  }`}
              >
                {brand.status ? "active" : "inactive"}
              </td>
              <td className="py-2 px-4 text-center flex">
                <button
                  className="action-btns"
                  onClick={() => activeChecker(brand._id, brand.status)}
                >
                  <IoCheckmarkCircleOutline size="25px" />
                </button>
                <button
                  className="action-btns"
                  onClick={() => handleUpdatedData(brand)}
                >
                  <FaRegEdit size="25px" />
                </button>
                <button
                  className="action-btns"
                  onClick={() => handleDeleteBrand(brand._id)}
                >
                  <MdOutlineDeleteForever size="25px" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <UpdateModal
          setIsModalOpen={setIsModalOpen}
          handleUpdateBrand={handleUpdateBrand}
          brand={selectedBrand}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default AllBrands;
