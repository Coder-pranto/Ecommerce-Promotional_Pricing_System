/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateModal = ({ setIsModalOpen, handleUpdateCategory, category }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  console.log(formData);

  const handleChange = (e) => {
    const value =
      e.target.type == "checkbox" ? e.target.checked : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleimageChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("image", selectedFile);

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    setFormData({ ...formData, image: selectedFile });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleUpdateCategory(category._id, formData);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-opacity-70 bg-black">
      <div className="bg-white rounded-md p-6 w-80 border-primary border-4">
        <h2 className="text-lg font-semibold mb-4">Update Category</h2>
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
              defaultValue={category.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              defaultValue={category.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleimageChange}
              required
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
                defaultChecked={category.status}
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
