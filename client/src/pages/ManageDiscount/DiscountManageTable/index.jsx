/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import DynamicTable from "../../../components/DynamicTable";
import { useCallback, useEffect, useState } from "react";
import DynamicModal from "../../../components/Modal";
import Loader from "../../../components/Loader";
import {
  useDataQuery,
  useDeleteMutation,
  useUpdateMutation,
} from "../../../utils/api";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectOption from "../../../components/Forms/SelectOptions";
import InputField from "../../../components/Forms/InputField";
import ImageUploadField from "../../../components/Forms/ImageUploadField";
import DateTimeField from "../../../components/Forms/DateTimeField";

export default function DiscountManageTable({
  filterItem,
  searchText,
  discounts,
  isLoading,
  error,
}) {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isEditModalOpen, setEditModalIsOpen] = useState(false);
  const [showmoreModalData, setShowmoreModalData] = useState({});
  const [sellingProductQuantityModal, setSellingProductQuantityModal] =
    useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const token = Cookies.get("token");

  const discountDeleteMutation = useDeleteMutation(
    "discounts",
    "/discount",
    token
  );

  const colomns = [
    { key: "product", label: "Product" },
    { key: "price", label: "Price" },
    { key: "discount", label: "Discount" },
    { key: "end_datetime", label: "End Date & Time" },
    { key: "status", label: "Status" },
  ];

  // filter discount by status -> filterItem
  let filteredDiscountData =
    filterItem === "all"
      ? discounts
      : discounts?.filter((item) => item?.status === filterItem);

  // search discount
  const searchDiscountData = filteredDiscountData?.filter(
    (item) =>
      item.product_name.toLocaleLowerCase().includes(searchText) ||
      item.discount.toString().includes(searchText)
  );

  // assign discount data to filteredDiscountData array based on search text
  if (searchDiscountData?.length !== 0) {
    filteredDiscountData = searchDiscountData;
  } else {
    filteredDiscountData = [];
  }

  // throw error when search result not match
  if (searchText && filteredDiscountData?.length === 0)
    toast.error("No result match!");

  // show more about discount event handler
  const showMore = (item) => {
    setSellingProductQuantityModal(false);
    openModal();
    setShowmoreModalData(item);
  };

  // delete discount event handler
  const deleteDiscount = async (...ids) => {
    const deleteableIds = [...ids];
    if (confirm("Are you sure, You want to delete the discount?")) {
      // console.log("delete the discount", deleteableIds);
      const response = await discountDeleteMutation.mutateAsync(deleteableIds);
      if (response?.length > 0) {
        toast.success("Delete successfull!");
      } else {
        toast.error("Delete failed!");
      }
    } else {
      toast("You didn't delete the discount.");
    }
  };

  // edit Discount event handler

  const [editData, setEditData] = useState({});
  // console.log(editData._id);

  const updateDiscountMutation = useUpdateMutation(
    "discounts",
    "/discount",
    token
  );

  const schema = yup.object().shape({
    productName: yup.string().required("Product Name is required"),
    price: yup.number().required("Price is required"),
    discountType: yup.string().required("Discount Type is required"),
    discount: yup.number().required("Discount is required"),
    brand: yup.string().required("Brand is required"),
    category: yup.string().required("Category is required"),
    subCategory: yup.string().required("Subcategory is required"),
    sub_sub_category: yup.string(),
    sub_sub_sub_category: yup.string(),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date().required("End Date is required"),
    sku: yup.string().required("SKU is required"),
    image: yup.mixed().test("imageRequired", "Image is required", (value) => {
      return value && value.length > 0;
    }),
  });

  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);

  const sellerId = Cookies.get("sellerID");
  const authToken = Cookies.get("auth");

  const navigate = useNavigate();

  // Data fetching
  const { data: discountTypes } = useDataQuery(
    "discount-types",
    "/discountType"
  );
  const { data: brandData } = useDataQuery("brands", "/brand");
  const { data: categoryData } = useDataQuery(
    "categories",
    "/category/all",
    authToken
  );
  const { data: subCategoryData } = useDataQuery(
    "subCategories",
    "/category/sub/all",
    authToken
  );
  const { data: subSubCategoryData } = useDataQuery(
    "subSubCategories",
    "/category/subsub/all",
    authToken
  );
  const { data: subSubSubCategoryData } = useDataQuery(
    "subSubSubCategories",
    "/category/subsubsub/all",
    authToken
  );

  const showingSubcategories = () => {
    const subcategories = subCategoryData?.data?.data?.filter(
      (item) => item.category?._id === selectedCategory
    );
    // console.log(subcategories);
    setSubCategories(subcategories);
  };

  const showingSubSubCategories = () => {
    const subSubCategories = subSubCategoryData?.data?.data?.filter(
      (item) => item.subcategory?._id === selectedSubCategory
    );
    // console.log({ subSubCategories });
    setSubSubCategories(subSubCategories);
  };

  const showingSubSubSubCategories = () => {
    const subSubSubCategories = subSubSubCategoryData?.data?.data?.filter(
      (item) => item.subsubcategory?._id === selectedSubSubCategory
    );
    // console.log({ subSubCategories });
    setSubSubSubCategories(subSubSubCategories);
  };

  useEffect(() => {
    showingSubcategories();
    showingSubSubCategories();
    showingSubSubSubCategories();
  }, [selectedCategory, selectedSubCategory, selectedSubSubCategory]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const editDiscount = async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/discount/${id}`
    );
    // console.log("data:", response.data.data);
    setEditData(response.data.data);
    openEditModal();
  };

  const onSubmit = async (data) => {
    // console.log(data, "clicked");
    const formData = new FormData();
    const payload = {
      image: data.image[0],
      brand_id: data.brand,
      category_id: data.category,
      subcategory_id: data.subCategory,
      sub_sub_category_id: data.sub_sub_category,
      sub_sub_sub_category_id: data.sub_sub_sub_category,
      description: data.description,
      discount: parseInt(data.discount),
      discount_type: data.discountType,
      start_datetime: data.startDate,
      end_datetime: data.endDate,
      price: parseInt(data.price),
      product_name: data.productName,
      seller_id: sellerId,
      sku: data.sku,
      // status: "approved", //pras add this line,after adding admin pane plz change remove this line
    };

    for (let key in payload) {
      formData.append(key, payload[key]);
    }

    const response = await updateDiscountMutation.mutateAsync({
      id: editData._id,
      updatedData: formData,
    });
    // console.log(response);

    if (response.status === 200) {
      closeEditModal();
      reset();
      navigate("/seller-dashboard/manage-discount");
      toast.success("Product update successfull!");
    } else {
      toast.error("Failed to update discount!");
    }
  };

  // const handleEdit

  const windowWidth = window.innerWidth;

  // modal style
  const modalCustomStyles = {
    content: {
      width:
        windowWidth <= 500
          ? "80%"
          : windowWidth > 500 && windowWidth <= 1000
            ? "60%"
            : windowWidth > 1000 && windowWidth <= 1300
              ? "50%"
              : "35%",
      height: sellingProductQuantityModal
        ? "32%"
        : windowWidth > 1300
          ? "320px"
          : "50%",
      margin: "auto",
      border: "1px solid #ec4f22",
      borderRadius: "4px",
      padding: "0px",
    },
  };
  const modalCustomStylesEdit = {
    content: {
      width:
        windowWidth <= 500
          ? "90%"
          : windowWidth > 500 && windowWidth <= 1000
            ? "70%"
            : windowWidth > 1000 && windowWidth <= 1300
              ? "60%"
              : "40%",
      height: sellingProductQuantityModal
        ? "32%"
        : windowWidth > 1300
          ? "555px"
          : "50%",
      margin: "auto",
      border: "1px solid #ec4f22",
      borderRadius: "4px",
      padding: "0px",
    },
  };

  const discountTimeStamp = {
    startDate: new Date(
      showmoreModalData?.start_datetime?.split("T")[0]
    ).toLocaleDateString("en-US"),
    // startTime: new Date(
    //   "1970-01-01T" + showmoreModalData?.start_datetime?.split("T")[1]
    // ).toLocaleTimeString("en-US", {
    //   minute: "numeric",
    //   hour: "numeric",
    // }),
    endDate: new Date(
      showmoreModalData?.end_datetime?.split("T")[0]
    ).toLocaleDateString("en-US"),
    // endTime: new Date(
    //   "1970-01-01T" + showmoreModalData?.end_datetime?.split("T")[1]
    // ).toLocaleTimeString("en-US", {
    //   minute: "numeric",
    //   hour: "numeric",
    // }),
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openEditModal = () => {
    setEditModalIsOpen(true);
    setBrands(brandData?.data?.brands);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    reset();
    setEditData({});
  };

  const handleDiscountBulkDelete = () => {
    deleteDiscount(...selectedIds);
  };

  // console.log(showmoreModalData);
  // console.log(sellingProductQuantityModal);

  return (
    <div>
      <div className={`relative ${isLoading && "mt-52 xs:mr-16"}`}>
        {isLoading ? (
          <Loader />
        ) : (
          !error && (
            <DynamicTable
              columns={colomns}
              data={filteredDiscountData}
              showMore={showMore}
              deleteDiscount={deleteDiscount}
              editDiscount={editDiscount}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          )
        )}
      </div>
      {error && (
        <div className="flex justify-center h-[300px] items-center">
          You have no discount. Please post one!
        </div>
      )}

      <DynamicModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        customStyle={modalCustomStyles}
        content={
          Object.keys(showmoreModalData).length > 0 && (
            <div>
              <div className="w-full h-5 bg-primary"></div>
              <div>
                <div className="p-2">
                  <h2 className="text-2xl font-bold pb-2 text-primary">
                    {showmoreModalData.status === "approved"
                      ? "Approved Discount"
                      : showmoreModalData.status === "pending"
                        ? "Pending Discount"
                        : "Deleted Discount"}{" "}
                    - {showmoreModalData.product_name}
                  </h2>
                  <div className="font-semibold">
                    <h2>Product name: {showmoreModalData.product_name}</h2>
                    <h2>Brand: {showmoreModalData.brand_id?.brandName}</h2>
                    <h2>Category: {showmoreModalData.category_id?.name}</h2>
                    <h2>
                      Sub category: {showmoreModalData.subcategory_id?.name}
                    </h2>
                    <h2>Product price: {showmoreModalData.price} tk</h2>
                    <h2>
                      Discount type: {showmoreModalData.discount_type?.name}
                    </h2>
                    <h2>
                      Discount: {showmoreModalData.discount}{" "}
                      {showmoreModalData.discount_type === "percentage"
                        ? "%"
                        : "tk"}
                    </h2>
                    <h2>
                      {/* Started at: {discountTimeStamp.startDate}
                      {" - "}
                      {discountTimeStamp.startTime} */}
                      Started at: {discountTimeStamp.startDate}
                    </h2>
                    <h2>
                      {/* End at: {discountTimeStamp.endDate} {" - "}
                      {discountTimeStamp.endTime} */}
                      End at: {discountTimeStamp.endDate}
                    </h2>
                    <h2>Description: {showmoreModalData.description}</h2>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      />

      {isEditModalOpen && (
        <DynamicModal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          customStyle={modalCustomStylesEdit}
          content={
            <>
              <div className="max-w-2xl mx-auto mt-6 px-6 py-4 bg-white rounded shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Product Name"
                      name="productName"
                      register={register}
                      defaultValue={editData?.product_name}
                      error={errors?.productName}
                    />
                    <InputField
                      label="Price"
                      name="price"
                      register={register}
                      defaultValue={editData?.price}
                      error={errors?.price}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <SelectOption
                      label="Discount Type"
                      name="discountType"
                      defaultValue={editData?.discount_type?.name}
                      options={discountTypes?.data?.data}
                      register={register}
                      error={errors.discountType}
                    />
                    <InputField
                      label="Discount Rate"
                      name="discount"
                      register={register}
                      defaultValue={editData?.discount}
                      error={errors?.discount}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <SelectOption
                      label="Brand"
                      name="brand"
                      // options={brands}
                      options={brandData?.data?.brands}
                      register={register}
                      error={errors.brand}
                    />

                    <SelectOption
                      label="Category"
                      name="category"
                      options={categoryData?.data?.data}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      register={register}
                      error={errors.category}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <SelectOption
                      label="Subcategory"
                      name="subCategory"
                      options={subCategories}
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                      register={register}
                      error={errors.subCategory}
                    />
                    <SelectOption
                      label="sub_sub_category"
                      name="sub_sub_category"
                      options={subSubCategories}
                      onChange={(e) =>
                        setSelectedSubSubCategory(e.target.value)
                      }
                      register={register}
                      error={errors.sub_sub_category}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <SelectOption
                      label="sub_sub_sub_category"
                      name="sub_sub_sub_category"
                      options={subSubSubCategories}
                      register={register}
                      error={errors.sub_sub_sub_category}
                    />

                    <ImageUploadField
                      label="Upload Image"
                      name="image"
                      register={register}
                      error={errors.image}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <DateTimeField
                      label="Start Date & Time"
                      name="startDate"
                      register={register}
                      defaultValue={editData?.start_datetime}
                      error={errors.startDate}
                    />
                    <DateTimeField
                      label="End Date & Time"
                      name="endDate"
                      register={register}
                      defaultValue={editData?.end_datetime}
                      error={errors.endDate}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="SKU"
                      name="sku"
                      placeholder="POL-SH-SL-38-BLU"
                      register={register}
                      error={errors?.sku}
                    />
                    <InputField
                      label="Bar Code"
                      name="barCode"
                      placeholder="123456-12345-1"
                      register={register}
                      error={errors?.barCode}
                      required={false}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-gray-700">
                      Product Description{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register("description")}
                      className="border p-2 w-full"
                      rows="1"
                      defaultValue={editData?.description}
                      placeholder={`First line: Xiaomi Smartwatch 42mm (max 30 characters)\nSecond line: Product full description`}
                    ></textarea>
                    <p className="text-red-500">
                      {errors.description?.message?.split("type")[0]}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="btn bg-primary text-white py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn bg-red-600 text-white py-2 px-4 rounded"
                      onClick={() => closeEditModal()}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </>
          }
        />
      )}

      {selectedIds.length > 0 && (
        <div className="w-full flex justify-end py-4">
          <button
            type="button"
            className="px-3 py-[3px] bg-[#ec4f22] text-white mr-6 hover:bg-orange-700"
            onClick={handleDiscountBulkDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
