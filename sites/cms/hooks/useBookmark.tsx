import { useQuery, useMutation } from "react-query";
import axios from "axios";

export const useGetBookmarks = (onSuccess, onError) => {
  return useQuery(
    "bookmarks",
    () => {
      return axios.get(`http://localhost:8000/api/v1/bookmarks`);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useGetBookmark = (onSuccess, onError) => {
  return useQuery(
    "post",
    (bookmarkId) => {
      return axios.get(`http://localhost:8000/api/v1/bookmarks/${bookmarkId}`);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useDeleteBookmark = (onSuccess, onError) => {
  return useMutation(
    "deleteBookmark",
    (bookmarkId) => {
      return axios.delete(
        `http://localhost:8000/api/v1/bookmarks/${bookmarkId}`
      );
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useUpdateBookmark = (onSuccess, onError) => {
  return useMutation(
    "updateBookmark",
    (data) => {
      return axios.patch(
        `http://localhost:8000/api/v1/bookmarks/${data.bookmarkId}`,
        data
      );
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};
