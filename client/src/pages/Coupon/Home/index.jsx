import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import * as yup from "yup";
import CouponCard from "../CouponCard";
import DynamicModal from "../../../components/Modal";
import InputField from "../../../components/Forms/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUploadField from "../../../components/Forms/ImageUploadField";
import DynamicTable from "../../../components/DynamicTable";
import { useDataQuery, useUpdateMutation } from "../../../utils/api";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";
import Cookies from "js-cookie";

export default function Coupon() {
  const [coupons, setCoupons] = useState([]);
  const [isOpenModalForAddProduct, setIsOpenModalForAddProduct] =
    useState(false);
  const [isOpenModalForQuantity, setIsOpenModalForQuantity] = useState(false);
  const [sellingProductQuantity, setSellingProductQuantity] = useState("");
  const [sellingProductCouponId, setSellingProductCouponId] = useState("");
  const [couponInfo, setCouponInfo] = useState({});
  const [isTakeCouponBySeller, setIsTakeCouponBySeller] = useState(false);

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjdAMi5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzA3ODgzNzQ5LCJleHAiOjE3MDc5NzAxNDl9.XTPBSXabCcx6V1aiPvT4G3SXiiWi2t2HIFwu8qGmCgE";
  // const sellerId = "65b0e4bb6b93ad4b0bee8734";

  const token = Cookies.get('token');
  const sellerId = Cookies.get('userId');

  const {
    data: response,
    isLoading,
    error,
  } = useDataQuery("coupon", "/coupon", token);
  useEffect(() => {
    setCoupons(response?.data?.data);
  }, [response]);

  const couponProductQuantityUpdateMutation = useUpdateMutation(
    "coupon",
    "/coupon/product-quantity",
    token
  );

  const addProductFormSchema = yup.object().shape({
    productName: yup.string().required("Product name is required!"),
    productQuantity: yup.number().required("Product quantity is required!"),
    image: yup.mixed().test("imageRequired", "Image is required", (value) => {
      return value && value.length > 0;
    }),
    description: yup.string().required("Product description is required!"),
  });

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
      height: isOpenModalForQuantity
        ? windowWidth > 1300
          ? "200px"
          : "32%"
        : "67%",
      margin: "auto",
      border: "1px solid #ec4f22",
      borderRadius: "4px",
      padding: "0px",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductFormSchema),
  });

  const handleAddProduct = (data) => {
    setCouponInfo(data);
    setIsOpenModalForAddProduct(true);
  };

  const closeModal = () => {
    setIsOpenModalForAddProduct(false);
    setIsOpenModalForQuantity(false);
  };

  const updateCouponMutation = useUpdateMutation("coupon", `/coupon`, token);

  const onSubmit = async (data) => {
    // console.log("product added", couponInfo._id, data);
    // console.log("coupon", couponInfo);

    const formData = new FormData();

    const payload = {
      sellerId: sellerId,
      productName: data.productName,
      description: data.description,
      productQuantity: data.productQuantity,
      image: data.image[0],
    };

    for (let key in payload) {
      formData.append(key, payload[key]);
    }
    const { data: response } = await updateCouponMutation.mutateAsync({
      id: couponInfo._id,
      updatedData: formData,
    });
    if (response.status === "Success") {
      setIsOpenModalForAddProduct(false);
      // setCoupons(response.data);
      setIsTakeCouponBySeller(true);
      toast.success("Product added for the coupon!");
    }
  };

  const colomns = [
    { key: "productName", label: "Product" },
    { key: "couponCode", label: "Coupon" },
    { key: "discountPercentage", label: "Discount" },
    { key: "productQuantity", label: "Quantity" },
    { key: "validityPeriod", label: "Duration" },
    { key: "status", label: "Status" },
  ];

  // console.log(coupons);
  // check is seller take coupon
  useEffect(() => {
    coupons?.map((item) => {
      const couponSeller = item.participatingSellers?.find(
        (seller) => seller.sellerId === sellerId // this seller id will come from cookie
      );
      // console.log(couponSeller);
      if (item.participatingSellers) {
        const isSellerTakeCoupon =
          couponSeller && Object.keys(couponSeller).length > 0;
        setIsTakeCouponBySeller(isSellerTakeCoupon);
      }
    });
  }, [coupons]);

  const changeSellingProductQuantity = (couponId) => {
    setIsOpenModalForQuantity(true);
    setSellingProductCouponId(couponId);
  };

  // useEffect(() => {
  //   if (sellingProductQuantity !== 0 && sellingProductCouponId) {
  //     changeSellingProductQuantity(sellingProductCouponId);
  //   }
  // }, [sellingProductQuantity]);

  const handleChange = async () => {
    closeModal();
    const updatePayload = {
      sellerId,
      quantity: sellingProductQuantity,
    };
    const { data: response } =
      await couponProductQuantityUpdateMutation.mutateAsync({
        id: sellingProductCouponId,
        updatedData: updatePayload,
      });

    if (response.status === "success") {
      toast.success("Congratulations for new sale!");
    }

    // console.log(response);

    setSellingProductQuantity("");
  };

  // console.log(sellingProductQuantity);

  return (
    <div>
      <Header headerTitle="Coupon" />
      <div className={`relative ${isLoading && "mt-64 xs:mr-16"}`}>
        {isLoading ? (
          <Loader />
        ) : (
          coupons && (
            <CouponCard coupons={coupons} handleAddProduct={handleAddProduct} />
          )
        )}
      </div>
      {error && (
        <div className="flex justify-center h-[500px] items-center">
          No coupon for you !
        </div>
      )}
      {/* {coupons && (
        
      )} */}
      <DynamicModal
        isOpen={isOpenModalForAddProduct || isOpenModalForQuantity}
        onRequestClose={closeModal}
        customStyle={modalCustomStyles}
        content={
          (isOpenModalForAddProduct && (
            <div>
              <div className="w-full h-5 bg-[#ec4f22]"></div>
              <div className="p-3">
                <h2 className="text-2xl font-bold pb-2 text-[#ec4f22]">
                  Add products for the coupon
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="p">
                  <div>
                    <InputField
                      label="Product Name"
                      name="productName"
                      register={register}
                      error={errors?.productName}
                    />
                    <InputField
                      label="Product Quantity"
                      name="productQuantity"
                      register={register}
                      error={errors?.productQuantity}
                    />
                    <ImageUploadField
                      label="Upload Image"
                      name="image"
                      register={register}
                      error={errors?.image}
                    />

                    <div className="mb-3">
                      <label className="block text-gray-700">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register("description")}
                        className="border p-2 w-full"
                        rows="1"
                      ></textarea>
                      <p className="text-red-500 text-sm">
                        {errors.description?.message?.split("type")[0]}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bg-[#ec4f22] px-3 py-[3px] rounded-md text-white hover:bg-orange-700 mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#ec4f22] px-3 py-[3px] rounded-md text-white hover:bg-orange-700"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          )) ||
          (isOpenModalForQuantity && (
            <div>
              <div className="w-full h-5 bg-[#ec4f22]"></div>
              <div className="p-2">
                <h2 className="text-2xl font-bold pb-2 text-center">
                  How Many Products did You Sale?
                </h2>
                <input
                  type="number"
                  name=""
                  id=""
                  className="border-[1px] border-[#ec4f22] w-[80%] mt-4 text-center p-2 text-lg block mx-auto outline-none"
                  onChange={(e) => setSellingProductQuantity(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#ec4f22] px-3 py-2 text-white rounded-lg mt-3 block mx-auto hover:bg-orange-700"
                  onClick={handleChange}
                >
                  Update
                </button>
              </div>
            </div>
          ))
        }
      />
      {isTakeCouponBySeller && (
        <DynamicTable
          columns={colomns}
          data={coupons}
          changeSellingProductQuantity={changeSellingProductQuantity}
        />
      )}
    </div>
  );
}
