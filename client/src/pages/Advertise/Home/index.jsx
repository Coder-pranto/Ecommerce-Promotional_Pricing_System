import { useEffect, useState } from "react";
import * as yup from "yup";
import Header from "../../../components/Header";
import DynamicModal from "../../../components/Modal";
import PackageCard from "../PackageCard";
import ImageUploadField from "../../../components/Forms/ImageUploadField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDataQuery, useUpdateMutation } from "../../../utils/api";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";
import Cookies from "js-cookie";

export default function Advertise() {
  const [isPurchaseModalOpen, setIssPurchaseModalOpen] = useState(false);
  const [singlePackage, setSinglePackage] = useState({});
  const [adPackages, setAdPackages] = useState([]);
  const [purchasedAd, setPurchasedAd] = useState({});

  const adContentSchema = yup.object().shape({
    standartSideImage: yup
      .mixed()
      .test("imageRequired", "Image is required", (value) => {
        return value && value.length > 0;
      }),
    proSideImage: yup
      .mixed()
      .test("imageRequired", "Image is required", (value) => {
        return value && value.length > 0;
      }),
    proTopImage: yup
      .mixed()
      .test("imageRequired", "Image is required", (value) => {
        return value && value.length > 0;
      }),
    premiumSideImage: yup
      .mixed()
      .test("imageRequired", "Image is required", (value) => {
        return value && value.length > 0;
      }),
    premiumTopImage: yup
      .mixed()
      .test("imageRequired", "Image is required", (value) => {
        return value && value.length > 0;
      }),
    premiumBottomImage: yup
      .mixed()
      .test("imageRequired", "Image is required", (value) => {
        return value && value.length > 0;
      }),
  });

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGRlc2hpdC1iZC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDc4ODE5OTUsImV4cCI6MTcwNzk2ODM5NX0.EJOYtS8yk8FO2jAGf_BORJZIU0V9EjteacLVtglPh1A";
  // const sellerId = "65b0d41da177f4c32606b04a";

  const token = Cookies.get('token');
  const sellerId = Cookies.get('userId');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adContentSchema),
  });

  // fetch all package data...............
  const {
    data: response,
    isLoading,
    error,
  } = useDataQuery("advertise", "/advertise", token);
  useEffect(() => {
    if (response?.status === 200) {
      setAdPackages(response.data);
    }
  }, [response]);
  // console.log(adPackages);

  // ad purchase
  const adPurchaseMutation = useUpdateMutation(
    "adPurchase",
    "advertise/purchase",
    token
  );

  const handlePurchase = (packageInfo) => {
    setIssPurchaseModalOpen(true);
    setSinglePackage(packageInfo);
  };

  const windowWidth = window.innerWidth;

  const modalCustomStyles = {
    content: {
      width:
        windowWidth <= 500
          ? "80%"
          : windowWidth > 500 && windowWidth <= 1000
          ? "60%"
          : windowWidth > 1000 && windowWidth <= 1300
          ? "60%"
          : "35%",
      height:
        singlePackage.name === "Standard"
          ? "220px"
          : singlePackage.name === "Pro"
          ? "300px"
          : "380px",
      margin: "auto",
      border: "1px solid #ec4f22",
      borderRadius: "4px",
      padding: "0px",
    },
  };

  const closeModal = () => {
    setIssPurchaseModalOpen(false);
  };

  const handleCompletePurchase = async () => {
    // const data = watch();
    // console.log("ad purchase complete for", singlePackage, data);
    const adPurchasePayload = {
      id: singlePackage?._id,
      updatedData: {
        sellerId,
      },
    };
    
    const { data: response, isLoading } = await adPurchaseMutation.mutateAsync(
      adPurchasePayload
    );

    if (response.status === "success") {
      setPurchasedAd(response.data);
      closeModal();
      toast.success("Thanks for purchase the ad, please wait for approved.");
    } else {
      closeModal();
      toast.error("Failed to purchase ad! Please try again");
    }
  };

  return (
    <div>
      <Header headerTitle="Advertisement" />
      <div className={`relative ${isLoading && "mt-64 xs:mr-16"}`}>
        {isLoading && <Loader />}
        <div className="md:mt-32 xs:mt-10 flex md:flex-row xs:flex-col md:justify-evenly xs:gap-4 md:gap-0">
          {adPackages.map((item) => (
            <PackageCard
              key={item._id}
              package={item}
              handlePurchase={handlePurchase}
            />
          ))}
        </div>
        {error && (
          <div className="flex justify-center h-[300px] items-center">
            <p>No package founded!</p>
          </div>
        )}
      </div>
      <DynamicModal
        isOpen={isPurchaseModalOpen}
        onRequestClose={closeModal}
        customStyle={modalCustomStyles}
        content={
          <div>
            <div className="h-[20px] bg-[#ec4f22]"></div>
            <div className="p-3">
              <h2 className="text-2xl font-bold pb-2 text-[#ec4f22]">
                Advertisement Contents
              </h2>
              <form onSubmit={handleSubmit()}>
                {(singlePackage?.name === "Standard" && (
                  <ImageUploadField
                    label="Upload image for side"
                    name="standartSideImage"
                    register={register}
                    error={errors.standartSideImage}
                  />
                )) ||
                  (singlePackage?.name === "Pro" && (
                    <div>
                      <ImageUploadField
                        label="Upload image for side"
                        name="proSideImage"
                        register={register}
                        error={errors.proSideImage}
                      />
                      <ImageUploadField
                        label="Upload image for top"
                        name="proTopImage"
                        register={register}
                        error={errors.proTopImage}
                      />
                    </div>
                  )) ||
                  (singlePackage?.name === "Premium" && (
                    <div>
                      <ImageUploadField
                        label="Upload image for side"
                        name="premiumSideImage"
                        register={register}
                        error={errors.premiumSideImage}
                      />
                      <ImageUploadField
                        label="Upload image for top"
                        name="premiumTopImage"
                        register={register}
                        error={errors.premiumTopImage}
                      />
                      <ImageUploadField
                        label="Upload image for bottom"
                        name="premiumBottomImage"
                        register={register}
                        error={errors.premiumBottomImage}
                      />
                    </div>
                  ))}
                <button
                  type="submit"
                  onClick={handleCompletePurchase}
                  className="bg-[#ec4f22] text-white p-2 rounded-md hover:bg-orange-700 w-full"
                >
                  Go Pay
                </button>
              </form>
            </div>
          </div>
        }
      />
    </div>
  );
}
