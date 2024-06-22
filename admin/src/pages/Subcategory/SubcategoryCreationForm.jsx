// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const SubcategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = Cookies.get("token");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/category/all",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log(response.data.data)
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      toast.error("An error occurred while fetching categories", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, description, category: selectedCategory };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/category/sub",
        data,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 201) {
        console.log(response.data);
        toast.success("Subcategory created successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });

        setName("");
        setDescription("");
        setSelectedCategory("");
      }
    } catch (error) {
      console.error("Error creating subcategory:", error.message);
      toast.error("An error occurred while creating subcategory", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-5 bg-[#FEF4F2] border-2 border-gray-200 rounded-lg"
      >
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            className="ml-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="descripion">
          Description:
          <textarea
            value={description}
            id="description"
            className="ml-2"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="category">
          Category:
          <select
            className="ml-2 border border-gray-300 rounded px-2 py-1"
            value={selectedCategory}
            id="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button
          type="submit"
          className="bg-primary text-white w-40 h-auto p-2 mx-auto mt-4 hover:secondary rounded-md cursor-pointer"
        >
          Create Subcategory
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SubcategoryForm;
