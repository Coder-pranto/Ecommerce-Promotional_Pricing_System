import PostCard from "../../components/customers/PostCard";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDataQuery } from "../../utils/api";
import AppDownload from "../../components/customers/AppDownload";
import Loader from "../../components/Loader";

export default function AllProducts() {
  const [sliceValue, setSliceValue] = useState(10);

  const { data: productsData, isLoading: loadingProducts } = useDataQuery(
    "products",
    "/discount"
  );
  const products = productsData?.data?.data;

  const { data: discountTypesData } = useDataQuery(
    "discount-types",
    "/discountType"
  );

  const discountTypes = discountTypesData?.data?.data.filter(
    (type) => !["percenatge", "fixed"].includes(type?.name)
  );

  const allProducts = products?.filter(
    (product) =>
      !discountTypes
        ?.map((type) => type?.name)
        .includes(product?.discount_type?.name)
  );

  return (
    <section className="flex flex-col gap-8 my-4">
      <h1 className="text-xxl text-primary font-medium">All Products</h1>
      {loadingProducts ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allProducts?.slice(0, sliceValue).map((product) => (
            <PostCard key={product?._id} product={product} />
          ))}
        </div>
      )}
      {allProducts?.length > sliceValue && (
        <button
          type="button"
          className="w-1/2 sm:w-1/3 lg:w-1/6 mx-auto mt-4 flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-md"
          onClick={() => setSliceValue((prev) => prev + 20)}
        >
          <span>View More</span>
          <MdKeyboardArrowRight size={24} />
        </button>
      )}

      {/* Advertise */}

      <AppDownload />
    </section>
  );
}
