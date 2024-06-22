import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import FilterNavigationBar from "../filterNagivationBar";
import SearchBar from "../../../components/SearchBar";
import { NavLink } from "react-router-dom";
import DiscountManageTable from "../DiscountManageTable";
import Loader from "../../../components/Loader";
import { useDataQuery } from "../../../utils/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function ManageDiscount() {
  const [filterItem, setFilterItem] = useState("approved");
  const [searchText, setSearchText] = useState("");
  const [discounts, setDiscounts] = useState([]);

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjdAMi5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzA3ODgzNzQ5LCJleHAiOjE3MDc5NzAxNDl9.XTPBSXabCcx6V1aiPvT4G3SXiiWi2t2HIFwu8qGmCgE";
  // const sellerId = "65b0e4bb6b93ad4b0bee8734"; // this is for experimental (shifat)
  const token = Cookies.get("token");
  const sellerId = Cookies.get('sellerID');

  const {
    data: discountDatas,
    isLoading,
    error,
  } = useDataQuery("discounts", `/discount?seller_id=${sellerId}`, token);

  // if (error) {
  //   toast.error(error?.response.data.msg);
  // }

  useEffect(() => {
    setDiscounts(discountDatas?.data?.data);
  }, [discountDatas]);

  const handleSearch = (value) => {
    const searchText = value?.toLowerCase();
    setSearchText(searchText);
  };

  return (
    <div>
      <Header headerTitle="Manage your discounts" />

      <FilterNavigationBar
        filterItem={filterItem}
        setFilterItem={setFilterItem}
        discounts={discounts}
      />

      {/* search bar and discount post button */}
      <div className="flex items-center">
        <SearchBar onSearch={handleSearch} />
        <NavLink
          to="/seller-dashboard/new-dscount"
          className="w-[30%] py-2 md:px-4 xs:px-[5px] mt-2 bg-primary text-white rounded-md mr-3 md:text-sm xs:text-[8px] hover:bg-secondary "
        >
          + Post new discount
        </NavLink>
      </div>

      {/* discount managing table */}
      <DiscountManageTable
        filterItem={filterItem}
        searchText={searchText}
        discounts={discounts}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
