import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants/authConstants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

//create is a zustand function to create a global store
//persist is a middle where that stores part of store to local or session storage and reloads it on page load
export const useAuthStore = create(
  persist(
    (set) => ({
      //initial auth state
      accessToken: null,
      roles: [],
      isAuthenticated: false,
      user: null,
      tokenExpiry: null,

      //called when access token is refreshed
      setLogin: ({ accessToken, roles, user, tokenExpiry }) => {
        set({
          accessToken,
          roles,
          isAuthenticated: true,
          user: user,
          tokenExpiry: tokenExpiry,
        });
      },

      //called on sign out
      setLogout: () => {
        set({
          accessToken: null,
          roles: [],
          isAuthenticated: false,
          user: null,
          tokenExpiry: null,
        });
      },
    }),
    {
      name: ACCESS_TOKEN_STORAGE_KEY,
      getStorage: () => sessionStorage,
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    }
  )
);
