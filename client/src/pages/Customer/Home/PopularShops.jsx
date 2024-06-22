import ShopCard from "../../../components/customers/ShopCard";
import { useDataQuery } from "../../../utils/api";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function PopularShops() {
  const { data, isLoading } = useDataQuery("shops", "/seller/all");
  const shops = data?.data?.data;

  // console.log(shops);

  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3 mt-8">
      <div className="lg:mb-8 xs:mb-4 col-span-full">
        <h2 className="text-2xl font-bold">Popular shops</h2>
      </div>
      {isLoading
        ? "Shops Loading..."
        : [...shops]
            ?.reverse()
            ?.slice(0, 12)
            ?.map((shop) => (
              <ShopCard
                key={shop?._id}
                shopId={shop?._id}
                shopName={shop?.shopName}
                image={`https://api.discounthutdeshit.tailormaster.xyz/${shop?.shopLogo}`}
              />
            ))}
      <Link to="/all-shops" className="col-span-full mx-auto">
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
