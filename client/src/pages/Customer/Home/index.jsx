// eslint-disable-next-line no-unused-vars
import { AiOutlineSafety } from "react-icons/ai";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import Carousel from "../../../components/customers/Carousel";
import BannerCard from "../../../components/customers/BannerCard";
import CouponCard from "../../../components/customers/CouponCard";
import AppDownload from "../../../components/customers/AppDownload";
import { Link } from "react-router-dom";
import { useDataQuery } from "../../../utils/api";
import Cookies from "js-cookie";
import PopularProducts from "./PopularProducts";
import PopularShops from "./PopularShops";
import CategorySection from "./CategorySection";
import FlashSale from "./FlashSale";
import PopularBrands from "./PopularBrands";

export default function Home() {
  const token = Cookies.get("token");

  // fetching categories
  const { data, isLoading } = useDataQuery("category", "/category/all", token);
  const categories = data?.data?.data;

  const { data: subCategoryData } = useDataQuery(
    "subCategories",
    "/category/sub/all"
  );
  const subCategories = subCategoryData?.data?.data;

  const { data: sub2CategoryData } = useDataQuery(
    "subSubCategories",
    "/category/subsub/all"
  );
  const sub2Categories = sub2CategoryData?.data?.data;

  // fetching products
  const { data: productsData, isLoading: isLoadingProducts } = useDataQuery(
    "products",
    "/discount",
    token
  );
  const products = productsData?.data?.data;
  // console.log(products);

  const { data: discountTypesData } = useDataQuery(
    "discount-types",
    "/discountType"
  );

  const discountTypes = discountTypesData?.data?.data.filter(
    (type) => !["percenatge", "fixed"].includes(type?.name)
  );

  const popularProducts = products?.filter(
    (product) =>
      !discountTypes
        ?.map((type) => type?.name)
        .includes(product?.discount_type?.name)
  );

  const flashProducts = products?.filter((product) =>
    discountTypes
      ?.map((type) => type?.name)
      .includes(product?.discount_type?.name)
  );

  return (
    <>
      {/* <Navbar /> */}
      <div className="main w-full">
        {/* category */}
        <div className="flex flex-col lg:flex-row lg:py-8 xs:py-4 gap-1">
          <div className="hidden lg:block lg:w-1/6 md:w-1/3 border-slate-300 border-2 rounded-md relative h-[395px]">
            <CategorySection
              categories={categories}
              subCategories={subCategories}
              sub2Categories={sub2Categories}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:w-5/6 border-2 border-slate-300 rounded-lg">
            <Carousel />
          </div>
        </div>

        {/* subsection-one */}
        <div className="flex lg:flex-row xs:flex-col sm:flex-col justify-center mt-4 mb-4 rounded-md">
          <div className="border-2 border-slate-300 lg:p-8 xs:p-4 flex items-center grow lg:rounded-l-md xs:rounded-l-0 border-l-2 xs:w-full sm:w-auto md:w-auto">
            <AiOutlineSafety size="60px" className="inline text-primary" />
            <div className="ml-4">
              <p className="text-md xs:text-lg md:text-xl">Safe & Reliable</p>
              <p className="font-thin md:text-sm">
                Safe and secured post all over the country
              </p>
            </div>
          </div>
          <div className="border-2 border-slate-300  lg:p-8 xs:p-4 flex items-center grow xs:w-full sm:w-auto md:w-auto">
            <HiOutlineArchiveBox size="60px" className="inline text-primary" />
            <div className="ml-4">
              <p className="text-md xs:text-lg md:text-xl">
                100% Authentic Products
              </p>
              <p className="font-thin md:text-sm">
                Original 100% genuine products
              </p>
            </div>
          </div>
          <div className="border-2 border-slate-300 lg:p-8 xs:p-4 flex items-center grow lg:rounded-l-md xs:rounded-l-0 border-l-2 xs:w-full sm:w-auto md:w-auto">
            <AiOutlineSafety size="60px" className="inline text-primary" />
            <div className="ml-4">
              <p className="text-md xs:text-lg md:text-xl">Safe & Reliable</p>
              <p className="font-thin md:text-sm">
                Safe and secured post all over the country
              </p>
            </div>
          </div>
        </div>

        {/* subsection-two */}
        <div className="grid lg:grid-cols-8 md:grid-cols-4 xs:grid-cols-2 lg:gap-4 xs:gap-2 md:gap-2 lg:mt-8 xs:mt-4">
          <div className="lg:mb-8 xs:mb-4 col-span-full">
            <h2 className="text-2xl font-bold">Featured Categories</h2>
          </div>
          {isLoading
            ? "Loading Feature Categories..."
            : categories?.slice(0, 8).map((category) => (
                <Link
                  key={category?._id}
                  to={`/all-category-items/${category?.name}`}
                  className="border-2 rounded-lg border-slate-300 flex flex-col text-center"
                >
                  <div className="flex flex-col gap-2">
                    <div className="w-full h-[130px] overflow-hidden">
                      <img
                        src={`https://api.discounthutdeshit.tailormaster.xyz/${category?.image}`}
                        alt={category?.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </div>
                    <span className="w-full text-wrap font-semibold text-sm">
                      {category?.name}
                    </span>
                  </div>
                  <br />
                  <span className="text-primary text-sm mb-2">
                    {
                      products?.filter(
                        (product) =>
                          product.category_id?.name === category?.name
                      ).length
                    }{" "}
                    items
                  </span>
                </Link>
              ))}
        </div>

        {/* Latest Deals */}

        <div className="grid grid-cols-2 md:grid-cols-5 lg:gap-8 xs:gap-4 md:gap-4 mt-8">
          <div className="lg:mb-8 xs:mb-4 col-span-full">
            <h2 className="text-2xl font-bold">Latest Deals</h2>
          </div>
          <BannerCard
            image={"bata.jpg"}
            brand="Bata"
            description="Get Flat 50% off on all products on this Eid-ul-fitr 2024! Hurry up and grab your favorites now."
          />
          <BannerCard image={"banner2.png"} />
          <BannerCard image={"banner3.png"} />
          <BannerCard image={"banner4.png"} />
          <BannerCard image={"banner5.png"} />
          <BannerCard image={"banner3.png"} />
          <BannerCard image={"banner6.png"} />
          <BannerCard image={"banner2.png"} />
          <BannerCard image={"banner5.png"} />
          <BannerCard image={"banner3.png"} />
        </div>

        {/* advertise section  */}
        {/* <div className="mt-12 mx-24 relative">
          <img src="./Advertise/AddBanner.png" className="w-full mb-12 rounded-md" alt="middle-order-advertise" />
          <div className="absolute inset-0 flex items-center justify-left mx-32">
            <p className="text-white text-4xl font-extrabold">
              All New Fashion Items Are On Big Sale! Hurry Up
            </p>
            <div className="flex flex-row justify-between items-center w-6/12">
              <span className=" text-white font-thin text-lg mx-8">Online Shop Only</span>
              <button className="rounded-lg font-bold bg-primary text-white text-xl p-4">Shop now</button>
            </div>
          </div>
        </div> */}
        <div className="lg:mt-12 md:mt-6 xs:mt-6">
          <Link to="/all-category-items/LifeStyle">
            <img
              src="./Advertise/AdBanner.png"
              className="w-full lg:mb-12 md:mb-8 xs:mb-6 rounded-lg"
              alt="middle-order-advertise"
            />
          </Link>
        </div>

        {/* popular shops */}
        <PopularShops />

        {/* popular brands */}
        <PopularBrands />

        {/* Popular Products */}
        <PopularProducts
          products={popularProducts}
          isLoadingProducts={isLoadingProducts}
        />

        {/* Flash Sale */}
        <FlashSale
          products={flashProducts}
          isLoadingProducts={isLoadingProducts}
        />

        {/* Upcoming Coupons */}

        <div className="flex-col mt-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Upcoming Coupons</h2>{" "}
          </div>
          <div className="flex flex-col md:flex-row  gap-x-2 gap-y-2">
            <CouponCard image="coupon-1.jpg" />
            <CouponCard image="coupon1.png" />
          </div>
        </div>
      </div>

      {/* AppDownload Section  */}
      <AppDownload />
    </>
  );
}
