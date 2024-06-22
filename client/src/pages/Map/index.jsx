import AppDownload from "../../components/customers/AppDownload";
import Footer from "../../components/customers/Footer";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useDataQuery } from "../../utils/api";
import PostCard from "../../components/customers/PostCard";
import { useMemo, useState } from "react";

const Map = () => {
  const [showMore, setShowMore] = useState(18);
  const [rating, setRating] = useState(0);

  const { id } = useParams();

  const { data: shopsData, isLoading: shopLoading } = useDataQuery(
    "shops",
    "/seller/all"
  );
  const shop = shopsData?.data?.data.find((shop) => shop?._id === id);

  useMemo(() => setRating(shop?.averageRating), [shop]);

  const { data: productsData, isLoading: productLoading } = useDataQuery(
    "discount",
    "/discount"
  );

  const products = productsData?.data?.data?.filter(
    (product) => product?.seller_id?._id === id
  );

  return (
    <section>
      <div className="w-full mt-5">
        <span className="font-bold text-gray-500">Home &gt;</span>
        <span className="font-bold text-gray-500">Product &gt;</span>
        <span className="font-bold text-primary"> Shop location</span>
      </div>

      <div className="mx-auto flex flex-col justify-center gap-10">
        <div className="lg:mt-8 xs:mt-4 flex lg:flex-row items-center xs:flex-col">
          <div className="rounded-full xs:flex xs:flex-col">
            <h2 className="text-primary text-4xl text-center font-semibold mb-4">
              Shop Details
            </h2>
            <div className="xs:flex justify-center xs:mt-0 ">
              <img
                src={`https://api.discounthutdeshit.tailormaster.xyz/${shop?.shopLogo}`}
                className="w-[150px] h-[150px] object-cover border-2 border-primary rounded-full mt-8"
                alt={shop?.shopName}
              />
            </div>
          </div>
          <div className="flex flex-col lg:mt-20 xs:mt-10 lg:text-left xs:text-center">
            <h2 className="text-3xl mb-4 font-medium">{shop?.shopName}</h2>
            <h3 className="text-xl text-gray-500">{shop?.shopAddress}</h3>
            <h3 className="text-xl text-gray-500">{shop?.phone}</h3>
            <div className="mb-2 text-[16px]">
              <span className="ml-3 flex items-center cursor-pointer">
                {/* creating array with length of rating with filled star */}
                {Array.from({ length: rating }, (_, index) => (
                  <FaStar key={index} color="skyblue" />
                ))}

                {/* creating a 5 blank star for rating and slicing the array from rating to lenght 5 and replacing the sliced array with filled star */}
                {Array.from({ length: 5 }, (_, index) => (
                  <FaRegStar key={index} color="skyblue" />
                )).slice(rating, 5)}
              </span>
              |{" "}
              <span className="text-slate-400 ml-1 text-xs">
                {shop?.numReviews} Customers Review
              </span>
            </div>
          </div>
        </div>

        <div className="lg:mt-24 xs:mt-12">
          <div className="text-center mb-4">
            <h2 className="text-xl font-medium">More from this shop</h2>
          </div>
          {/* <div className="flex flex-wrap justify-evenly gap-4 lg:gap-x-2 lg:flex-row-6 xs:flex-col-2"> */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 items-center mt-5">
            {!products?.length ? (
              <span className="col-span-full text-center">
                Nothing to show here
              </span>
            ) : (
              [...products]
                ?.reverse()
                ?.slice(0, showMore)
                ?.map((product) => (
                  <PostCard key={product?._id} product={product} />
                ))
            )}
          </div>
          <div className="text-center mt-8">
            {products?.length > showMore && (
              <button
                className="text-sm lg:text-lg text-white py-2 px-4 w-auto text-nowrap rounded-lg bg-primary"
                onClick={() => setShowMore((prev) => prev + 18)}
              >
                Show More
              </button>
            )}
          </div>
        </div>

        {/* Google Map */}
        <div className="w-[100%]">
          <h2 className="text-primary text-xl font-medium my-5">
            Google Map Location
          </h2>
          {shop?.shopMap ? (
            <iframe
              className="border-2 border-primary w-full rounded-lg"
              src={shop?.shopMap}
              height="450"
              // allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <iframe
              className="border-2 border-primary w-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2010.6415007860048!2d90.37413384503452!3d23.74013769758749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ca65dc007b%3A0xe8cd92376fb48ed5!2sAgora%20Sat%20Masjid%20Road%20Branch!5e0!3m2!1sen!2sbd!4v1710067061797!5m2!1sen!2sbd"
              height="450"
              // allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
        </div>
      </div>
      {/* AppDownload section  */}

      <AppDownload />

      {/* Footer section */}

      <Footer />
    </section>
  );
};

export default Map;
