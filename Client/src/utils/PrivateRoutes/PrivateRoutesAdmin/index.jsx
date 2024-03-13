import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutesAdmin() {
    const [isAuth , setIsAuth] = useState(true)
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  }

export default PrivateRoutesAdmin
