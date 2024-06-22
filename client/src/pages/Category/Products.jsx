/* eslint-disable react/prop-types */

import { useState } from "react";
import PostCard from "../../components/customers/PostCard";
import { useDataQuery } from "../../utils/api";
import Cookies from "js-cookie";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Products({ selectedSubCategory }) {
  const [sliceValue, setSliceValue] = useState(20);
  const { data, isLoading } = useDataQuery(
    "products",
    "/discount",
    Cookies.get("token")
  );

  const products = data?.data?.data;
  // console.log({ selectedSubCategory }, { products });
  const productsBySubCategory = products?.filter(
    (product) =>
      product?.sub_sub_sub_category_id?.name.trim() ===
        selectedSubCategory?.name?.trim() ||
      product?.sub_sub_category_id?.name.trim() ===
        selectedSubCategory?.name?.trim()
  );

  return (
    <div className="grid xl:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-x-3 gap-y-3 mt-8">
      {isLoading ? (
        "Loading Products..."
      ) : productsBySubCategory?.length ? (
        productsBySubCategory
          ?.slice(0, sliceValue)
          ?.map((product) => <PostCard key={product?._id} product={product} />)
      ) : (
        <img
          src="/no-product-found.jpg"
          alt="no product found"
          className="col-span-full h-[200px] lg:h-[400px] object-cover mx-auto mt-10"
        />
      )}
      {productsBySubCategory?.length > sliceValue && (
        <button
          type="button"
          className="col-span-full w-1/2 sm:w-1/3 lg:w-1/6 mx-auto mt-8 flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-md"
          onClick={() => setSliceValue((prev) => prev + 20)}
        >
          <span>View More</span>
          <MdKeyboardArrowRight size={24} />
        </button>
      )}
    </div>
  );
}

/*  <div onClick={() => navigate('/product')} className={`grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-x-3 gap-y-3 mt-${tab} lg:mx-4 md:mx-16 xs:mx-[7px]`}>


   <div onClick={() =>  navigate('/product')} className={`grid lg:grid-cols-${quantity} xs:grid-cols-2 gap-x-3 gap-y-3 mt-${tab} lg:mx-4 md:mx-16 xs:mx-[7px]`}>
*/
