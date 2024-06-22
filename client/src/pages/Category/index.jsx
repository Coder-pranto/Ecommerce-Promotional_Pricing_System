/* eslint-disable react/prop-types */
import { useState } from "react";
import SubMenu from "./SubMenuBar";
import MallSelection from "./MallSelection";
import AppDownload from "../../components/customers/AppDownload";
import Products from "./Products";
import PopularShops from "../Customer/Home/PopularShops";
import { useParams } from "react-router-dom";
import { useDataQuery } from "../../utils/api";
import { IoClose, IoFilter } from "react-icons/io5";
import PostCard from "../../components/customers/PostCard";
const Btn = ({ name, isActive, onClick }) => {
  return (
    <button
      className={`xs:w-full lg:w-28 p-2 border-2 ${
        isActive ? "bg-primary text-white" : "border-primary text-primary"
      } rounded-lg hover:bg-prmary hover:text-white active:bg-prmary active:text-white`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

const Category = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showResponsiveFilters, setShowResponsiveFilters] = useState(false);

  // console.log(selectedSub3Category);

  const { id, subId, subSubId } = useParams();

  //***** This is for preventing show all products when query doesn't match
  const { data: allProducts } = useDataQuery("products", "/discount");

  const products = allProducts?.data?.data;
  // console.log(products);

  const productsBySub3Category = products?.filter(
    (product) => product?.sub_sub_sub_category_id?.name.trim() === subSubId
  );

  // const { data: searchData, isLoadingSub3: searchLoading } = useDataQuery(
  //   ["search", id, searchValue],
  //   `/discount/search/${id}?searchQuery=${searchValue}`
  // );
  // const searchedProducts = searchData?.data?.products;
  //***** This is for preventing show all products when query doesn't match

  //fetching sub3categories
  const { data: allSub3Categories, isLoadingSub3 } = useDataQuery(
    "sub3Category",
    "/category/subsubsub/all"
  );

  //fetching sub2categories
  const { data: allSub2Categories, isLoadingSub2 } = useDataQuery(
    "sub2Category",
    "/category/subsub/all"
  );

  // filtering sub3Categories and sub2Categories conditionally that match with the params name
  let subcategories;
  let isLoading;

  if (subSubId) {
    subcategories = allSub3Categories?.data?.data?.filter(
      (sub3Category) => sub3Category.subsubcategory?.name === subSubId
    );
    isLoading = isLoadingSub3;
  } else {
    subcategories = allSub2Categories?.data?.data?.filter(
      (sub2Category) => sub2Category.subcategory?.name.trim() === subId.trim()
    );
    isLoading = isLoadingSub2;
  }

  // console.log({ allSub2Categories }, { subcategories }, { subId });

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setDiscountPercentage(value);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // const handleSearch = useCallback(
  //   (e) => {
  //     const searchTimeout = setTimeout(() => {
  //       setSearchValue(e.target.value);
  //     }, 1200);
  //     clearTimeout(() => searchTimeout);
  //   },
  //   [setSearchValue]
  // );

  return (
    <section className="w-full">
      <div>
        <div className="w-full flex items-center justify-between mt-5 mb-3">
          <div>
            <span className="font-bold text-slate-400">Home &gt;</span>
            <span className="font-bold text-primary"> {id}</span>
          </div>
          {!showResponsiveFilters && (
            <IoFilter
              className="block lg:hidden"
              size={20}
              onClick={() => setShowResponsiveFilters(true)}
            />
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="mb-4 md:mb-0 hidden lg:block">
            <div className=" bg-slate-200 p-3 rounded-lg shadow-md mb-5 ">
              <h3 className="font-semibold text-lg mb-2">Sort By</h3>
              {/* <input
                type="text"
                placeholder="Search a product"
                className="bg-slate-300 my-4 w-full p-2 rounded-md text-primary outline-primary"
                onChange={(e) => handleSearch(e)}
              /> */}
              <div className="button-container flex flex-col md:flex-row gap-x-2 xs:gap-y-2 mb-3">
                <Btn
                  name="Price"
                  isActive={activeButton === "Price"}
                  onClick={() => handleButtonClick("Price")}
                />
                <Btn
                  name="NearBy"
                  isActive={activeButton === "NearBy"}
                  onClick={() => handleButtonClick("NearBy")}
                />
                <Btn
                  name="Newest"
                  isActive={activeButton === "Newest"}
                  onClick={() => handleButtonClick("Newest")}
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">Discount</h3>

              <input
                id="labels-range-input"
                type="range"
                value={discountPercentage}
                onChange={handleSliderChange}
                min="1"
                max="100"
                className="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-primary"
              />
              <p className="mt-2 text-sm text-gray-600">
                Discount: {discountPercentage}%
              </p>
              <h3 className="font-semibold text-lg mb-2 mt-3">Select Mall</h3>
              <MallSelection />
            </div>
            <div className="mt-4">
              <img
                src={`/Advertise/advertise.jpg`}
                className="w-full rounded-md border-2 border-primary"
              />
            </div>
          </div>

          {/* Responsive Filters */}
          <div
            className={`fixed right-0 top-0 overflow-y-auto w-1/2 h-screen bg-slate-200 z-50 ${
              showResponsiveFilters ? "translate-x-0" : "translate-x-full"
            } transition-all duration-150`}
          >
            <div className=" bg-slate-200 p-3 rounded-lg shadow-md mb-5">
              <IoClose
                className="ml-auto block lg:hidden"
                size={20}
                onClick={() => setShowResponsiveFilters(false)}
              />
              <h3 className="font-semibold text-lg mb-2">Sort By</h3>
              {/* <input
                type="text"
                placeholder="Search a product"
                className="bg-slate-300 my-4 w-full p-2 rounded-md text-primary outline-primary"
                onChange={(e) => handleSearch(e)}
              /> */}
              <div className="button-container flex flex-col md:flex-row gap-x-2 xs:gap-y-2 mb-3">
                <Btn
                  name="Price"
                  isActive={activeButton === "Price"}
                  onClick={() => handleButtonClick("Price")}
                />
                <Btn
                  name="NearBy"
                  isActive={activeButton === "NearBy"}
                  onClick={() => handleButtonClick("NearBy")}
                />
                <Btn
                  name="Newest"
                  isActive={activeButton === "Newest"}
                  onClick={() => handleButtonClick("Newest")}
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">Discount</h3>

              <input
                id="labels-range-input"
                type="range"
                value={discountPercentage}
                onChange={handleSliderChange}
                min="1"
                max="100"
                className="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-primary"
              />
              <p className="mt-2 text-sm text-gray-600">
                Discount: {discountPercentage}%
              </p>
              <h3 className="font-semibold text-lg mb-2 mt-3">Select Mall</h3>
              <MallSelection />
            </div>
            <div className="mt-4">
              <img
                src={`/Advertise/advertise.jpg`}
                className="w-full rounded-md border-2 border-primary"
              />
            </div>
          </div>

          {/* Submenu */}
          <div className="w-full overflow-x-auto">
            <SubMenu
              subcategories={subcategories}
              isLoading={isLoading}
              setSelectedSubCategory={setSelectedSubCategory}
            />
            {searchValue ? (
              <div>
                {searchLoading ? (
                  "Searching..."
                ) : productsBySub3Category?.length ===
                  searchedProducts?.length ? ( // this line for preventing showing all products
                  <span className="col-span-full text-xl text-center text-secondary">
                    Nothing matched with searched query
                  </span> // this line for preventing showing all products
                ) : (
                  searchedProducts?.map((product) => (
                    <PostCard key={product?._id}product={product} />
                  ))
                )}
              </div>
            ) : (
              <Products selectedSubCategory={selectedSubCategory} />
            )}
          </div>
        </div>

        {/* Popular Shop  */}
        <PopularShops />
      </div>

      {/* AppDownload section  */}
      <AppDownload />
    </section>
  );
};

export default Category;
