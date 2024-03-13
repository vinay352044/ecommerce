import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutesSeller({isSellerAuth}) {
  console.log(isSellerAuth);
  return isSellerAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutesSeller;
