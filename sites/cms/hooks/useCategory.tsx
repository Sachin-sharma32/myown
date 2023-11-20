import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Category } from "../../../utils/types";

export const useCreateCategory = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "createCategory",
    (data: { title: boolean }) => {
      return axios.post(`http://localhost:8000/api/v1/categories`, data);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["getCategories"]);
        queryClient.invalidateQueries(["getCategory"]);
        onSuccess();
      },
      onError: onError,
    }
  );
};

export const useGetCategories = (
  page: number = 1,
  limit: number = 10000,
  filter?: string
) => {
  return useQuery(
    ["getCategories", page, limit, filter],
    () => {
      return axios.get(
        `http://localhost:8000/api/v1/categories?page=${page}&limit=${limit}&filter=${filter}`
      );
    },
    {
      select: (data) => {
        const categories = data.data.data.docs;
        const total = data.data.data.total;
        return { categories, total };
      },
    }
  );
};

export const useGetCategory = (onSuccess, onError) => {
  return useQuery(
    "getCategory",
    (categoryId) => {
      return axios.get(`http://localhost:8000/api/v1/categories/${categoryId}`);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useDeleteCategory = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "deleteCategory",
    (categoryId) => {
      return axios.delete(
        `http://localhost:8000/api/v1/categories/${categoryId}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getCategories"]);
        queryClient.invalidateQueries(["getCategory"]);
        onSuccess();
      },
      onError: onError,
    }
  );
};

// export const useUpdateCategory = (onSuccess, onError) => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     "updateCategory",
//     (data) => {
//       return axios.patch(
//         `http://localhost:8000/api/v1/categories/${data.categoryId}`,
//         data.data
//       );
//     },
//     {
//       onError: onError,
//       onSuccess: () => {
//         queryClient.invalidateQueries(["getCategories"]);
//         queryClient.invalidateQueries(["getCategory"]);
//         onSuccess();
//       },
//     }
//   );
// };

export const useGetPostsByCategory = (categoryId) => {
  return useQuery(
    "getPostsByCategory",
    () => {
      return axios.get(
        `http://localhost:8000/api/v1/categories/posts/${categoryId}`
      );
    },
    {
      select: (data) => {
        const posts = data.data.data.posts;
        return posts;
      },
    }
  );
};

export const useGetTotalCategories = () => {
  return useQuery(
    "getTotalCategories",
    () => {
      return axios.get(`http://localhost:8000/api/v1/categories/total`);
    },
    {
      select: (data) => {
        const total = data.data.data.totalCategories;
        return total;
      },
    }
  );
};
