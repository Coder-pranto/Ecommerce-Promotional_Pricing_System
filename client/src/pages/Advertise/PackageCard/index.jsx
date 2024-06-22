/* eslint-disable react/prop-types */
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PackageCard(props) {
  const { _id, name, duration, position, price } = props.package;
  return (
    <div className="bg-white md:w-[25%] xs:w-[50%] xs:mx-auto rounded-sm hover:bg-[#ec4f22] transition duration-500 ease-in-out hover:text-white">
      <div className="h-[20px] bg-[#ec4f22] mb-3"></div>
      <div>
        <h2 className="text-2xl font-semibold text-center">{name}</h2>
        <h2 className="text-3xl font-bold text-center mt-3 text-yellow-400">
          BDT-{price}
        </h2>
        <div className="p-4 ">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faCheck} />
            <p>Position: {position}</p>
          </div>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faCheck} />
            <p>Duration: {duration} days</p>
          </div>
        </div>
        <div className="p-4 flex justify-center">
          <button
            type="button"
            className="bg-yellow-400 text-white font-semibold px-2 py-[3px] rounded-md hover:bg-yellow-500"
            onClick={() => props.handlePurchase(props.package)}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
