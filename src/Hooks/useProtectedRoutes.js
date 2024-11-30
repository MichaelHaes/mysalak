import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";

const ProtectedRoutes = () => {
  const token = JSON.parse(localStorage.getItem("JWT_Token"));
  const location = useLocation();

  return token ? (
    <>
      <Outlet />
      {location.pathname.includes("kamera") ? <></> : <Navbar />}
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
