import { Link } from "react-router-dom";
import SubsubsubcategoryForm from "./SubsubsubcategoryForm";

const Subsubsubcategory = () => {
  return (
    <div className="flex flex-col justify-center mx-auto w-2/5">
      <div className="flex justify-between">
        <h3 className="text-2xl ml-7 font-bold">Sub-sub-sub-category</h3>
        <Link
          to="allsubsubsubCategory"
          className="mr-8 px-4 py-2 bg-primary text-white text-center rounded"
        >
          All SubsubsubCategory
        </Link>
      </div>

      <div className="flex flex-col p-6">
        <SubsubsubcategoryForm />
      </div>
    </div>
  );
};

export default Subsubsubcategory;
