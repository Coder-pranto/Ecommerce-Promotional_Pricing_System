import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/customers/Navbar";
import ScrollToTop from "./ScrollToTop";
import Footer from "../../components/customers/Footer";
import { useEffect, useState } from "react";
// for client part
import socketIOClient from "socket.io-client";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function InitialLayoutCustomer() {
  const [currentUser] = useState(Cookies.get("sellerID"));
  const navigate = useNavigate();

  useEffect(() => {
    const socket = socketIOClient(
      "http://localhost:5000/"
    );
    socket.on("newOrder", (data) => {
      if (data.sellerId === currentUser) {
        toast.custom(
          (t) => (
            <div className="bg-white p-4 rounded-lg shadow-lg w-96 mt-12">
              <div className="font-bold text-xl mb-2">
                New order received! 📋
              </div>
              <div className="mb-4">Do you want to take action?</div>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => {
                    navigate("/seller-dashboard/order");
                    toast.dismiss(t.id);
                  }}
                >
                  Ok
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => toast.dismiss(t.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ),
          {
            duration: 1000 * 60,
            icon: "📋",
          }
        );
      }
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <Footer />
      <div className="mx-auto w-[90vw] mt-20">
        <Outlet />
      </div>
    </div>
  );
}


