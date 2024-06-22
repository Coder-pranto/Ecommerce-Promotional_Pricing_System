/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import InputField from "../../../components/Forms/InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateMutation } from "../../../utils/api";
import toast from "react-hot-toast";
import { useState } from "react";
import imageUploadIcon from "../../../../public/seller/image-upload-icon/lets-icons_upload.png";
import Cookies from "js-cookie";
import axios from "axios";

export default function AddProfile({
  setCurrentStep,
  setCompleteStep,
  setSellerId,
}) {
  const [selectedImageName, setSelectedImageName] = useState("");

  const token = Cookies.get("token");
  const customerId = Cookies.get("userId");

  const addProfileMutation = useCreateMutation(
    "addProfile",
    "/seller/add-profile",
    token
  );

  // form schema
  const schema = yup.object().shape({
    shopName: yup.string().required("Shop name is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .max(11, "Phone number must be at most 11 digits"),
    email: yup.string().required("Email is required"),
    shopLogo: yup.mixed().test("imageRequired", "Logo is required", (value) => {
      return value && value.length > 0;
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    const payload = {
      customerId,
      shopName: data.shopName,
      email: data.email,
      phone: data.phone,
      shopLogo: data.shopLogo[0],
      status: "approved", // pras chnaged this.// u should remove this later
    };

    for (let key in payload) {
      formData.append(key, payload[key]);
    }

    // const response2 = await axios.patch(
    //   `http://localhost:5000/api/v1/customer/${customerId}`,
    //   { role: "seller" }
    // );

    // console.log(response2);

    const response = await addProfileMutation.mutateAsync(formData);
    if (response.status === 200) {

      //* admin will approve the seller. Here i use automatic approved.
      await axios.patch(
        `http://localhost:5000/api/v1/customer/${customerId}`,
        { role: "seller" }
      );
      setSellerId(response.data.data._id);
      setCurrentStep(2);
      setCompleteStep(1);
      toast.success("Please provide business address");
    } else {
      toast.error("Failed! try after sometime!");
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageName(file.name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedImageName(file.name);
    }
  };

  return (
    <div>
      <h2 className="mt-5 md:text-xl xs:text-md font-semibold">
        Shop Information
      </h2>
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex md:flex-row xs:flex-col md:gap-0 xs:gap-5 justify-between">
            <div className="md:w-[48%] xs:w-full p-5">
              <InputField
                label="Shop Name"
                name="shopName"
                register={register}
                error={errors?.shopName}
                placeholder="Enter your shop name"
              />
              <InputField
                label="Shop's Phone Number"
                name="phone"
                register={register}
                error={errors?.phone}
                placeholder="Enter your phone number"
              />
              <InputField
                label="Shop's Email Address"
                name="email"
                register={register}
                type="email"
                error={errors?.email}
                placeholder="Enter your email"
              />
            </div>
            <div className="md:w-[48%] xs:w-full items-center justify-center p-3">
              <h2>
                Shop Logo <span className="text-red-500">*</span>
              </h2>
              <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#ddd] py-5">
                <label
                  htmlFor="fileInput"
                  className="relative cursor-pointer bg-gray-200 rounded-lg p-3"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <img src={imageUploadIcon} alt="" className="w-8" />
                    <span className="text-gray-600">
                      {selectedImageName ? (
                        selectedImageName
                      ) : (
                        <div className="text-center mt-[-8px]">
                          <p className="font-bold text-black">Click to board</p>
                          <span>or</span>
                          <p className="font-semibold mb-2">drag and drop</p>
                          <p className="text-[10px]">
                            SVG, PNG, JPG or GIF (MAX 800 x 800 px)
                          </p>
                        </div>
                      )}
                    </span>
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                    {...register("shopLogo")}
                    onChange={handleFileInputChange}
                  />
                </label>
                <p className="text-primary text-sm">
                  {errors.shopLogo?.message?.split("type")[0]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white py-[2px] px-4 rounded-md my-5 hover:bg-secondary"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
