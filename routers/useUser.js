import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/slices";

export const useUpdateUser = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "updateUser",
    (data) => {
      return axios.patch(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/users/${data.userId}`,
        data.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("me");
        onSuccess();
      },
      onError,
    }
  );
};

export const useUserPosts = (userId) => {
  return useQuery(
    "userPosts",
    () => {
      return axios.get(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/users/posts/${userId}`
      );
    },
    {
      enabled: !!userId,
      select: (data) => {
        data;
        const posts = data.data.data.docs;
        return posts;
      },
    }
  );
};

export const useGetMe = (onSuccess, onError) => {
  const dispatch = useDispatch();
  return useQuery(
    "me",
    () => {
      return axios.get(
        `https://theblogforeverything-backend-h8fa.vercel.app/getMe`
      );
    },
    {
      onSuccess: (data) => {
        dispatch(setUser(data.data.data.user));
      },
      onError: onError,
    }
  );
};

export const useGetAllBookmarks = () => {
  return useQuery("allBookmarks", () => {
    return axios.get(
      `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/users/bookmarks/${userId}`
    );
  });
};
export const useGetUserLikes = (userId) => {
  return useQuery("userLikes", () => {
    return axios.get(
      `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/users/userLikes/${userId}`
    );
  });
};

export const useHandleBookmark = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "handleBookmark",
    (data) => {
      return axios.patch(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/users/bookmarks/${data.userId}`,
        { postId: data.postId }
      );
    },
    {
      onSuccess: (data) => {
        // queryClient.invalidateQueries(["bookmarks"]);
        // queryClient.invalidateQueries(["me"]);
        onSuccess();
      },
      onError: onError,
    }
  );
};
