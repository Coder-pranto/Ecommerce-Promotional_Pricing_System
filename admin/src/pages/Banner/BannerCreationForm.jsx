// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

export default function BannerCreationForm() {
  const token = Cookies.get("token");

  const [bannerName, setBannerName] = useState("");
  const [bannerCaption, setBannerCaption] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = {};
    if (bannerName === "") {
      validationError.name = "Please enter a banner name.";
    }
    if (bannerCaption === "") {
      validationError.type = "Please enter a banner caption.";
    }
    if (bannerLink === "") {
      validationError.type = "Please enter a banner link.";
    }
    setError(validationError);

    if (Object.keys(validationError).length === 0) {
      const formData = new FormData();
      formData.append("bannerName", bannerName);
      formData.append("caption", bannerCaption);
      formData.append("link", bannerLink);
      formData.append("banner_image", bannerImage);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/banner",
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
          toast.success("Banner Creation Successful!", {
            position: "top-center",
            autoClose: 2000,
          });

          setBannerName("");
          setBannerCaption("");
          setBannerLink("");
          setBannerImage(null);
        }
      } catch (error) {
        console.error("Error creating banner:", error.message);
        toast.error("An error occurred while creating banner", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  const handleBannerImageChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("pop", selectedFile);

    if (!selectedFile) {
      setError({ ...error, image: "Please select a banner image." });
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError({ ...error, image: "Please upload an image file." });
      return;
    }

    setError({ ...error, image: "" });

    setBannerImage(selectedFile);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Banner Name:
          <input
            type="text"
            name="bannerName"
            value={bannerName}
            onChange={(e) => setBannerName(e.target.value)}
          />
          {error.name && <span className="text-red-700">{error.name}</span>}
        </label>
        <br />
        <label>
          Banner Caption:
          <input
            type="text"
            name="bannerCaption"
            value={bannerCaption}
            onChange={(e) => setBannerCaption(e.target.value)}
          />
          {error.type && <span className="text-red-700">{error.type}</span>}
        </label>
        <br />
        <label>
          Banner Link:
          <input
            type="text"
            name="bannerLink"
            value={bannerLink}
            onChange={(e) => setBannerLink(e.target.value)}
          />
          {error.type && <span className="text-red-700">{error.type}</span>}
        </label>
        <br />
        <label>
          Banner Image:
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full"
            onChange={handleBannerImageChange}
            required
          />
          {error.image && <span className="text-red-700">{error.image}</span>}
        </label>
        <br />
        <div className="flex mx-auto">
          <button
            type="submit"
            className="bg-primary text-white w-40 h-auto p-3 mx-auto mt-4 hover:bg-secondary rounded-md cursor-pointer"
          >
            Create Banner
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}
