import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import RedirectPage from "../Page/RedirectPage";

const ProtectedRoutes = () => {
  const token = JSON.parse(localStorage.getItem("JWT_Token"));
  const location = useLocation();

  return token ? (
    <>
      <Outlet />
      {location.pathname.includes("kamera") ? <></> : <Navbar />}
    </>
  ) : (
    <RedirectPage />
  );
};

export default ProtectedRoutes;
