// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <div className="flex gap-5 h-[calc(100vh-80px)]">
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
}
