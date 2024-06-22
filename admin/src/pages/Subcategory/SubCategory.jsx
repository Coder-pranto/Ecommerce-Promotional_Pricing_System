// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import SubcategoryForm from "./SubcategoryCreationForm";

const SubCategory = () => {
  return (
    <div className="flex flex-col justify-center mx-auto w-2/5">
      <div className="flex justify-between">
        <h3 className="text-2xl ml-7 font-bold">Subcategory</h3>
        <Link
          to="allsubCategory"
          className="mr-8 px-4 py-2 bg-primary text-white rounded"
        >
          All SubCategory
        </Link>
      </div>

      <div className="flex flex-col p-6">
        <SubcategoryForm />
      </div>
    </div>
  );
};

export default SubCategory;
