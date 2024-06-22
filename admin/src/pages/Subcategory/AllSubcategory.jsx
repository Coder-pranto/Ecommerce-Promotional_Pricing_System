import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import UpdateModal from "./UpdateModal";

const AllSubCategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubCategory, setselectedSubCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = Cookies.get("token");

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/category/sub/all",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        // console.log(response.data.data);
        // console.log(response.data.data.subcategory);
        setSubcategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
      toast.error(
        "An error occurred while retrieving the list of subcategories",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );
    }
  };

  const handleUpdatedData = (subcategory) => {
    setselectedSubCategory(subcategory);
    setIsModalOpen(true);
  };

  const activeChecker = (subcategoryId, currentStatus) => {
    handleUpdateSubCategory(subcategoryId, { status: !currentStatus });
  };

  const handleUpdateSubCategory = async (subcategoryId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/category/sub/${subcategoryId}`,
        updatedData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      //   console.log(response);

      if (response.status === 200) {
        fetchSubCategories();
        toast.success("Subcategory updated successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating subcategory:", error.message);
      toast.error("An error occurred while updating the subcategory", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteSubCategory = async (subcategoryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/category/sub/${subcategoryId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchSubCategories();
        toast.success("Subcategory deleted successfully !!!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error.message);
      toast.error("An error occurred while deleting the subcategory", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchSubCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col m-12 items-center mt-20 overflow-auto ">
      <table className="min-w-50% bg-[#FEF4F2] rounded-xl ">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Subsubcategory</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="border-2 border-gray-300">
          {subcategories.map((subcategory, index) => (
            <tr
              key={subcategory._id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2 px-4 font-bold">{subcategory.name}</td>
              <td className="py-2 px-4">{subcategory.description}</td>

              <td className="py-2 px-4 text-center">
                <select className="ml-2 border border-gray-300 rounded px-2 py-1">
                  <option value="">---</option>
                  {subcategory.subsubcategory.map((subsubcategory) => (
                    <option key={subsubcategory._id} value={subsubcategory._id}>
                      {subsubcategory.name}
                    </option>
                  ))}
                </select>
              </td>

              <td
                className={`py-2 px-4 text-center ${subcategory.status ? "text-green-500" : "text-red-500"
                  }`}
              >
                {subcategory.status ? "active" : "inactive"}
              </td>
              <td className="py-2 px-4 flex items-center">
                <button
                  className="action-btns"
                  onClick={() =>
                    activeChecker(subcategory._id, subcategory.status)
                  }
                >
                  <IoCheckmarkCircleOutline size="25px" />
                </button>
                <button
                  className="action-btns"
                  onClick={() => handleUpdatedData(subcategory)}
                >
                  <FaRegEdit size="25px" />
                </button>
                <button
                  className="action-btns"
                  onClick={() => handleDeleteSubCategory(subcategory._id)}
                >
                  <MdOutlineDeleteForever size="25px" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
      {isModalOpen && (
        <UpdateModal
          setIsModalOpen={setIsModalOpen}
          handleUpdateSubCategory={handleUpdateSubCategory}
          subcategory={selectedSubCategory}
        />
      )}
    </div>
  );
};

export default AllSubCategory;
