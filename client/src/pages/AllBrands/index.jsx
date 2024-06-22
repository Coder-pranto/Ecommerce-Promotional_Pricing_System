import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDataQuery } from "../../utils/api";
import AppDownload from "../../components/customers/AppDownload";
import Loader from "../../components/Loader";
import BrandCard from "../../components/customers/BrandCard";

export default function AllBrands() {
  const [sliceValue, setSliceValue] = useState(10);

  const { data: brandsData, isLoading: loadingBrands } = useDataQuery(
    "brands",
    "/brand"
  );
  const brands = brandsData?.data?.brands;

  return (
    <section className="flex flex-col gap-8 my-4">
      <h1 className="text-xxl text-primary font-medium">All Brands</h1>
      {loadingBrands ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...brands]
            .reverse()
            ?.slice(0, sliceValue)
            .map((brand) => (
              <BrandCard
                key={brand?._id}
                brandName={brand?.brandName}
                brandType={brand?.brandType}
                image={`https://api.discounthutdeshit.tailormaster.xyz/${brand?.brand_logo}`}
              />
            ))}
        </div>
      )}
      {brands?.length > sliceValue && (
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
