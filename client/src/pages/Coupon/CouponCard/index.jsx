/* eslint-disable react/prop-types */
export default function CouponCard({ coupons, handleAddProduct }) {
  return (
    <div className="bg-white sm:w-[50%] xs:w-[95%] p-4 sm:ml-6 xs:mx-auto mt-4 rounded-lg">
      <h2 className=" text-lg font-semibold">New Coupon for You !</h2>
      <div>
        {coupons?.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <h1 className="mt-4 text-2xl font-bold text-[#ec4f22] bg-yellow-200 w-[48%] p-5 rounded-lg text-center">
                {item.couponCode}
              </h1>
              <h1 className="mt-4 text-2xl font-bold text-[#ec4f22] bg-yellow-200 w-[48%] p-5 rounded-lg text-center relative">
                {item.discountPercentage}{" "}
                {item.couponType === "percentage" ? "%" : "tk"} {"off"}{" "}
                <span className="text-lg bg-[#ec4f22] text-yellow-200  rounded-full px-[7px] absolute top-2">
                  {item.validityPeriod}
                </span>
              </h1>
            </div>
            <div>
              <button
                type="button"
                className="bg-[#ec4f22] p-2 rounded-md text-white mt-4 hover:bg-orange-700"
                onClick={() => handleAddProduct(item)}
              >
                Add Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
