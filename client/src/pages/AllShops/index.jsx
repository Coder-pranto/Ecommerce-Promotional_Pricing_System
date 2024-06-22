import AppDownload from "../../components/customers/AppDownload";
import { useState } from "react";
import ShopCard from "../../components/customers/ShopCard";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDataQuery } from "../../utils/api";
import Loader from "../../components/Loader";

export default function AllShops() {
  const [sliceValue, setSliceValue] = useState(18);

  const { data, isLoading } = useDataQuery("shops", "/seller/all");
  const shops = data?.data?.data;

  return (
    <section className="flex flex-col gap-8 my-4">
      <h1 className="text-xxl text-primary font-medium">All Shops</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...shops]
            ?.reverse()
            ?.slice(0, sliceValue)
            .map((shop) => (
              <ShopCard
                key={shop?._id}
                shopId={shop?._id}
                shopName={shop?.shopName}
                image={`https://api.discounthutdeshit.tailormaster.xyz/${shop?.shopLogo}`}
              />
            ))}
        </div>
      )}
      {shops?.length > sliceValue && (
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
