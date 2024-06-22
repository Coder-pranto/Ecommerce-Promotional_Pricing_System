import { useContext } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoStopwatchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { OrderContext } from "../../../context/OrderContext";

export default function PostCard({ product }) {
  const { discountedPrice } = useContext(OrderContext);

  // days left of discount
  const today = new Date(new Date()).getTime();
  const endDay = new Date(product?.end_datetime).getTime();
  const differenceOfDays = Math.round((endDay - today) / (1000 * 3600 * 24));

  // calculating percentage from fixed value
  const fixedToPercentage = () => {
    const discountPirce = discountedPrice(
      product?.price,
      product?.discount,
      product?.discount_type?.name
    );
    return Math.round(
      ((product?.price - discountPirce) / product?.price) * 100
    );
  };

  // console.log(fixedToPercentage());

  return (
    <div className="w-full h-full flex flex-col justify-between rounded-lg shadow-lg bg-white cursor-pointer">
      <Link to={`/product/${product?._id}`}>
        <div className="relative">
          <img
            className="w-full h-[200px] rounded-t-md object-cover"
            src={product?.image}
            alt="Banner"
          />
          <div className="absolute lg:w-30 xs:w-15 top-0 left-0 mt-3 ml-2 py-1 px-2 bg-primary rounded-lg">
            <div className="flex items-center justify-center gap-1">
              <IoStopwatchOutline size="20px" color="#fff" className="inline" />
              <p className="text-white text-xs inline">
                {differenceOfDays < 0 ? "0" : differenceOfDays} days left
              </p>
            </div>
          </div>

          <div className="absolute w-11 h-11 flex items-center justify-center bottom-0 right-0 mb-2 mr-2 p-2 bg-primary rounded-full">
            <span className="text-white text-center text-xs">
              {product?.discount_type?.name === "fixed"
                ? `${fixedToPercentage()} %`
                : product?.discount_type?.name === "percenatge"
                ? `${product.discount} %`
                : product?.discount_type?.name}
            </span>
          </div>
        </div>

        <div className="lg:px-6 lg:py-1 xs:px-3 xs:py-0.5">
          <div className="font-bold text-sm text-primary lg:mb-2 xs:mb-1">
            {product?.brand_id?.brandName || "Non brand"}
          </div>
          <p className="text-black text-sm lg:mb-1 xs:mb-0.5">
            {product?.product_name}
          </p>
          <span className="font-bold text-sm text-primary">
            Tk{" "}
            {discountedPrice(
              product?.price,
              product?.discount,
              product?.discount_type?.name
            )}
          </span>
          <span className="text-gray-400 text-sm line-through ml-2">
            Tk {product?.price}
          </span>
        </div>
      </Link>
      <div className="lg:px-6 lg:py-1.5 xs:px-3 xs:py-1 xs:text-xs flex justify-between items-center">
        <Link
          to={`/all-category-items/${product?.category_id?.name}`}
          className="inline opacity-65 hover:underline"
        >
          {product?.category_id?.name}
        </Link>
        <div className="flex items-center">
          <CiLocationOn className="inline mr-2" />
          <Link
            to={`/map/${product?.seller_id?._id}`}
            className="inline opacity-65"
          >
            Map
          </Link>
        </div>
      </div>
    </div>
  );
}
