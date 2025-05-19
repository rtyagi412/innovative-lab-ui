import { useAuthStore } from "@/stores/useAuthStore";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "@/utils/jwtUtils";
import { setPostLoginRedirect } from "@/utils/postLoginRedirects";

const ProtectedRoute = () => {
  console.log("ProtectedRoute hit");
  const accessToken = useAuthStore((state) => state.accessToken);
  const valid = isTokenValid(accessToken);

  if (!valid) {
    setPostLoginRedirect();
    return <Navigate to="/login" replace />;
  }

  // Otherwise render whatever child routes you’ve nested under this guard.
  return <Outlet />;
};

export default ProtectedRoute;
