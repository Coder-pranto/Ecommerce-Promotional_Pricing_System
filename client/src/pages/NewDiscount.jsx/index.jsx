import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectOption from "../../components/Forms/SelectOptions";
import InputField from "../../components/Forms/InputField";
import ImageUploadField from "../../components/Forms/ImageUploadField";
import DateTimeField from "../../components/Forms/DateTimeField";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import { useCreateMutation, useDataQuery } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

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

export default function NewDiscount() {
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);

  const token = Cookies.get("token");
  const sellerId = Cookies.get("sellerID");
  const authToken = Cookies.get("auth");

  const navigate = useNavigate();

  // fetching data
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      brand: "",
      category: "",
      subCategory: "",
      sub_sub_category: "",
      sub_sub_sub_category: "",
    },
  });

  const postDiscountMutation = useCreateMutation(
    "discount",
    "/discount",
    token
  );

  const onSubmit = async (data) => {
    console.log(data);

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
      status: "approved", //pras add this line,after adding admin pane plz change remove this line
    };

    for (let key in payload) {
      formData.append(key, payload[key]);
    }

    const response = await postDiscountMutation.mutateAsync(formData);
    console.log(response);

    if (response.status === 201) {
      navigate("/seller-dashboard/manage-discount");
      toast.success(
        "New discount created successfull. Please wait for approval!"
      );
    } else {
      toast.success("Failed to create new discount!");
    }
  };

  return (
    <div>
      <Header headerTitle="Post a discount" />
      <div className="max-w-2xl mx-auto mt-6 px-6 py-4 bg-white rounded shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Product Name"
              name="productName"
              register={register}
              error={errors?.productName}
            />
            <InputField
              label="Price"
              name="price"
              register={register}
              error={errors?.price}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SelectOption
              label="Discount Type"
              name="discountType"
              options={discountTypes?.data?.data}
              register={register}
              error={errors.discountType}
            />
            <InputField
              label="Discount Rate"
              name="discount"
              register={register}
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
              onChange={(e) => setSelectedSubSubCategory(e.target.value)}
              register={register}
              error={errors.subCategory}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SelectOption
              label="sub_sub_sub_category"
              name="sub_sub_sub_category"
              options={subSubSubCategories}
              register={register}
              error={errors.subCategory}
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
              // label="Start Date & Time"
              label="Start Date"
              name="startDate"
              register={register}
              error={errors.startDate}
            />
            <DateTimeField
              // label="End Date & Time"
              label="End Date"
              name="endDate"
              register={register}
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
              Product Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description")}
              className="border p-2 w-full"
              rows="1"
              placeholder={`First line: Xiaomi Smartwatch 42mm (max 30 characters)\nSecond line: Product full description`}
            ></textarea>
            <p className="text-red-500">
              {errors.description?.message?.split("type")[0]}
            </p>
          </div>

          <button
            type="submit"
            className="btn bg-primary text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
