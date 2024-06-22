/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

export default function FilterNavigationBar({
  filterItem,
  setFilterItem,
  discounts,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [transitionClass, setTransitionClass] = useState("");
  let totalApproved = 0;
  let totalPending = 0;
  let totalRejected = 0;

  discounts?.map((discount) => {
    if (discount.status === "approved") {
      totalApproved += 1;
    } else if (discount.status === "pending") {
      totalPending += 1;
    } else {
      totalRejected += 1;
    }
  });

  useEffect(() => {
    setTransitionClass(isFilterOpen ? "translate-x-0" : "translate-x-full");
  }, [isFilterOpen]);

  const filterItems = ["all", "approved", "pending", "rejected"];

  const toggleFilterbar = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="">
      {/* sub navigation bar for lg screen */}
      <div className="xs:hidden md:block">
        <ul className="w-[60%] ml-6 mt-6 flex bg-white justify-evenly p-2 rounded-lg font-medium">
          {filterItems.map((item, index) => (
            <li key={index} onClick={() => setFilterItem(item)}>
              <span
                className={`transition duration-300 ease-in-out p-2 cursor-pointer capitalize ${
                  filterItem === item
                    ? "border-b-2 border-primary text-primary"
                    : "hover:border-b-2 hover:border-primary hover:text-primary"
                }`}
              >
                {item === "rejected" ? "Inactive" : item}{" "}
                {item === "approved"
                  ? `(${totalApproved})`
                  : item === "pending"
                  ? `(${totalPending})`
                  : item === "all"
                  ? `(${discounts?.length || 0})`
                  : `(${totalRejected})`}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Filter toggle button for xs screen */}
      <div className="md:hidden flex justify-end mr-4 cursor-pointer">
        <span onClick={toggleFilterbar}>
          <FontAwesomeIcon icon={faAnglesRight} />
        </span>
      </div>

      {/* sub navigation bar for xs screen with smooth transition */}
      {isFilterOpen && (
        <div
          className={`md:hidden fixed right-0 xs:w-[30%] bg-white text-black z-10 transition-transform duration-500 ease-in-out ${transitionClass}`}
        >
          <ul className="text-sm flex flex-col gap-2 p-2 rounded-lg font-semibold">
            {filterItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setFilterItem(item);
                  setIsFilterOpen(false);
                }}
              >
                <span
                  className={`transition duration-300 ease-in-out p-2 cursor-pointer ${
                    filterItem === item
                      ? "text-[#ec4f22]"
                      : "hover:text-[#ec4f22]"
                  }`}
                >
                  {item} (0)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
