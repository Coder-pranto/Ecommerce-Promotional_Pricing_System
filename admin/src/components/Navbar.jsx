/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const storedData = localStorage.getItem("user");
    const parsedData = storedData ? JSON.parse(storedData) : null;
    if (parsedData) {
      setUserData(parsedData.name);
    }
  }, []);

  const handleLogout = () => {
    // handling
    Cookies.remove("token");
    localStorage.removeItem("user");

    // routing
    navigate("/");
    toast.success("Logout Successfully");
  };

  return (
    <header className="flex justify-between items-center bg-primary shadow-md text-white p-2 md:p-4 h-20">
      {/* <div className="flex items-center">
      <img className="w-10 md:w-12 h-10 md:h-12 mr-2 md:mr-4 rounded-full" src="../../src/assets/navbarLogo.png" alt="Website Logo" />
      <h3 className="text-lg md:text-xl">DISCOUNT HUT</h3>
    </div> */}
      <div className="flex items-center">
        <img
          className="w-32 bg-white p-2 rounded-lg"
          src="/navbarLogo.png"
          alt="Website Logo"
        />
      </div>
      <div className="flex items-center">
        <div className="flex items-center flex-col justify-end">
          <div className="flex items-center">
            <img
              className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-1 md:mr-2"
              src="/adminPic.jpg"
              alt="Admin Picture"
            />
            <p className="text-sm md:text-base mr-1 md:mr-2">
              {userData.toUpperCase()}
            </p>
            <p className="relative group">
              <BiSolidDownArrow cursor="pointer" />
              <span
                className="hidden group-hover:block absolute bg-white text-primary -right-2 px-3 py-2 rounded-md shadow-lg cursor-pointer font-semibold"
                onClick={handleLogout}
              >
                Logout
              </span>
            </p>
          </div>
          <p className="text-xs md:text-sm self-end mr-4">ADMIN</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

/*    <header className="header">
            <div className="section-left">
                <img className="website-logo" src="../assets/navbarLogo.png" />
                <h3>DISCOUNT HUT</h3>
                <img className="icon-caret-down" src="/-icon-caret-down.svg" />
            </div>
            <div className="section-right">
                <div className="admin-pic">
                    <img className="logo-child" src="../assets/adminPic.jpg" />
                    <p className="admin-name">Riaj Hasan Pranto</p>
                    <img className="icon-caret-down" src="../assets/-icon-caret-down.svg" />
                </div>
                <p>ADMIN</p>
            </div>
        </header> */
