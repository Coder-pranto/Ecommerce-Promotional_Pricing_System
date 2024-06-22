// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { MdOutlineMedicalInformation } from "react-icons/md";
import dummyAdPurchaseData from "./dummyAdPurchaseData";
import dummyAdPostData from "./dummyAdPostData";

const AdvertisePurchasedTable = () => {
  const [adPurchases, setAdPurchases] = useState(dummyAdPurchaseData);
  const [adPosts, setAdPosts] = useState(dummyAdPostData);
  const [selectedAdPurchase, setSelectedAdPurchase] = useState({});
  const [modal, setModal] = useState(false);

  const handleDetails = (adId) => {
    adPosts.map((data) => {
      if (data._id === adId) {
        setSelectedAdPurchase(data);
        console.log(data);
      }
    });
    setModal(true);
  };

  return (
    <div className="max-w-screen-2xl p-4 mt-10 mx-40">
      <h2 className="text-2xl font-bold mb-4">
        Advertise Package Purchase List
      </h2>
      <div className="flex justify-center items-center">
        <table className="w-full bg-[#FEF4F2] rounded-lg overflow-hidden m-auto">
          <thead className="bg-primary  text-white">
            <tr>
              <th className="py-2 px-8 text-center">Seller ID</th>
              <th className="py-2 px-8 text-center">Ad Package ID</th>
              <th className="py-2 px-8 text-center">Status</th>
              <th className="py-2 px-8 text-center">Purchased At</th>
              <th className="py-2 px-8 text-center">Expiration Date</th>
              <th className="py-2 px-8 text-center">AD Details</th>
            </tr>
          </thead>
          <tbody>
            {adPurchases.map((adPurchase) => (
              <tr
                key={adPurchase._id}
                className={
                  adPurchases.indexOf(adPurchase) % 2 === 0
                    ? "bg-white"
                    : "bg-gray-100"
                }
              >
                <td className="py-2 px-8">{adPurchase.sellerId}</td>
                <td className="py-2 px-8">{adPurchase.adPackageId}</td>
                <td className="py-2 px-8">{adPurchase.status}</td>
                <td className="py-2 px-8">
                  {new Date(adPurchase.purchasedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-8">
                  {adPurchase.expirationDate
                    ? new Date(adPurchase.expirationDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-2 px-8">
                  <button
                    className="px-3 py-2 rounded-md text-black hover:bg-secondary"
                    onClick={() => handleDetails(adPurchase._id)}
                  >
                    <MdOutlineMedicalInformation size="25px" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && selectedAdPurchase && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
          <div className="fixed inset-0 bg-black opacity-80"></div>
          <div className="max-w-md w-full p-6 bg-white rounded-md shadow-lg z-10 border-primary border-4">
            <p className="text-2xl font-bold mb-4">Ad Purchase Details</p>
            <ul className="list-disc pl-4">
              <li className="mb-2">Name: {selectedAdPurchase.title}</li>
              <li className="mb-2">
                Description: {selectedAdPurchase.description}
              </li>
              <li>
                Ad Images:
                <div className="flex flex-wrap gap-4 mt-2">
                  {selectedAdPurchase.photos?.map((photo, index) => (
                    <div
                      key={index}
                      className="w-40 h-40 overflow-hidden rounded-md"
                    >
                      <img
                        src={photo}
                        className="w-full h-full object-cover"
                        alt={`Ad Photo ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </li>
            </ul>
            <button
              className="bg-red-600 hover:bg-red-800 text-white w-24 h-10 mt-6 rounded-md cursor-pointer"
              onClick={() => setModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvertisePurchasedTable;
