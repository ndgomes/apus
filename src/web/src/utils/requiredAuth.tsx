import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const RequireAuth: React.FC = () => {
  let { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default RequireAuth;
