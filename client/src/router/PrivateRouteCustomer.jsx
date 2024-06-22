import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRouteCustomer({ children }) {
  const isAuthenticated = Cookies.get("token");
  const location = useLocation();

  if (!isAuthenticated) {
    toast.error("Please Log in to continue");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
