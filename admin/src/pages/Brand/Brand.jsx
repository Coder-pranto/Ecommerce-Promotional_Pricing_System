import { Link } from "react-router-dom";
import CreateBrandForm from "./BrandCreationForm";

const Brand = () => {
  return (
    <div className="brand flex flex-col justify-center mx-auto w-2/5">
      <div className="flex justify-between">
        <h3 className="brand-title text-2xl font-bold">Brand</h3>
        <Link
          to="allBrands"
          className="allbrand-btn w-32 text-center p-1 bg-primary text-white rounded"
        >
          All Brands
        </Link>
      </div>

      <div className="flex flex-col p-5 bg-[#FEF4F2] mt-5 border-2 border-gray-200 rounded-lg">
        <CreateBrandForm />
      </div>
    </div>
  );
};

export default Brand;
