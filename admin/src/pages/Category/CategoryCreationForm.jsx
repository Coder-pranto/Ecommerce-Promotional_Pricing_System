// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const CategoryCreationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const token = Cookies.get("token");

  const handleCategoryImage = (e) => {
    const selectedFile = e.target.files[0];
    // console.log("image", selectedFile);

    if (!selectedFile) {
      toast.error("Please select a brand logo.");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }

    setImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, description, image };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/category",
        data,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        // console.log(response.data);
        setName("");
        setDescription("");
        toast.success("Category created successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Category Image:</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            className="mt-1 block w-full"
            onChange={handleCategoryImage}
            required
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="bg-primary text-white w-40 h-auto p-3 mx-44 mt-4 hover:bg-secondary rounded-md cursor-pointer"
          >
            Create Category
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CategoryCreationForm;
