import AppDownload from "../../components/customers/AppDownload";
import { useLocation } from "react-router-dom";
import { useDataQuery } from "../../utils/api";
import PostCard from "../../components/customers/PostCard";
import { useState } from "react";

export default function SearchResult() {
  const { searchQuery } = useLocation().state;
  const [showProduct, setShowProduct] = useState(12);
  // console.log(searchQuery);

  const { data, isLoading } = useDataQuery(
    ["search-global", searchQuery],
    `/discount/search/global/q?searchQuery=${searchQuery}`
  );
  const searchedProducts = data?.data?.products;

  return (
    <>
      <div className="mx-4 lg:mx-20">
        <div className="w-full mt-5 mb-3 p-0 mx-0 xs:mx-2">
          <span className="font-bold text-slate-400">Home &gt;</span>
          <span className="font-bold text-slate-400">Search &gt;</span>
          <span className="font-bold text-primary"> Search Result</span>
        </div>

        <h3 className="text-xxl font-medium my-5 text-primary">
          search result for:{" "}
          <span className="text-secondary font-semibold">{searchQuery}</span>
        </h3>

        {isLoading ? (
          "Loading..."
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 justify-between">
            {!searchQuery ? (
              <img
                src="/no-product-found.jpg"
                alt="no product found"
                className="col-span-full h-[200px] lg:h-[400px] object-cover mx-auto mt-10"
              />
            ) : (
              searchedProducts
                ?.slice(0, showProduct)
                ?.map((product) => (
                  <PostCard key={product?._id} product={product} />
                ))
            )}
          </div>
        )}
        <div className="text-center mt-8">
          {searchQuery && searchedProducts?.length > showProduct && (
            <button
              onClick={() => setShowProduct((prev) => prev + 24)}
              className="text-primary hover:text-white rounded-lg p-2 w-1/6 border-2 bg-white border-primary hover:bg-primary transition-colors"
            >
              See More
            </button>
          )}
        </div>
      </div>

      <AppDownload />
    </>
  );
}
