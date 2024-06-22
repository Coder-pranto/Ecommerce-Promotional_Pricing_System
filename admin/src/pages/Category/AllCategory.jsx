import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import UpdateModal from "./UpdateModal";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelecteCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = Cookies.get("token");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/category/all",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.data);
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      toast.error("An error occurred while retrieving the list of categories", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleUpdatedData = (category) => {
    setSelecteCategory(category);
    setIsModalOpen(true);
  };
  const activeChecker = (categoryId, currentStatus) => {
    handleUpdateCategory(categoryId, { status: !currentStatus });
  };

  const handleUpdateCategory = async (categoryId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/category/${categoryId}`,
        updatedData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        fetchCategories();
        toast.success("Category updated successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating category:", error.message);
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/category/${categoryId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchCategories();
        toast.success("Category deleted successfully !!!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error.message);
      toast.error("An error occurred while deleting the category", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col m-12 items-center mt-20 ">
      <table className="min-w-50% bg-[#FEF4F2] rounded-xl overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Subcategories</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="border-2 border-gray-300">
          {categories.map((category, index) => (
            <tr
              key={category._id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2 px-4 font-bold">{category.name}</td>
              <td className="py-2 px-4">{category.description}</td>
              <td className="py-2 px-4 text-center">
                <select className="ml-2 border border-gray-300 rounded px-2 py-1">
                  <option value="">---</option>
                  {category.subcategory.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </td>
              <td
                className={`py-2 px-4 text-center ${category.status ? "text-green-500" : "text-red-500"
                  }`}
              >
                {category.status ? "active" : "inactive"}
              </td>
              <td className="py-2 px-4 flex items-center">
                <button
                  className="action-btns"
                  onClick={() => activeChecker(category._id, category.status)}
                >
                  <IoCheckmarkCircleOutline size="25px" />
                </button>
                <button
                  className="action-btns"
                  onClick={() => handleUpdatedData(category)}
                >
                  <FaRegEdit size="25px" />
                </button>
                <button
                  className="action-btns"
                  onClick={() => handleDeleteCategory(category._id)}
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
          handleUpdateCategory={handleUpdateCategory}
          category={selectedCategory}
        />
      )}
    </div>
  );
};

export default AllCategory;
