/* eslint-disable react/prop-types */
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ headerTitle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('isSeller');
    Cookies.remove('userId');
    Cookies.remove('sellerID');
    Cookies.remove('auth');
    toast("You have been logged out");
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="inline-block text-xl mt-6 xs:ml-14 lg:ml-6 font-semibold">
        {headerTitle}
      </h2>
      <div>
        <div className="flex gap-4 mt-2 px-3 text-xl items-center">
          <div
            className="border-2 border-primary px-2 py-[3px] rounded-full cursor-pointer"
            title="Profile"
          >
            <Link to='/profile'><FontAwesomeIcon icon={faUser} /></Link>
          </div>
          <button
            type="button"
            className="bg-primary p-2 rounded-lg text-white cursor-pointer xs:text-[12px] md:text-sm lg:text-lg hover:bg-primary"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
