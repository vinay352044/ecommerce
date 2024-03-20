import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const Layout = () => {
  const { seller, admin } = useSelector((state) => state.role);
  const navigate = useNavigate();

  useEffect(() => {
    seller
      ? navigate("/seller-dashboard/pendingorders")
      : admin
      ? navigate("/admin")
      : null;
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="min-h-[85vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
