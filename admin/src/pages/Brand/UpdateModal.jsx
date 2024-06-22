/* eslint-disable react/prop-types */
import { useState } from "react";

const UpdateModal = ({ setIsModalOpen, handleUpdateBrand, brand }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    brandName: "",
    brandType: "",
    brandPhone: "",
    imageXYZ: null,
    status: true,
  });

  const handleChange = (e) => {
    const value =
      e.target.type == "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleBrandLogoChange = (e) => {
    const selectedFile = e.target.files[0];
    // console.log("pop", selectedFile);

    if (!selectedFile) {
      setError({ ...error, logo: "Please select a brand logo." });
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError({ ...error, logo: "Please upload an image file." });
      return;
    }

    const maxSize = 1024 * 1024; // 1MB
    if (selectedFile.size > maxSize) {
      setError({ ...error, logo: "Please upload an image smaller than 1MB." });
      return;
    }

    setError({ ...error, logo: "" });

    setFormData({ ...formData, ["imageXYZ"]: selectedFile });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    handleUpdateBrand(brand?._id, formData);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-opacity-70 bg-black">
      <div className="bg-white rounded-md p-6 w-80 border-primary border-4">
        <h2 className="text-lg font-semibold mb-4">Update brand</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="brandName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              defaultValue={brand?.brandName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="brandType"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <input
              type="text"
              id="brandType"
              name="brandType"
              defaultValue={brand.brandType}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="brandPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="brandPhone"
              name="brandPhone"
              defaultValue={brand?.brandPhone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageXYZ"
              className="block text-sm font-medium text-gray-700"
            >
              Brand Logo
            </label>
            <input
              id="imageXYZ"
              name="imageXYZ"
              type="file"
              accept="image/*"
              className="mt-1 block w-full"
              onChange={handleBrandLogoChange}
              required
            />
            {error.logo && <span className="text-red-700">{error.logo}</span>}
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
                defaultChecked={brand.status}
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
