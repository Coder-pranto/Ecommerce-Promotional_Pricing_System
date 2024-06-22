import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import UpdateModal from "./UpdateModal";

const AllBanners = () => {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = Cookies.get("token");

  const fetchBanners = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/banner",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        setBanners(response.data.banners);
      }
    } catch (error) {
      console.error("Error fetching banners:", error.message);
      toast.error("An error occurred while retrieving the list of banners", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleUpdatedData = (banner) => {
    setSelectedBanner(banner);
    setIsModalOpen(true);
  };

  const activeChecker = (bannerId, currentStatus) => {
    // console.log(bannerId, currentStatus);
    handleUpdateBanner(bannerId, { status: !currentStatus });
  };

  const handleUpdateBanner = async (bannerId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/banner/${bannerId}`,
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
        fetchBanners();

        toast.success("Banner updated successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating banner:", error.message);
      toast.error("An error occurred while updating the banner", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/banner/${bannerId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchBanners();
        toast.success("Banner deleted successfully !!!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting banner:", error.message);
      toast.error("An error occurred while deleting the banner", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-5 h-[90%] overflow-auto text-nowrap w-full">
      <table className="min-w-50% bg-[#FEF4F2] rounded-xl">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-2 px-4 w-1/4">Name</th>
            <th className="py-2 px-4 w-1/4">Caption</th>
            <th className="py-2 px-4 w-1/4">Link</th>
            <th className="py-2 px-4 w-1/4">Banner Preview</th>
            <th className="py-2 px-4 w-1/4">Date of Post</th>

            <th className="py-2 px-4 w-1/4">Status</th>
            <th className="py-2 px-4 w-1/4">Action</th>
          </tr>
        </thead>
        <tbody className="border-2 border-gray-300">
          {banners
            .slice()
            .reverse()
            .map((banner, index) => (
              <tr
                key={banner._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-2 px-4 text-center font-bold">
                  {banner?.bannerName}
                </td>
                <td className="py-2 text-center px-4">{banner.caption}</td>
                <td className="py-2 text-center px-4">{banner?.link}</td>
                <td className="py-2 px-4">
                  <img
                    src={`https://api.discounthutdeshit.tailormaster.xyz${banner?.banner_image}`}
                    className="w-[50%] mx-auto"
                    alt="Preview"
                  />
                </td>
                <td className="py-2 px-4">{banner.createdAt.slice(0, 10)}</td>
                <td
                  className={`py-2 px-4 text-center ${banner.status ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {banner.status ? "active" : "inactive"}
                </td>
                <td className="py-2 px-4 text-center flex">
                  <button
                    className="action-btns"
                    onClick={() => activeChecker(banner._id, banner.status)}
                  >
                    <IoCheckmarkCircleOutline size="25px" />
                  </button>
                  <button
                    className="action-btns"
                    onClick={() => handleUpdatedData(banner)}
                  >
                    <FaRegEdit size="25px" />
                  </button>
                  <button
                    className="action-btns"
                    onClick={() => handleDeleteBanner(banner._id)}
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
          handleUpdateBanner={handleUpdateBanner}
          banner={selectedBanner}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default AllBanners;
