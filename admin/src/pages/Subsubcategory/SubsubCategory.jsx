import { Link } from "react-router-dom";
import SubsubcategoryForm from "./SubsubcategoryCreationForm";

const SubsubCategory = () => {
  return (
    <div className="flex flex-col justify-center mx-auto w-2/5">
      <div className="flex justify-between">
        <h3 className="text-2xl ml-7 font-bold">Sub-sub-category</h3>
        <Link
          to="allsubsubCategory"
          className="mr-8 px-4 py-2 bg-primary text-white rounded"
        >
          All SubsubCategory
        </Link>
      </div>

      <div className="flex flex-col p-6">
        <SubsubcategoryForm />
      </div>
    </div>
  );
};

export default SubsubCategory;
