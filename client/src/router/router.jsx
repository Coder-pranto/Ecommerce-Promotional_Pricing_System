import { createBrowserRouter } from "react-router-dom";
import InitialLayout from "../layout/InitialLayout";
import InitialLayoutCustomer from "../layout/InitialLayoutCustomer";
import NewDiscount from "../pages/NewDiscount.jsx";
import ManageDiscount from "../pages/ManageDiscount/Home";
import Coupon from "../pages/Coupon/Home";
import Advertise from "../pages/Advertise/Home";
import Notfound from "../pages/NotFound/index.jsx";
import NewSellerRegistration from "../pages/NewSellerRegistration/Home/index.jsx";
import Home from "../pages/Customer/Home/index.jsx";
import Login from "../pages/Customer/Login/index.jsx";
import Signup from "../pages/Customer/Signup/index.jsx";
import Category from "../pages/Category/index.jsx";
import SearchResult from "../pages/Category/SearchResult.jsx";
import ProductDetails from "../pages/ProductDetails/index.jsx";
import Map from "../pages/Map/index.jsx";
import Profile from "../pages/Profile/index.jsx";
import ProfileEdit from "../pages/ProfileEdit/index.jsx";
import Order from "../pages/Order/index.jsx";
import Checkout from "../pages/Checkout/index.jsx";
import AllCategoryItems from "../pages/AllCategoryItems/index.jsx";
import AllProducts from "../pages/AllProducts/index.jsx";
import AllShops from "../pages/AllShops/index.jsx";
import PrivateRouteCustomer from "./PrivateRouteCustomer.jsx";
import PrivateRouteSeller from "./PrivateRouteSeller.jsx";
// import Cookies from "js-cookie";
import AllFlashSale from "../pages/AllFlashSale/index.jsx";
import TermsAndConditions from "../pages/TermsConditions/index.jsx";
import Faq from "../pages/FAQ/index.jsx";
import AllBrands from "../pages/AllBrands/index.jsx";

// const isAuthenticated = !!Cookies.get("token");

const routers = createBrowserRouter([
  {
    path: "/",
    element: <InitialLayoutCustomer />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:id/:subId",
        element: <Category />,
      },
      {
        path: "/category/:id/:subId/:subSubId",
        element: <Category />,
      },
      {
        path: "/search",
        element: <SearchResult />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/terms",
        element: <TermsAndConditions />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/map/:id",
        element: (
          <PrivateRouteCustomer>
            <Map />
          </PrivateRouteCustomer>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRouteCustomer>
            <Profile />
          </PrivateRouteCustomer>
        ),
      },
      {
        path: "/profile_edit",
        element: (
          <PrivateRouteCustomer>
            <ProfileEdit />
          </PrivateRouteCustomer>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRouteCustomer>
            <Checkout />
          </PrivateRouteCustomer>
        ),
      },
      {
        path: "/all-category-items/:id",
        element: <AllCategoryItems />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/all-shops",
        element: <AllShops />,
      },
      {
        path: "/flash-sales",
        element: <AllFlashSale />,
      },
      {
        path: "/all-brands",
        element: <AllBrands />,
      },
    ],
  },
  {
    path: "/seller-dashboard",
    element: (
      <PrivateRouteSeller>
        <InitialLayout />
      </PrivateRouteSeller>
    ),
    children: [
      {
        path: "/seller-dashboard",
        element: <ManageDiscount />,
      },
      {
        path: "/seller-dashboard/new-dscount",
        element: <NewDiscount />,
      },
      {
        path: "/seller-dashboard/manage-discount",
        element: <ManageDiscount />,
      },
      {
        path: "/seller-dashboard/coupon",
        element: <Coupon />,
      },
      {
        path: "/seller-dashboard/advertise",
        element: <Advertise />,
      },
      {
        path: "/seller-dashboard/order",
        element: <Order />,
      },
    ],
  },
  {
    path: "/new-seller-registration",
    element: (
      <PrivateRouteCustomer>
        <NewSellerRegistration />
      </PrivateRouteCustomer>
    ),
  },
  {
    path: "/login",
    // element: isAuthenticated ? <Navigate to="/" /> : <Login />,
    element: <Login />,
  },
  {
    path: "/signup",
    // element: isAuthenticated ? <Navigate to="/" /> : <Signup />,
    element: <Signup />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default routers;
