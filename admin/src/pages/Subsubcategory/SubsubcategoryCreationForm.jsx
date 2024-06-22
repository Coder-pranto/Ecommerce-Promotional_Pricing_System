// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const SubsubcategoryCreationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

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
    const data = { name, description, category: selectedCategory, subcategory: selectedSubCategory };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/category/subsub",
        data,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Subsubcategory created successfully !!!", {
          position: "top-center",
          autoClose: 3000,
        });
        setName("");
        setDescription("");
        setSelectedCategory("");
        setSelectedSubCategory("");
      }
    } catch (error) {
      console.error("Error creating subsubcategory:", error.message);
      toast.error("An error occurred while creating subsubcategory", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const selectedCategoryObj = categories.find(category => category._id === categoryId);
    setSubCategories(selectedCategoryObj ? selectedCategoryObj.subcategory : []);
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
            onChange={(e) => handleCategoryChange(e.target.value)}
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
        <label htmlFor="subcategory">
          Subcategory:
          <select
            className="ml-2 border border-gray-300 rounded px-2 py-1"
            value={selectedSubCategory}
            id="subcategory"
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a subcategory
            </option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button
          type="submit"
          className="bg-primary text-white w-48 h-auto p-2 mx-auto mt-4 hover:secondary rounded-md cursor-pointer"
        >
          Create Subsubcategory
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default SubsubcategoryCreationForm




