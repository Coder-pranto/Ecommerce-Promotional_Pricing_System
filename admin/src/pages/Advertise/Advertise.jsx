/* eslint-disable no-unused-vars */
import React from "react";
import AdvertisePackageForm from "./AdvertiseCreationForm";
import { Link, Outlet } from "react-router-dom";

const Advertise = () => {
  return (
    <div className="flex flex-col justify-center mx-auto">
      <div className=" flex justify-between mb-12">
        <h3 className=" text-2xl font-bold">Advertise</h3>
        <div className="flex gap-3">
          <Link
            to="allAd"
            className="w-28 p-2 text-center rounded-md text-white bg-primary"
          >
            All Package
          </Link>
          <Link
            to="purchasedAd"
            className="w-28 p-2 text-center rounded-md text-white bg-primary"
          >
            Purchased
          </Link>
        </div>
      </div>

      <div className="mb-0">
        <AdvertisePackageForm />
      </div>

      <Outlet />
    </div>
  );
};

export default Advertise;
