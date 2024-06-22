import PostCard from "../../components/customers/PostCard";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDataQuery } from "../../utils/api";
import AppDownload from "../../components/customers/AppDownload";
import { useParams } from "react-router-dom";

export default function AllCategoryItems() {
  const [sliceValue, setSliceValue] = useState(10);
  let { id } = useParams();
  const categoryName = id;

  const { data: productsData, isLoading: loadingProducts } = useDataQuery(
    "products",
    "/discount"
  );
  const products = productsData?.data?.data;
  const categoryProducts = products?.filter(
    (product) => product?.category_id?.name === categoryName
  );
  //   console.log(categoryProducts);

  return (
    <section className="flex flex-col gap-8 my-4">
      <h1 className="text-xxl text-primary font-medium">
        All {categoryName} Products
      </h1>
      {loadingProducts ? (
        "Products Loading.."
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryProducts?.length ? (
            categoryProducts
              ?.slice(0, sliceValue)
              .map((product) => (
                <PostCard key={product?._id} product={product} />
              ))
          ) : (
            <img
              src="/no-product-found.jpg"
              alt="no product found"
              className="col-span-full h-[200px] lg:h-[400px] object-cover mx-auto mt-10"
            />
          )}
        </div>
      )}
      {categoryProducts?.length > sliceValue && (
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
