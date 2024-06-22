import { TfiMenuAlt } from "react-icons/tfi";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CategorySection({
  categories,
  subCategories,
  sub2Categories,
  isLoading,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const navigate = useNavigate();

  const matchedSubCategories = subCategories?.filter(
    (subCategory) => subCategory?.category?.name === selectedCategory
  );

  // console.log({ matchedSubCategories });

  const matchedSub2Categories = sub2Categories?.filter(
    (sub2Category) => sub2Category?.subcategory?.name === selectedSubCategory
  );

  // console.log({ matchedSub2Categories });

  // Mouse Enter functionalities
  const handleMouseEnterCategory = (catId) => setSelectedCategory(catId);
  const handleMouseEnterSubCategory = (subCatName) => {
    // console.log(subCatName);
    if (subCatName?.category?.name === "LifeStyle")
      setSelectedSubCategory(subCatName?.name);
  };
  // setSelectedSubCategory(subCatName);

  // Mouse Leave functionalities
  const handleMouseLeaveSubCategory = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedSubCategory(null);
  };
  const handleMouseLeaveSub2Category = () => setSelectedSubCategory(null);

  return (
    <div
      className=" py-2 h-full border-slate-300 z-50"
      // onMouseLeave={handleMouseLeaveCategory}
    >
      <p className="flex items-center px-3">
        <TfiMenuAlt size="20px" className="inline" />
        <span className="text-md ml-2 border-slate-300">Category</span>
        <br />
      </p>
      <hr className="my-2 border-slate-300" />
      {isLoading
        ? "Loading Categories..."
        : categories?.map((category) => (
            <div key={category._id}>
              <ul>
                <li
                  className="flex items-center justify-between py-1 px-3 text-sm hover:bg-slate-200 hover:text-primary transition-colors cursor-pointer"
                  onMouseEnter={() => handleMouseEnterCategory(category?.name)}
                >
                  <span>{category?.name}</span>
                  <BiRightArrowAlt />
                </li>
              </ul>

              {/* Sub Cat */}
              {selectedCategory === category?.name && (
                <div
                  className={`absolute top-0 -right-[205px] w-[200px] h-full bg-gray-100 flex flex-col gap-1 z-50 py-3 ${
                    selectedSubCategory ? "rounded-r-none" : "rounded-md"
                  }`}
                  onMouseLeave={handleMouseLeaveSubCategory}
                >
                  {matchedSubCategories?.map((subCategory) => (
                    <div key={subCategory?._id}>
                      <ul>
                        <li
                          className="w-full text-sm flex items-center justify-between hover:bg-slate-200 hover:text-primary transition-colors cursor-pointer px-3 py-1"
                          onMouseEnter={() =>
                            // First one for showing only lifestyle sub2categories and second one all sub2Categories

                            // handleMouseEnterSubCategory(subCategory?.name)
                            handleMouseEnterSubCategory(subCategory)
                          }
                          onClick={() =>
                            navigate(
                              `/category/${subCategory?.category?.name}/${subCategory?.name}`
                            )
                          }
                        >
                          {subCategory?.name}
                          {selectedCategory === "LifeStyle" && (
                            <BiRightArrowAlt />
                          )}
                        </li>
                      </ul>

                      {/* Level 2 sub categories */}
                      {selectedSubCategory === subCategory?.name && (
                        <div
                          className="absolute border-l-2 border-secondary top-0 -right-[500px] w-[500px] h-full bg-gray-100 p-3 z-50 rounded-r-md"
                          // onMouseEnter={handleMouseEnterSub2Category}
                          onMouseLeave={handleMouseLeaveSub2Category}
                        >
                          <h2 className="text-md font-semibold">
                            {selectedSubCategory}
                          </h2>
                          <div className="flex gap-4 flex-wrap">
                            {matchedSub2Categories?.map((sub2Category) => (
                              <Link
                                to={`/category/${sub2Category?.category?.name}/${subCategory?.name}/${sub2Category?.name}`}
                                key={sub2Category?._id}
                                className="hover:underline hover:decoration-primary hover:underline-offset-2 mt-5"
                              >
                                {sub2Category?.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
    </div>
  );
}
