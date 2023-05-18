import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { setPosts } from "../redux/slices";
import { useDispatch } from "react-redux";

export const useGetBestPost = () => {
  return useQuery(
    "bestPost",
    () => {
      return axios.get(
        "https://theblogforeverything-backend-h8fa.vercel.app/api/v1/posts/bestPost"
      );
    },
    {
      select: (data) => {
        const post = data.data.data.doc;
        return post;
      },
    }
  );
};
export const useGetAllPosts = () => {
  const dispatch = useDispatch();
  return useQuery(
    "allPosts",
    () => {
      return axios.get(
        "https://theblogforeverything-backend-h8fa.vercel.app/api/v1/posts?limit=1000"
      );
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      onSuccess: (data) => {
        dispatch(setPosts(data.data.data.docs));
      },
    }
  );
};

export const useGetPost = (postId) => {
  return useQuery(
    "getPost",
    () => {
      return axios.get(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/posts/${postId}`
      );
    },
    {
      select: (data) => {
        const post = data.data.data.doc;
        return post;
      },
    }
  );
};

export const useCreatePost = (onSuccess, onError) => {
  return useMutation(
    "createPost",
    (data) => {
      return axios.post(
        "https://theblogforeverything-backend-h8fa.vercel.app/api/v1/posts",
        data
      );
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useHandlePostLike = (onSuccess, onError) => {
  return useMutation("likePost", (postId) => {
    return axios.patch(
      `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/posts/likes/${postId}`
    );
  });
};

export const useHandleLike = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "addLike",
    (data) => {
      return axios.patch(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/posts/likes/${data.postId}`,
        { userId: data.userId }
      );
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["currentPost"]);
        queryClient.invalidateQueries(["me"]);
        onSuccess();
      },
      onError: onError,
    }
  );
};

export const useTotalPosts = () => {
  return useQuery(
    "totalPosts",
    () => {
      return axios.get(
        "https://theblogforeverything-backend-h8fa.vercel.app/api/v1/posts/total"
      );
    },
    {
      select: (data) => {
        const total = data.data.data.total;
        return total;
      },
    }
  );
};
