import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export default function PrivateRouteSeller({ children }) {
  const isAuthenticated = Cookies.get("sellerID");

  if (!isAuthenticated) {
    toast.error("Please Log in with your seller account to continue");
    return <Navigate to="/" replace />;
  }

  return children;
}
