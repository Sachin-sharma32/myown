import { useQuery, useMutation } from "react-query";
import axios from "axios";

export const useGetLikes = (onSuccess, onError) => {
  return useQuery(
    "likes",
    () => {
      return axios.get(`http://localhost:8000/api/v1/likes`);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useGetLike = (onSuccess, onError) => {
  return useQuery(
    "like",
    (likeId) => {
      return axios.get(`http://localhost:8000/api/v1/likes/${likeId}`);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useDeleteLike = (onSuccess, onError) => {
  return useMutation(
    "deleteLike",
    (likeId) => {
      return axios.delete(`http://localhost:8000/api/v1/likes/${likeId}`);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useUpdateLike = (onSuccess, onError) => {
  return useMutation(
    "updateLike",
    (data) => {
      return axios.patch(
        `http://localhost:8000/api/v1/likes/${data.likeId}`,
        data
      );
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};
