import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutesUser({isUserAuth}) {
  return isUserAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutesUser;
