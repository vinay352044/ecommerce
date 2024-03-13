import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutesUser() {
  const [isAuth , setIsAuth] = useState(false)
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutesUser;
