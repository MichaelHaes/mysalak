import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
    const token = JSON.parse(localStorage.getItem('JWT_Token'));

    return token ?
      <Outlet />
      :
      <Navigate to="/" />;
}

export default ProtectedRoutes;