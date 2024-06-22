import { useState } from "react";
import PostCard from "../../components/customers/PostCard";

export default function RelatedProducts({
  filteredBySubCategoryProducts,
  loadingProducts,
}) {
  const [showProducts, setShowProdcuts] = useState(12);
  return (
    <div className="w-full mt-16 mb-4">
      <div className="mx-auto text-center">
        <h2 className="text-3xl font-normal">Related Products</h2>
      </div>
      {loadingProducts ? (
        "Loading Related Products..."
      ) : (
        <div className="grid xl:grid-cols-6 md:grid-cols-4 xs:grid-cols-2 gap-x-2 gap-y-3 mt-8">
          {!filteredBySubCategoryProducts?.length ? (
            <span className="col-span-full text-center">Nothing to show</span>
          ) : (
            filteredBySubCategoryProducts
              ?.slice(0, showProducts)
              ?.map((filteredProduct) => (
                <PostCard
                  key={filteredProduct?._id}
                  product={filteredProduct}
                />
              ))
          )}
        </div>
      )}

      <div className="text-white mx-auto text-center mt-16">
        {filteredBySubCategoryProducts?.length > showProducts && (
          <button
            className=" w-44 bg-primary rounded-md p-1"
            onClick={() => setShowProdcuts((prev) => prev + 12)}
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
}
