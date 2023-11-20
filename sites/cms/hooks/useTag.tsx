import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const useCreateTag = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "createTag",
    (data: { title: boolean }) => {
      return axios.post(`http://localhost:8000/api/v1/tags`, data);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["tags"]);
        queryClient.invalidateQueries(["tag"]);
        onSuccess();
      },
      onError: onError,
    }
  );
};

export const useGetTags = (
  page: number = 1,
  limit: number = 10000,
  filter?: string
) => {
  return useQuery(
    ["tags", page, limit, filter],
    () => {
      return axios.get(
        `http://localhost:8000/api/v1/tags/cms?page=${page}&limit=${limit}&filter=${filter}`
      );
    },
    {
      select: (data) => {
        const tags = data.data.data.docs;
        const total = data.data.data.total;
        return { tags, total };
      },
    }
  );
};

export const useGetTag = (onSuccess, onError) => {
  return useQuery(
    "tag",
    (tagId) => {
      return axios.get(`http://localhost:8000/api/v1/tags/${tagId}`);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useDeleteTag = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "deleteTag",
    (tagId) => {
      return axios.delete(`http://localhost:8000/api/v1/tags/${tagId}`);
    },
    {
      onError: onError,
      onSuccess: (data) => {
        queryClient.invalidateQueries(["tags"]);
        queryClient.invalidateQueries(["tag"]);
        onSuccess();
      },
    }
  );
};

// export const useUpdateTag = (onSuccess, onError) => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     "updateTag",
//     (data) => {
//       return axios.patch(
//         `http://localhost:8000/api/v1/tags/${data.tagId}`,
//         data.data
//       );
//     },
//     {
//       onError: onError,
//       onSuccess: (data) => {
//         queryClient.invalidateQueries(["tags"]);
//         queryClient.invalidateQueries(["tag"]);
//         onSuccess();
//       },
//     }
//   );
// };

export const useGetPostsByTag = (tagId) => {
  return useQuery(
    "postsByTag",
    () => {
      return axios.get(`http://localhost:8000/api/v1/tags/posts/${tagId}`);
    },
    {
      select: (data) => {
        const posts = data.data.data.posts;
        return posts;
      },
    }
  );
};

export const useGetTotalTags = () => {
  return useQuery(
    "totalTags",
    () => {
      return axios.get(`http://localhost:8000/api/v1/tags/total`);
    },
    {
      select: (data) => {
        data;
        const total = data.data.data.totalTags;
        return total;
      },
    }
  );
};
