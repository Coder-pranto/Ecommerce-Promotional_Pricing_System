import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import UpdateModal from "./UpdateModal";

const AllSubsubsubcategory = () => {
  const [subsubsubcategories, setSubsubsubcategories] = useState([]);
  const [selectedSubsubsubCategory, setselectedSubsubsubCategory] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = Cookies.get("token");

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/category/subsubsub/all",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        // console.log(response.data.data);
        setSubsubsubcategories(response.data.data);
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

  const handleUpdatedData = (subsubsubcategory) => {
    setselectedSubsubsubCategory(subsubsubcategory);
    setIsModalOpen(true);
  };

  const activeChecker = (subsubsubcategoryId, currentStatus) => {
    handleUpdateSubsubsubCategory(subsubsubcategoryId, {
      status: !currentStatus,
    });
  };

  const handleUpdateSubsubsubCategory = async (
    subsubsubcategoryId,
    updatedData
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/category/subsubsub/${subsubsubcategoryId}`,
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

  const handleDeleteSubsubsubCategory = async (subsubsubcategoryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/category/subsubsub/${subsubsubcategoryId}`,
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
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="border-2 border-gray-300">
          {subsubsubcategories.map((subsubsubcategory, index) => (
            <tr
              key={subsubsubcategory._id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2 px-4 font-bold">{subsubsubcategory.name}</td>
              <td className="py-2 px-4">{subsubsubcategory.description}</td>

              <td
                className={`py-2 px-4 text-center ${subsubsubcategory.status ? "text-green-500" : "text-red-500"
                  }`}
              >
                {subsubsubcategory.status ? "active" : "inactive"}
              </td>
              <td className="py-2 px-4 flex items-center">
                <button
                  className="action-btns"
                  onClick={() =>
                    activeChecker(
                      subsubsubcategory._id,
                      subsubsubcategory.status
                    )
                  }
                >
                  <IoCheckmarkCircleOutline size="25px" />
                </button>
                <button
                  className="action-btns"
                  onClick={() => handleUpdatedData(subsubsubcategory)}
                >
                  <FaRegEdit size="25px" />
                </button>
                <button
                  className="action-btns"
                  onClick={() =>
                    handleDeleteSubsubsubCategory(subsubsubcategory._id)
                  }
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
          handleUpdateSubsubsubCategory={handleUpdateSubsubsubCategory}
          subsubsubcategory={selectedSubsubsubCategory}
        />
      )}
    </div>
  );
};

export default AllSubsubsubcategory;
