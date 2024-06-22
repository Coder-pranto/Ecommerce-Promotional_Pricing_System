/* eslint-disable react/prop-types */
import { CiStopwatch } from "react-icons/ci";
import { LuStore } from "react-icons/lu";
import { Link } from "react-router-dom";

const Card = ({ image, brand, description }) => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-[180px] object-cover"
        src={`./banner/${image}`}
        alt="Banner"
      />
      <div className="lg:px-6 xs:px-3">
        <div className=" text-xs mb-2 flex justify-between text-primary">
          <span>LifeStyle</span>
          <span>
            <LuStore className="inline mx-1 mb-1" />
            {brand || "Richman"}
          </span>
        </div>
        <p className="text-xs">
          {description ||
            " Get 20% off on all products! Limited time offer. Hurry up and grab your favorites now."}
        </p>
      </div>
      <div className="lg:px-6 xs:px-3 py-2 text-xs flex justify-between items-center">
        <div className="flex items-center">
          <CiStopwatch className="inline mr-2" />
          <p className="inline opacity-65">5 days left</p>
        </div>
        {/* <Link
          to="/product"
          className="bg-primary hover:bg-secondary transition-colors text-white font-bold py-2 px-4 rounded-md"
        >
          Details
        </Link> */}
      </div>
    </div>
  );
};

export default Card;
