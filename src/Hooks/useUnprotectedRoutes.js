import { Navigate, Outlet } from "react-router-dom";
import isLoggedIn from "../Hooks/useCheckLoggedIn";

const UnauthorizedRoute = () => {
  const isAuthenticated = isLoggedIn();

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default UnauthorizedRoute;