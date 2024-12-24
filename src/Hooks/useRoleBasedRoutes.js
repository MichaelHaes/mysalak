import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import RedirectPage from "../Page/RedirectPage";

const RoleBasedRoutes = ({allowed}) => {
  const token = JSON.parse(localStorage.getItem("JWT_Token"));
  const role = JSON.parse(localStorage.getItem("role_id"));

  return token && parseInt(role) === allowed ? (
    <>
      <Outlet />
      <Navbar />
    </>
  ) : (
    <RedirectPage />
    // <Navigate to="/" />
  );
};

export default RoleBasedRoutes;
