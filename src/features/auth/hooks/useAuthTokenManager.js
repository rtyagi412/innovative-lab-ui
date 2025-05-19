import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../../stores/useAuthStore";
import axiosInstance from "../../../lib/axiosInstance";
import { getExpFromToken, getUserIdFromToken } from "@/utils/jwtUtils";
import { useIdleTimer } from "react-idle-timer";
import {
  IDLE_DEBOUNCE_MS,
  IDLE_LOGOUT_TIMEOUT_MS,
  TOKEN_REFRESH_BUFFER_MS,
} from "@/constants/authConstants";
import {
  getPostLoginRedirect,
  setPostLoginRedirect,
} from "@/utils/postLoginRedirects";
import { useLogout } from "./useLogout";

export const useAuthTokenManager = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const hasRefreshedOnce = useRef(false);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setLogin = useAuthStore((state) => state.setLogin);
  const tokenExpiry = useAuthStore((state) => state.tokenExpiry);
  const logoutIfIdle = useLogout();

  const redirectToLogin = useCallback(() => {
    setPostLoginRedirect();
    console.log("redirectToLogin" + getPostLoginRedirect);
    navigate("/login", { replace: true });
  }, [navigate]);

  //This is a stable function, stable function is a function who's reference remains the same on renders and would
  //not trigger useffect until its dependencies changes
  //refreshAccessTokenIfNeeded depends on setLogin (zustand memoizes the fucn) and navigate (react router guaranteed by react router)
  //hence refreshAccessTokenIfNeeded is a stable function
  const refreshAccessTokenIfNeeded = useCallback(async () => {
    try {
      //if no hasRefreshToken cookie present then take user to login page
      if (!document.cookie.includes("hasRefreshToken=true")) {
        return false;
      }

      //make renewal call and get the token
      const response = await axiosInstance.post(
        "/auth/renewal",
        {},
        { withCredentials: true }
      );

      //ensure the response contains a valid access token
      if (response?.status !== 200 || !response?.data?.accessToken) {
        throw new Error("Invalid response from token renewal");
      }

      //extract and store accessToken, userId, and token expiry
      setLogin({
        accessToken: response.data.accessToken,
        user: getUserIdFromToken(response.data.accessToken),
        tokenExpiry: getExpFromToken(response.data.accessToken),
      });

      //to let caller know if renewal call was successful or not
      return true;
    } catch (error) {
      console.log("Refresh failed", error);
      redirectToLogin();
      return false;
    }
  }, [setLogin, redirectToLogin]);

  useEffect(() => {
    //if access token already available then login to find page and make loading false
    if (accessToken) {
      setLoading(false); // ✅ Just set loading state, no redirect!
      return;
    }

    // prevent running this refresh logic multiple times (on re-renders or strict mode)
    if (hasRefreshedOnce.current) return;
    hasRefreshedOnce.current = true;

    //attempt to run refresh token using refresh token from cookie
    const refresh = async () => {
      setLoading(true);
      try {
        await refreshAccessTokenIfNeeded();
      } finally {
        setLoading(false);
      }
    };

    refresh();
    //it would not run for refreshAccessTokenIfNeeded as it is a stable function. This function runs only once on load
  }, [accessToken, refreshAccessTokenIfNeeded]);

  useEffect(() => {
    //if no access token is available then do not set auto renewal of it, as it doesn't make any sense
    if (!accessToken) return;

    //this is the token expiry from global auth store
    const exp = tokenExpiry;

    //if token expiry is not available or invalid do not refresh token
    if (!exp || isNaN(exp)) {
      console.error("Token has no expiration, skipping auto-refresh");
      return;
    }

    //how long we should wait before we auto refresh token
    const timeout = exp * 1000 - Date.now() - TOKEN_REFRESH_BUFFER_MS;

    //if token is already expired or about to expire auto renew immediatiely
    if (timeout <= 0) {
      refreshAccessTokenIfNeeded();
      return;
    }

    //timer to auto renew token after timeout calculated above
    const refreshAccessTokenTimer = setTimeout(() => {
      refreshAccessTokenIfNeeded();
    }, timeout);

    //clear timer when evert component mounts or any dependency change,it executes then only
    return () => clearTimeout(refreshAccessTokenTimer);
  }, [accessToken, tokenExpiry, refreshAccessTokenIfNeeded]);

  useIdleTimer({
    //user would be considered idle if no activity for below time
    timeout: IDLE_LOGOUT_TIMEOUT_MS,

    //trigger this if user id idle
    onIdle: () => {
      if (!accessToken) return;
      logoutIfIdle();
    },

    //only calls after 500ms even after timeout
    debounce: IDLE_DEBOUNCE_MS,
  });

  return loading;
};
