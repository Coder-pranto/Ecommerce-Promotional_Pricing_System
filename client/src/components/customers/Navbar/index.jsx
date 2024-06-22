/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDataQuery } from "../../../utils/api";
import { HiBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import ResponsiveCategorySection from "../../../pages/Customer/Home/ResponsiveCategorySection";

// for confirmPrompt->primereact
import "./index.css";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null); // for confirmPrompt->primereact

  // getting the loggedIn seller
  const sellerId = Cookies.get("sellerID");
  const { data: allSeller } = useDataQuery("all-seller", "/seller/all");
  const sellerInfo = allSeller?.data?.data?.find(
    (seller) => seller._id === sellerId
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    navigate("/search", { state: { searchQuery: searchQuery } });
    setShowCategory(false);
    // console.log("Searching for:", searchQuery);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    confirmDialog({
      message: "Are you sure you want to Logout?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        Cookies.remove("sellerID");
        Cookies.remove("token");
        Cookies.remove("isSeller");
        Cookies.remove("userId");
        toast.current.show({
          severity: "info",
          summary: "Confirmed",
          detail: "You have been logged out",
          life: 3000,
        });
        navigate("/");
      },
      reject: () => {
        console.log("You have remained login");
      },
    });
    // const isConfirmed = window.confirm("Are you sure you want to log out?");

    // if (isConfirmed) {
    //     Cookies.remove("sellerID");
    //     Cookies.remove("token");
    //     Cookies.remove("isSeller");
    //     Cookies.remove("userId");

    //     toast("You have been logged out");
    //     navigate("/");
    // }
  };

  const isLoggedIn = !!Cookies.get("token");
  const getProfile = Cookies.get("isSeller");

  return (
    <nav className="fixed top-0 w-[100vw] bg-gray-100 shadow-lg z-50">
      <div className="w-full">
        <Toast ref={toast} />
        <ConfirmDialog />
      </div>
      <div className="w-[90vw] mx-auto flex justify-center items-center gap-5 py-4">
        {/* Bar for responsive */}
        <HiBars3
          className="lg:hidden cursor-pointer"
          size={30}
          onClick={() => setShowCategory(true)}
        />
        <div className="w-full flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img
              src="/DiscountHutBlack.svg"
              alt="logo"
              className="w-32 lg:w-48"
            />
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex rounded-md overflow-hidden">
            <input
              type="search"
              id="query"
              name="q"
              value={searchQuery}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search in DiscountHut"
              className="w-32 md:w-72 border-2 border-primary border-r-0 rounded-md rounded-r-none text-xs md:text-sm px-2"
            />
            <button
              onClick={handleSearch}
              className="bg-primary text-xs md:text-lg text-white px-3 sm:px-4 py-1 md:py-2 rounded-r-md"
            >
              Search
            </button>
          </div>

          {/* Login */}
          <div className="flex justify-between gap-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="rounded-md bg-white text-xs md:text-lg text-primary px-2 md:px-4 py-1 md:py-2 border-2 border-primary"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-white text-xs md:text-lg text-primary px-2 md:px-4 py-1 md:py-2 border-2 border-primary"
              >
                Login
              </Link>
            )}

            {getProfile === "true" ? (
              <Link
                to="/profile"
                className="h-10 w-10 lg:w-12 lg:h-12 rounded-full bg-primary text-white ml-4 outline outline-2 outline-offset-2 outline-primary"
              >
                <img
                  src={`https://api.discounthutdeshit.tailormaster.xyz/${
                    sellerInfo?.shopLogo || "userdummy.png"
                  }`}
                  className=" w-full h-full rounded-full object-cover"
                  alt="user_pic"
                />
              </Link>
            ) : (
              <Link
                to="/new-seller-registration"
                className="rounded-md bg-primary text-xs md:text-lg text-white px-2 md:px-4 py-1 md:py-2 border-2 border-primary"
              >
                Become a seller
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* responsive */}
      <div
        className={`fixed top-0 ${
          showCategory
            ? "translate-x-0 opacity-100"
            : "-translate-x-[800px] opacity-35"
        } bg-secondary text-white h-[100vh] w-4/5 sm:w-1/3 md:w-1/2 px-4 pt-12 shadow-lg transition-all delay-100 overflow-y-auto lg:hidden z-50`}
      >
        <IoClose
          className="absolute right-2 top-2 cursor-pointer"
          size={30}
          onClick={() => setShowCategory(false)}
        />
        {/* Search Bar */}
        <div className="flex rounded-md overflow-hidden my-5">
          <input
            type="search"
            id="query"
            name="q"
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search in DiscountHut"
            className="w-full border-2 border-primary text-black border-r-0 rounded-md rounded-r-none text-xs md:text-sm px-2 py-2 outline-primary"
          />
          <button
            onClick={handleSearch}
            className="bg-primary text-xs md:text-lg text-white px-3 sm:px-4 py-1 md:py-2 rounded-r-md"
          >
            Search
          </button>
        </div>
        {/* Categories */}
        <ResponsiveCategorySection setShowCategory={setShowCategory} />
      </div>
    </nav>
  );
}
