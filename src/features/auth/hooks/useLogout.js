import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/stores/useAuthStore";
import { removePostLoginRedirect } from "@/utils/postLoginRedirects";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const setLogout = useAuthStore((state) => state.setLogout);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.log("Logout failed", error);
    }

    setLogout({ accessToken: null, roles: [], user: null, tokenExpiry: null });
    removePostLoginRedirect();
    navigate("/login", { replace: true });
  };

  return logout;
};
