import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutesSeller() {
  const [isAuth, setIsAuth] = useState(true);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutesSeller;
