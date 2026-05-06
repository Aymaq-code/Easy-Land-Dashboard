import { Navigate, Outlet } from "react-router-dom";
import { isUserAuthenticated } from "./useAuth";

function ProtectedRoutes() {
  const isAuth = isUserAuthenticated();

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
