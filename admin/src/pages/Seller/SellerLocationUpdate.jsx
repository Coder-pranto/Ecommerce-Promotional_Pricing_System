/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'

const SellerLocationUpdate = ({ setModal, locationData, setLocationData, handleUpdateLocation}) => {
  return (
    <>
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className=" bg-white w-96 p-6 rounded-lg border-4 border-primary">
            <p className="text-lg font-semibold mb-4">Edit Seller Location</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Latitude:</label>
              <input
                type="text"
                value={locationData.latitude}
                onChange={(e) => setLocationData({ ...locationData, latitude: e.target.value })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Longitude:</label>
              <input
                type="text"
                value={locationData.longitude}
                onChange={(e) => setLocationData({ ...locationData, longitude: e.target.value })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Shop Map:</label>
              <input
                type="text"
                value={locationData.shopMap}
                onChange={(e) => setLocationData({ ...locationData, shopMap: e.target.value })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            
          <div className="flex justify-between">
              <button
                  onClick={handleUpdateLocation}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Update Location
                </button>
              <button
                  onClick={()=> setModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Close
                </button>
          </div>
          </div>
        </div>
    </>
  )
}

export default SellerLocationUpdate;