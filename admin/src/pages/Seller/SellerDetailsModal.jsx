/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const SellerDetailsModal = ({ selectedSeller, setModal }) => {
  console.log(selectedSeller)
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-md border-4 border-primary">
        <h3 className="text-2xl font-bold mb-4">Seller Details</h3>

        <p className="mb-2">Seller ID: {selectedSeller && selectedSeller?._id}</p>
        <p className="mb-2">Customer ID: {selectedSeller && selectedSeller?.customerId}</p>
        <p className="mb-2">Identity: {selectedSeller && selectedSeller.identityType === 'nid' ? 'NID' : 'Trade-License'}</p>
        <p className="mb-2">Status: {selectedSeller && selectedSeller?.status}</p>

        <h4 className="text-lg font-semibold mt-4 mb-2 text-primary">Shop Details:</h4>
        <p className="mb-2">Identity Image:</p>
        {selectedSeller && selectedSeller.identityImage && selectedSeller.identityImage.length > 0 && (
          <img src={`https://api.discounthutdeshit.tailormaster.xyz/${selectedSeller.identityImage[0]}`} alt="Identity" className="w-full max-h-48 mb-4 rounded-lg border border-1 border-secondary" />
        )}

        <p className="mb-2">Shop Name: {selectedSeller && selectedSeller?.shopName}</p>
        {/* <p className="mb-2">Shop Type: {selectedSeller && selectedSeller?.shopType}</p>
        <p className="mb-2">Brand Name: {selectedSeller && selectedSeller?.brandName}</p>
        <p className="mb-2">Shopping Mall: {selectedSeller && selectedSeller?.shoppingMall}</p> */}
        <p className="mb-2">Shop Address: {selectedSeller && selectedSeller?.shopAddress}</p>
        <p className="mb-2">Shop Rating: {selectedSeller && selectedSeller?.averageRating.toFixed(1)}</p>
        <p className="mb-2">Shop Review count: {selectedSeller && selectedSeller?.numReviews}</p>

        <h4 className="text-lg font-semibold mt-4 mb-2 text-primary">Location:</h4>

        {selectedSeller && selectedSeller.location ? (
          <p className="mb-2">
            Latitude: {selectedSeller?.location?.coordinates[1]}, Longitude: {selectedSeller?.location?.coordinates[0]}
          </p>
        ) : (
          <p className="mb-2">No location available for this Seller</p>
        )}

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none flex justify-center"
          onClick={() => setModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SellerDetailsModal;
