import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function PrivateRoute() {
  const token = Cookies.get("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return token && user.role === "admin" ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" replace />
      {toast.error("Please Login as admin to continue")}
    </>
  );
}
