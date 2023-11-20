import { useQuery, useMutation } from "react-query";
import axios from "axios";

export const useGetComments = (postId) => {
  return useQuery(
    "comments",
    () => {
      return axios.get(`http://localhost:8000/api/v1/comments/${postId}`);
    },
    {
      enabled: !!postId,
      select: (data) => {
        const comments = data.data.data.docs;
        return comments;
      },
    }
  );
};

export const useGetComment = (onSuccess, onError) => {
  return useQuery(
    "comment",
    (commentId) => {
      return axios.get(`http://localhost:8000/api/v1/comments/${commentId}`);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useDeleteComment = (onSuccess, onError) => {
  return useMutation(
    "deleteComment",
    (commentId) => {
      return axios.delete(`http://localhost:8000/api/v1/comments/${commentId}`);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useUpdateComment = (onSuccess, onError) => {
  return useMutation(
    "updatePost",
    (data) => {
      return axios.patch(
        `http://localhost:8000/api/v1/comments/${data.commentId}`,
        data
      );
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useGetTotalComments = () => {
  return useQuery(
    "totalComments",
    () => {
      return axios.get(`http://localhost:8000/api/v1/comments/total`);
    },
    {
      select: (data) => {
        const totalComments = data.data.data.totalComments;
        return totalComments;
      },
    }
  );
};
