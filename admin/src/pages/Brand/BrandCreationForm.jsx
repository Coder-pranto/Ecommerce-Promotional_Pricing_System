// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
const CreateBrandForm = () => {
  const token = Cookies.get("token");

  const [brandName, setBrandName] = useState("");
  const [brandType, setBrandType] = useState("");
  const [brandPhone, setBrandPhone] = useState("");
  const [brandLogo, setBrandLogo] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = {};
    if (brandName === "") {
      validationError.name = "Please enter a Brand name.";
    }
    if (brandType === "") {
      validationError.type = "Please enter a Brand type.";
    }
    if (brandPhone === "") {
      validationError.type = "Please enter a Phone Number.";
    }
    setError(validationError);

    if (Object.keys(validationError).length === 0) {
      const formData = new FormData();
      formData.append("brandName", brandName);
      formData.append("brandType", brandType);
      formData.append("brandPhone", brandPhone);
      formData.append("imageXYZ", brandLogo);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/brand",
          formData,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          // console.log(response.data);
          toast.success("Brand Creation Successful!", {
            position: "top-center",
            autoClose: 2000,
          });

          setBrandName("");
          setBrandType("");
          setBrandPhone("");
          setBrandLogo(null);
        }
      } catch (error) {
        console.error("Error creating brand:", error.message);
        toast.error("An error occurred while creating brand", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  const handleBrandLogoChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("pop", selectedFile);

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

    setBrandLogo(selectedFile);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Brand Name:
          <input
            type="text"
            name="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          {error.name && <span className="text-red-700">{error.name}</span>}
        </label>
        <br />
        <label>
          Brand Type:
          <input
            type="text"
            name="brandType"
            value={brandType}
            onChange={(e) => setBrandType(e.target.value)}
          />
          {error.type && <span className="text-red-700">{error.type}</span>}
        </label>
        <br />
        <label>
          Brand Phone:
          <input
            type="text"
            name="brandPhone"
            value={brandPhone}
            onChange={(e) => setBrandPhone(e.target.value)}
          />
          {error.type && <span className="text-red-700">{error.type}</span>}
        </label>
        <br />
        <label>
          Brand Logo:
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full"
            onChange={handleBrandLogoChange}
            required
          />
          {error.logo && <span className="text-red-700">{error.logo}</span>}
        </label>
        <br />
        <div className="flex mx-auto">
          <button
            type="submit"
            className="bg-primary text-white w-40 h-auto p-3 mx-auto mt-4 hover:bg-secondary rounded-md cursor-pointer"
          >
            Create Brand
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CreateBrandForm;
