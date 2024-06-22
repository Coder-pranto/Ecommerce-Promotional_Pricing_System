/* eslint-disable react/prop-types */
import { FaUserCircle } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const ReviewCard = ({
  name,
  comment,
  rating,
  customerId,
  userId,
  handleUpdate,
}) => {
  return (
    <div className="w-full flex flex-col p-2 bg-gray-200 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 mb-1">
          <FaUserCircle size={25} color="gray" />
          <h4 className="font-bold text-black">{name}</h4>
          <span className="flex items-center">
            {Array.from({ length: rating }, (_, index) => (
              <FaStar key={index} color="skyblue" />
            ))}
            {Array.from({ length: 5 }, (_, index) => (
              <FaRegStar key={index} color="skyblue" />
            )).slice(rating, 5)}
          </span>
        </div>
        {customerId === userId && (
          <button onClick={handleUpdate}>
            <FaRegEdit color="gray" />
          </button>
        )}
      </div>
      <div>
        <p className="text-sm text-justify ml-8">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
