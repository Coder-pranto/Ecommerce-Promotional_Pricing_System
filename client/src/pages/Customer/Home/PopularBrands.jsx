import { useDataQuery } from "../../../utils/api";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import BrandCard from "../../../components/customers/BrandCard";

export default function PopularBrands() {
  const { data, isLoading } = useDataQuery("brands", "/brand");
  const brands = data?.data?.brands;

  //   console.log(brands);

  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3 mt-8">
      <div className="lg:mb-8 xs:mb-4 col-span-full">
        <h2 className="text-2xl font-bold">Popular Brands</h2>
      </div>
      {isLoading
        ? "Brands Loading..."
        : [...brands]
            ?.reverse()
            ?.slice(0, 12)
            ?.map((brand) => (
              <BrandCard
                key={brand?._id}
                brandName={brand?.brandName}
                brandType={brand?.brandType}
                image={`https://api.discounthutdeshit.tailormaster.xyz/${brand?.brand_logo}`}
              />
            ))}
      <Link to="/all-brands" className="col-span-full mx-auto">
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
