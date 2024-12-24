import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const RoleBasedRoutes = ({allowed}) => {
  const token = JSON.parse(localStorage.getItem("JWT_Token"));
  const role = JSON.parse(localStorage.getItem("role_id"));

  return token && parseInt(role) === allowed ? (
    <>
      <Outlet />
      <Navbar />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default RoleBasedRoutes;
