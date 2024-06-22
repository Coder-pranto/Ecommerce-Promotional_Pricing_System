import { Icon } from "@iconify/react";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transitionClass, setTransitionClass] = useState("");

  useEffect(() => {
    setTransitionClass(isSidebarOpen ? "translate-x-0" : "-translate-x-full");
  }, [isSidebarOpen]);

  const menuItems = [
    {
      icon: "material-symbols-light:post-add",
      name: "New Discount",
      path: "/seller-dashboard/new-dscount",
    },
    {
      icon: "material-symbols-light:manage-history",
      name: "Manage Discount",
      path: "/seller-dashboard/manage-discount",
    },
    {
      icon: "iconamoon:discount-light",
      name: "Coupon",
      path: "/seller-dashboard/coupon",
    },
    {
      icon: "tabler:ad-2",
      name: "Advertise",
      path: "/seller-dashboard/advertise",
    },
    {
      icon: "material-symbols-light:inactive-order-outline",
      name: "Order",
      path: "/seller-dashboard/order",
    },
  ];

  const openSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      {/* Hamburger icon for xs screens */}
      <div
        className="lg:hidden text-xl p-3 cursor-pointer absolute z-20 mt-3 ml-[1%]"
        onClick={openSidebar}
      >
        {!isSidebarOpen ? (
        <FontAwesomeIcon icon={faBars}/>
        ) : (
          <FontAwesomeIcon icon={faX} />
        )}
      </div>

      {/* Sidebar for lg screens */}
      <div
        className={`w-[20%] lg:block xs:hidden overflow-y-auto fixed bg-white text-black`}
      >
        <div className="h-[100vh]">
          <div className="text-xxl font-semibold mb-5 p-3 text-primary text-center mt-3">
           <Link to='/'><h2>Discount Hut</h2></Link> 
          </div>
          <div className="">
            {menuItems.map((menuItem, index) => (
              <NavLink
                to={menuItem.path}
                key={index}
                className={({ isActive }) =>
                  `flex gap-4 items-center p-3 font-medium hover:bg-gray-100 ${
                    isActive ? "bg-gray-100 text-primary" : ""
                  }`
                }
              >
                <Icon icon={menuItem.icon} />
                <span>{menuItem.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for xs screens */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 cursor-pointer"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar content for xs screens */}
      {isSidebarOpen && (
        <div
          className={`lg:hidden fixed inset-y-0 left-0 xs:w-[60%] md:w-[40%] bg-white text-black z-10 transition-transform duration-500 ease-in-out ${transitionClass}`}
        >
          <div className="text-2xl font-bold border-b-2 border-b-primary p-3 text-primary text-center mt-3">
          <Link to='/'><h2>Discount Hut</h2></Link> 
          </div>
          <div className="inline-block rounded-full ml-3 mt-2 cursor-pointer"></div>
          <div className="">
            {menuItems.map((menuItem, index) => (
              <NavLink
                to={menuItem.path}
                key={index}
                className={({ isActive }) =>
                  `flex gap-4 items-center p-3 font-semibold hover:bg-gray-100 ${
                    isActive ? "bg-gray-100" : ""
                  }`
                }
                onClick={openSidebar}
              >
                <Icon icon={menuItem.icon} />
                <span>{menuItem.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
