// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import UpdateModal from "./UpdateModal";

const AllAdvertise = () => {
  const [adPackages, setAdPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = Cookies.get("token");

  const fetchAdPackages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/advertise",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log("response", response.data);

      if (response.status === 200) {
        setAdPackages(response.data);
      }
    } catch (error) {
      console.error("Error fetching advertises:", error.message);
      toast.error(
        "An error occurred while retrieving the list of advertise packages",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  const handleUpdatedData = (adPackage) => {
    setSelectedPackage(adPackage);
    setIsModalOpen(true);
  };

  const handleUpdatePackage = async (adPackageId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/advertise/update/${adPackageId}`,
        updatedData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("response", response.data);
      if (response.status === 200) {
        fetchAdPackages();
        toast.success("Advertise package updated successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating advertise package:", error.message);
      toast.error("An error occurred while updating the advertise packages", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleDeletePackage = async (adPackageId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/advertise/delete/${adPackageId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("response", response.data);
      if (response.status === 200) {
        fetchAdPackages();
        toast.success("Advertise package deleted successfully !!!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting advertise package:", error.message);
      toast.error("An error occurred while deleting the advertise packages", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchAdPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col m-auto items-center mt-16">
      <table className="min-w-full bg-[#FEF4F2] rounded-lg overflow-hidden border border-gray-200">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Position</th>
            <th className="py-2 px-4">Duration (days)</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {adPackages.map((adPackage, index) => (
            <tr
              key={adPackage._id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2 px-4">{adPackage.name}</td>
              <td className="py-2 px-4">{adPackage.position}</td>
              <td className="py-2 px-4">{adPackage.duration}</td>
              <td className="py-2 px-4">{adPackage.price}</td>
              <td className="py-2 px-4">
                {adPackage.status ? "Active" : "Inactive"}
              </td>
              <td className="py-2 px-4 text-center">
                <button
                  className="mr-2"
                  onClick={() => handleUpdatedData(adPackage)}
                >
                  <FaRegEdit size="25px" />
                </button>
                <button
                  className="mr-2"
                  onClick={() => handleDeletePackage(adPackage._id)}
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
          handleUpdatePackage={handleUpdatePackage}
          selectedPackage={selectedPackage}
        />
      )}
    </div>
  );
};

export default AllAdvertise;
