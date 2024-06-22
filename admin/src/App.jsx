// eslint-disable-next-line no-unused-vars
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/index";
import Discount from "./pages/Discount";
import Advertise from "./pages/Advertise/Advertise";
import AllAdvertise from "./pages/Advertise/AllAdvertise";
import PurchasedAd from "./pages/Advertise/PurchasedAd";
import Category from "./pages/Category/Category";
import SubCategory from "./pages/Subcategory/SubCategory";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Brand from "./pages/Brand/Brand";
import Coupon from "./pages/Coupon/Coupon";
import Seller from "./pages/Seller/Seller";
import Allcategory from "./pages/Category/AllCategory";
import AllSubcategory from "./pages/Subcategory/AllSubcategory";
import AllBrand from "./pages/Brand/AllBrand";
import AllCoupon from "./pages/Coupon/AllCoupon";
import PrivateRoute from "./utils/PrivateRoute";
import SubsubCategory from "./pages/Subsubcategory/SubsubCategory";
import AllSubsubcategory from "./pages/Subsubcategory/AllSubsubcategory";
import Subsubsubcategory from "./pages/Subsubsubcategory/Subsubsubcategory";
import AllSubsubsubcategory from "./pages/Subsubsubcategory/AllSubsubsubcategory";
import Banner from "./pages/Banner/Banner";
import AllBanners from "./pages/Banner/AllBanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<RootLayout />}>
            <Route
              index
              element={
                <div className="w-full text-2xl mt-10 text-center">
                  Admin Dashboard
                </div>
              }
            />
            <Route path="discount" element={<Discount />} />
            <Route path="advertise" element={<Advertise />} />
            <Route path="advertise/allAd" element={<AllAdvertise />} />
            <Route path="advertise/purchasedAd" element={<PurchasedAd />} />
            <Route path="category" element={<Category />} />
            <Route path="category/allcategory" element={<Allcategory />} />
            <Route path="subcategory" element={<SubCategory />} />
            <Route
              path="subcategory/allsubcategory"
              element={<AllSubcategory />}
            />

            <Route path="subsubcategory" element={<SubsubCategory />} />
            <Route
              path="subsubcategory/allsubsubcategory"
              element={<AllSubsubcategory />}
            />

            <Route path="subsubsubcategory" element={<Subsubsubcategory />} />
            <Route
              path="subsubsubcategory/allsubsubsubcategory"
              element={<AllSubsubsubcategory />}
            />

            <Route path="brand" element={<Brand />} />
            <Route path="brand/allbrands" element={<AllBrand />} />
            <Route path="banner" element={<Banner />} />
            <Route path="banner/allbanners" element={<AllBanners />} />
            <Route path="customer" element={<Customer />} />
            <Route path="seller" element={<Seller />} />
            <Route path="coupon" element={<Coupon />} />
            <Route path="coupon/allCoupon" element={<AllCoupon />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
