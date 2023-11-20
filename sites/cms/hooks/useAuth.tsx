// @ts-nocheck

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export const useLogIn = (
  onSuccess?: () => void,
  onError?: (error: any) => void
) => {
  const [cookie, setCookie] = useCookies(["jwt"]);
  return useMutation(
    "login",
    (data: { email: string; password: string }) => {
      return axios.post(`http://localhost:8000/api/v1/auth/login`, data);
    },
    {
      select: (data) => {
        const user = data.data.data.user;
        const token = data.data.data.token;
        return { user, token };
      },
      onSuccess: (data) => {
        setCookie("jwt", JSON.stringify(data.data.data.token), {
          path: "/",
          maxAge: 60 * 60 * 24 * 7 * 1000,
          sameSite: true,
        });
        onSuccess();
      },
      onError: onError,
    }
  );
};
export const useLogOut = (onSuccess, onError) => {
  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(
    "logout",
    () => {
      setCookie("jwt", null, {
        path: "/",
        maxAge: 0,
        sameSite: true,
      });
    },
    {
      onSuccess: () => {
        router.push("/");
        queryClient.invalidateQueries("me");
        onSuccess();
      },
      onError: onError,
    }
  );
};
