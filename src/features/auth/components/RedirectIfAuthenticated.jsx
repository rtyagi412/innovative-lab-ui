import { useAuthStore } from "@/stores/useAuthStore";
import {
  getPostLoginRedirect,
  removePostLoginRedirect,
} from "@/utils/postLoginRedirects";
import { Navigate } from "react-router-dom";

export const RedirectIfAuthenticated = ({ children, redirectPath }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const redirectTo = redirectPath || getPostLoginRedirect() || "/patient/find";

  if (isAuthenticated) {
    removePostLoginRedirect();
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
