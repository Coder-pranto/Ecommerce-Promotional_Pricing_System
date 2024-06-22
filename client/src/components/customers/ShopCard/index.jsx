/* eslint-disable react/prop-types */
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useState } from "react";
import { useDataQuery } from "../../../utils/api";
import { Link } from "react-router-dom";

export default function ShopCard({ shopId, shopName, image }) {
  const [isLiked, setIsLiked] = useState(false);
  const { data: products } = useDataQuery("discount", "/discount");

  const filteredProducts = products?.data?.data?.filter(
    (product) => product?.seller_id?._id === shopId
  );
  // console.log("oo", filteredProducts);

  const handleLikeToggle = () => setIsLiked(!isLiked);

  return (
    <div className="relative shadow-lg rounded-b-md">
      <Link to={`/map/${shopId}`}>
        <img
          className="w-full h-[120px] md:h-[150px] xl:h-[180px] object-cover rounded-t-md"
          src={image}
          alt={shopName}
        />
      </Link>
      <div
        className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
        onClick={handleLikeToggle}
      >
        {/* <IoMdHeartEmpty size="20px" color="#ec4f22" /> */}
        {isLiked ? (
          <IoMdHeart size="20px" color="#0E8AA5" />
        ) : (
          <IoMdHeartEmpty size="20px" color="#0E8AA5" />
        )}
      </div>
      <Link to={`/map/${shopId}`}>
        <div className="text-center py-2 flex flex-col items-center gap-1">
          <p className="font-bold text-sm">{shopName}</p>
          <p className="text-primary text-xs">
            {filteredProducts?.length} items
          </p>
        </div>
      </Link>
    </div>
  );
}
