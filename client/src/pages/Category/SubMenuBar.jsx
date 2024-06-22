import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
const SubMenu = ({ subcategories, isLoading, setSelectedSubCategory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const menuItemClickHandler = (index) => setCurrentIndex(index);
  // setting subcategory name on first render
  useEffect(() => {
    subcategories?.map(
      (subCategory, idx) =>
        currentIndex === idx && setSelectedSubCategory(subCategory)
    );
  }, [currentIndex, subcategories]);
  // setting subcategory name on first render

  return (
    <div className="w-full relative border-2 border-primary p-3 xs:mx-0 rounded-md shadow-md">
      <div className="overflow-x-auto mr-4">
        <div className="my-2 flex justify-between gap-8 text-primary">
          {isLoading
            ? "Loading Sub-Categories..."
            : subcategories?.map((subCategory, index) => (
                <div
                  key={subCategory._id}
                  className={` ${
                    currentIndex === index
                      ? "underline underline-offset-4 decoration-[3px]"
                      : ""
                  }`}
                  style={{ whiteSpace: "nowrap" }}
                >
                  <span
                    className="font-semibold cursor-pointer"
                    onClick={() => menuItemClickHandler(index)}
                  >
                    {subCategory?.name}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
