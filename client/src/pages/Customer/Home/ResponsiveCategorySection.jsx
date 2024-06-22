import { useState } from "react";
import { useDataQuery } from "../../../utils/api";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function ResponsiveCategorySection({ setShowCategory }) {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  // fetching categories
  const { data: categoriesData, isLoading } = useDataQuery(
    "category",
    "/category/all"
  );
  const categories = categoriesData?.data?.data;

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

  // handling showing chidrens of categories
  const handleShowCategory = (setSelected, categoryId, operation) => {
    if (operation === "show") {
      setSelected((prev) => {
        if (!prev.length) return [...prev, categoryId];
        else if (prev.includes(categoryId)) return [...prev];
        else return [...prev, categoryId];
      });
    } else {
      setSelected((prev) => [...prev].filter((id) => id !== categoryId));
    }
  };

  // find selected category/subCategory and show children cateogires based on that
  const findSelectedCategory = (selected, categoryId) =>
    selected?.find((id) => id === categoryId);

  return (
    <section className="flex flex-col gap-3">
      {/* Showing categories */}

      {isLoading
        ? "Loading Categories..."
        : categories?.map((category) => (
            <div key={category?._id}>
              <ul className="flex justify-between text-base font-semibold">
                <li>{category?.name}</li>

                {!findSelectedCategory(selectedCategory, category?._id) ? (
                  <FaPlus
                    className="cursor-pointer"
                    onClick={() =>
                      handleShowCategory(
                        setSelectedCategory,
                        category?._id,
                        "show"
                      )
                    }
                  />
                ) : (
                  <FaMinus
                    className="cursor-pointer"
                    onClick={() =>
                      handleShowCategory(
                        setSelectedCategory,
                        category?._id,
                        "hide"
                      )
                    }
                  />
                )}
              </ul>

              {/* showing subcategories under category */}

              {findSelectedCategory(selectedCategory, category?._id) &&
                subCategories
                  ?.filter(
                    (subCategory) =>
                      subCategory?.category?._id ===
                      findSelectedCategory(selectedCategory, category?._id)
                  )
                  .map((subCategory) => (
                    <div key={subCategory?._id} className="flex flex-col">
                      <ul
                        className={`flex justify-between ml-2 text-sm font-semibold ${
                          findSelectedCategory(selectedCategory, category?._id)
                            ? "block"
                            : "hidden"
                        } transition-all`}
                      >
                        <li>{subCategory?.name}</li>
                        {!findSelectedCategory(
                          selectedSubCategory,
                          subCategory?._id
                        ) ? (
                          <FaPlus
                            className="cursor-pointer"
                            onClick={() =>
                              handleShowCategory(
                                setSelectedSubCategory,
                                subCategory?._id,
                                "show"
                              )
                            }
                          />
                        ) : (
                          <FaMinus
                            className="cursor-pointer"
                            onClick={() =>
                              handleShowCategory(
                                setSelectedSubCategory,
                                subCategory?._id,
                                "hide"
                              )
                            }
                          />
                        )}
                      </ul>

                      {/* showing selecte sub2categories under subcateogry */}

                      {findSelectedCategory(
                        selectedSubCategory,
                        subCategory?._id
                      ) &&
                        sub2Categories
                          ?.filter(
                            (sub2Category) =>
                              sub2Category?.subcategory?._id ===
                              findSelectedCategory(
                                selectedSubCategory,
                                subCategory?._id
                              )
                          )
                          .map((sub2Category) => (
                            <Link
                              to={`/category/${sub2Category?.category?.name}/${subCategory?.name}/${sub2Category?.name}`}
                              key={sub2Category?._id}
                              className="underline decoration-primary underline-offset-2 text-xs font-light italic ml-4"
                              onClick={() => setShowCategory(false)}
                            >
                              {sub2Category?.name}
                            </Link>
                          ))}
                    </div>
                  ))}
            </div>
          ))}
    </section>
  );
}
