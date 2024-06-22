/* eslint-disable react/prop-types */
import { useState } from "react";

const UpdateModal = ({ setIsModalOpen, handleUpdateBanner, banner }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    bannerName: "",
    caption: "",
    link: "",
    banner_image: null,
    status: banner.status,
  });

  const handleChange = (e) => {
    const value =
      e.target.type == "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleBannerImageChange = (e) => {
    const selectedFile = e.target.files[0];
    // console.log("pop", selectedFile);

    if (!selectedFile) {
      setError({ ...error, image: "Please select a banner image." });
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError({ ...error, image: "Please upload an image file." });
      return;
    }

    setError({ ...error, image: "" });

    setFormData({ ...formData, ["banner_image"]: selectedFile });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    handleUpdateBanner(banner?._id, formData);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-opacity-70 bg-black">
      <div className="bg-white rounded-md p-6 w-80 border-primary border-4">
        <h2 className="text-lg font-semibold mb-4">Update Banner</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="bannerName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="bannerName"
              name="bannerName"
              defaultValue={banner?.bannerName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="caption"
              className="block text-sm font-medium text-gray-700"
            >
              Caption
            </label>
            <input
              type="text"
              id="caption"
              name="caption"
              defaultValue={banner.caption}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Link
            </label>
            <input
              type="text"
              id="link"
              name="link"
              defaultValue={banner?.link}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="banner_image"
              className="block text-sm font-medium text-gray-700"
            >
              Banner Image
            </label>
            <input
              id="banner_image"
              name="banner_image"
              type="file"
              accept="image/*"
              className="mt-1 block w-full"
              onChange={handleBannerImageChange}
              required
            />
            {error.image && <span className="text-red-700">{error.image}</span>}
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
                defaultChecked={banner.status}
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
