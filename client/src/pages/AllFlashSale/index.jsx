import PostCard from "../../components/customers/PostCard";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDataQuery } from "../../utils/api";
import AppDownload from "../../components/customers/AppDownload";
import Loader from "../../components/Loader";

// const discountTypes = ["All", "20%", "30%", "40%", "50%", "60%", "70%", "80%"];

export default function AllFlashSale() {
  const { data: discountTypesData } = useDataQuery(
    "discount-types",
    "/discountType"
  );

  const allDiscountTypes = ["All"];

  const filteredDiscountTypes = discountTypesData?.data?.data.filter(
    (type) => !["percenatge", "fixed"].includes(type?.name)
  );
  const discountTypes = allDiscountTypes.concat(
    filteredDiscountTypes?.map((type) => type?.name)
  );

  // console.log(discountTypes);

  const [sliceValue, setSliceValue] = useState(10);
  const [activeDiscount, setActiveDiscount] = useState("All");

  const { data: productsData, isLoading: loadingProducts } = useDataQuery(
    "products",
    "/discount"
  );

  let products;

  if (activeDiscount === "All") {
    products = productsData?.data?.data?.filter((product) =>
      discountTypes?.includes(product?.discount_type?.name)
    );
  } else {
    products = productsData?.data?.data?.filter(
      (product) => product?.discount_type?.name === activeDiscount
    );
  }

  return (
    <section className="flex flex-col gap-8 my-4">
      <h1 className="text-xxl text-primary font-medium">Flash Sales</h1>
      <ul className="overflow-x-auto flex items-center justify-between gap-2 text-center text-nowrap text-white bg-secondary border border-white rounded-lg">
        {discountTypes?.map((type, index) => (
          <li
            key={index}
            className={`w-full cursor-pointer hover:bg-primary rounded-md transition-colors py-2 px-2 ${
              activeDiscount === type && "bg-primary border border-primary"
            }`}
            onClick={() => setActiveDiscount(type)}
          >
            {type}
          </li>
        ))}
      </ul>
      {loadingProducts ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {!products?.length ? (
            <img
              src="/no-product-found.jpg"
              alt="no product found"
              className="col-span-full h-[200px] lg:h-[400px] object-cover mx-auto mt-10"
            />
          ) : (
            products
              ?.slice(0, sliceValue)
              .map((product) => (
                <PostCard key={product?._id} product={product} />
              ))
          )}
        </div>
      )}
      {products?.length > sliceValue && (
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
