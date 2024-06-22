import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";

import { useEffect, useState } from "react";
// for client part
import socketIOClient from 'socket.io-client';
import toast from "react-hot-toast";
import Cookies from "js-cookie";


export default function InitialLayout() {

  const [currentUser] = useState(Cookies.get("sellerID"));
  const navigate = useNavigate();

  useEffect(() => {
    const socket = socketIOClient('http://localhost:5000/');
    socket.on('newOrder', (data) => {
      if (data.sellerId === currentUser) {
        toast.custom((t) => (
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mt-8">
          <div className="flex items-center mb-4">
            <img src="/order_received.png" className="w-8 h-8 mr-2" alt="Notification Icon" />
            <div className="font-bold text-xl">New order received! 📋</div>
          </div>
          <div className="mb-4">Do you want to take action?</div>
          <div className="flex justify-between">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={()=> {navigate('/seller-dashboard/order'); toast.dismiss(t.id); }}
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
        ), {
          duration: 1000 * 60,
          icon: '📋',
        });
      }
    });

    return () => {
      socket.disconnect(); 
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="flex">
      <div className="lg:w-[20%]">
        <SideBar />
      </div>
      <div className="lg:w-[80%] xs:w-[100%]">
        <Outlet />
      </div>
    </div>
  );
}
