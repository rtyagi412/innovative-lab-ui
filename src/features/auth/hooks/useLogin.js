import { useAuthStore } from "@/stores/useAuthStore";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getExpFromToken, getUserIdFromToken } from "@/utils/jwtUtils";

const userlogin = async ({ username, password }) => {
  if (!username || !password) {
    throw new Error("Username and password are required.");
  }

  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });

  return response;
};

export const useLogin = () => {
  const setLogin = useAuthStore((state) => state.setLogin);

  const mutation = useMutation({
    mutationFn: userlogin,
    onSuccess: (response) => {
      setLogin({
        accessToken: response.data.accessToken,
        user: getUserIdFromToken(response.data.accessToken),
        tokenExpiry: getExpFromToken(response.data.accessToken),
      });
    },
    onError: (error) => console.log(error),
  });

  return {
    login: mutation.mutate, // call this on form submit
    loginAsync: mutation.mutateAsync, // for async/await
    ...mutation, // isLoading, isError, error, isSuccess, etc.
  };
};
