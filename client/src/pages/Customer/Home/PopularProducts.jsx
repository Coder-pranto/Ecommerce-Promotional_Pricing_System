import PostCard from "../../../components/customers/PostCard";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function PopularProducts({ products, isLoadingProducts }) {
  // console.log(products);
  return (
    <div className="grid lg:grid-cols-6 xs:grid-cols-2 md:grid-cols-2 gap-x-2 gap-y-3 mt-8">
      <div className="lg:mb-8 xs:mb-4 col-span-full">
        <h2 className="text-2xl font-bold">Popular Products</h2>
      </div>
      {isLoadingProducts
        ? "Loading Popular Products..."
        : products
            ?.slice(0, 6)
            ?.map((product) => (
              <PostCard key={product?._id} product={product} />
            ))}
      <Link to="/all-products" className="col-span-full mx-auto">
        <button
          type="button"
          className="mt-4 border border-primary text-primary py-2 pl-4 pr-2 rounded-md flex items-center"
        >
          <span>See All</span>
          <MdKeyboardArrowRight size={24} />
        </button>
      </Link>
    </div>
  );
}
