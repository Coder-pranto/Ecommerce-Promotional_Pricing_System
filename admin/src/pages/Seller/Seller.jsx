/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  MdDoneOutline,
  MdOutlineEditLocation,
  MdOutlineSystemSecurityUpdate,
  MdOutlineCancel,
} from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import SellerDetailsModal from "./SellerDetailsModal";
import SellerLocationUpdate from "./SellerLocationUpdate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Seller = () => {
  // eslint-disable-next-line no-unused-vars
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [locationData, setLocationData] = useState({
    sellerId: "",
    longitude: 0,
    latitude: 0,
    shopMap: ""
  });

  const [modal, setModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const token = Cookies.get("token");

  const FetchSellersData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/seller/all",

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log("response", response.data.data);

      if (response.status === 200) {
        setSellers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Seller data:", error.message);
      toast.error(
        "An error occurred while retrieving the list of seller data",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  useEffect(() => {
    FetchSellersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateSeller = async (sellerId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/seller/${sellerId}`,
        updatedData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log(response.data);
      if (response.status === 200) {
        FetchSellersData();
        toast.success("Seller Info updated successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating seller", error.message);
      toast.error("An error occurred while updating the seller", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleApproval = (sellerId, check) => {
    handleUpdateSeller(sellerId, { status: check });
  };

  const handleDetails = ({ seller }) => {
    // console.log(seller);
    setSelectedSeller(seller);
    setModal(true);
    setModalAction("details");
  };

  const handleUpdateLocation = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/seller/locationUpdate/${locationData.sellerId}`,
        {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          shopMap: locationData.shopMap
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log("updated", typeof response.data.data.shopMap);
      // console.log("updated", response.data.data.shopMap);
      // console.log("updated", response.data.data);
      if (response.status === 200) {
        toast.success("Seller location updated successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });
        FetchSellersData();
        setLocationData({ sellerId: "", longitude: 0, latitude: 0 });
        setModal(false);
      }
    } catch (error) {
      console.error("Error updating seller location", error.message);
      toast.error("An error occurred while updating the seller location", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const locationModalOpen = (sellerId) => {
    //reset
    setLocationData({
      sellerId: "",
      longitude: "",
      latitude: "",
    });

    setLocationData({ ...locationData, sellerId });
    setModal(true);
    setModalAction("editLocation");
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-4 my-10 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Seller List</h2>
      <div className="flex flex-col m-auto items-center">
        <table className="min-w-full bg-[#FEF4F2] rounded-lg overflow-hidden border border-gray-200">
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-2 px-4 text-center">Seller ID</th>
              <th className="py-2 px-4 text-center">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-2 px-4 text-center">
                  {seller._id.toString().slice(-5)}
                </td>
                <td className="py-2 px-4 text-center">{seller.status}</td>

                <td className="py-2 px-4 flex justify-center items-center">
                  <button
                    className="action-btns"
                    onClick={() => handleDetails({ seller })}
                  >
                    <GrContactInfo size="25px" />
                  </button>
                  <button
                    className="action-btns"
                    onClick={() => locationModalOpen(seller._id)}
                  >
                    <MdOutlineEditLocation size="25px" />
                  </button>
                  <button
                    className="action-btns"
                    onClick={() => handleApproval(seller._id, "approved")}
                  >
                    <MdDoneOutline size="25px" />
                  </button>
                  <button
                    className="px-3 py-2 hover:bg-secondary rounded-md text-black"
                    onClick={() => handleApproval(seller._id, "rejected")}
                  >
                    <MdOutlineCancel size="25px" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && modalAction === "details" && (
        <SellerDetailsModal
          selectedSeller={selectedSeller}
          setModal={setModal}
        />
      )}

      {modal && modalAction === "editLocation" && (
        <SellerLocationUpdate
          setModal={setModal}
          locationData={locationData}
          setLocationData={setLocationData}
          handleUpdateLocation={handleUpdateLocation}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Seller;
