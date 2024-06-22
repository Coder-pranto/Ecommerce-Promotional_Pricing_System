// eslint-disable-next-line no-unused-vars
import React from "react";
import CouponForm from "./CouponCreationForm";
import { Link } from "react-router-dom";

const Coupon = () => {
  return (
    <div className=" flex flex-col justify-center mx-auto w-2/5">
      <div className="flex justify-between">
        <h3 className=" text-2xl font-bold">Coupon Creation</h3>
        <Link
          to="allCoupon"
          className=" w-32 text-center p-1 bg-primary text-white rounded"
        >
          All Coupons
        </Link>
      </div>
      <div className="flex flex-col p-5 bg-[#FEF4F2] mt-5 border-2 border-gray-200 rounded-lg">
        <CouponForm />
      </div>
    </div>
  );
};

export default Coupon;
