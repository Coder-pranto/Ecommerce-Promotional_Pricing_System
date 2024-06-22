/* eslint-disable react/prop-types */
import { useState } from "react";

const UpdateModal = ({
  setIsModalOpen,
  handleUpdatePackage,
  selectedPackage
}) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    duration: 0,
    price: 0,
    status: true,
  });

  const handleChange = (e) => {
    const value =
      e.target.type == "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    handleUpdatePackage(selectedPackage?._id, formData);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-opacity-70 bg-black">
      <div className="bg-white rounded-md p-6 w-80 border-primary border-4">
        <h2 className="text-lg font-semibold mb-4">Update Package</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              // value={formData.name}
              defaultValue={selectedPackage?.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              // value={formData.position}
              defaultValue={selectedPackage?.position}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              // value={formData.duration}
              defaultValue={selectedPackage?.duration}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              // value={formData.price}
              defaultValue={selectedPackage?.price}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4 flex ">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status :{" "}
              <input
                type="checkbox"
                id="status"
                name="status"
                // checked={formData.status}
                defaultChecked={selectedPackage?.status}
                onChange={handleChange}
                className="ml-2"
              />
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
