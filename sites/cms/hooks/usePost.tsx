import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const useCreatePost = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "createPost",
    (data) => {
      return axios.post(`http://localhost:8000/api/v1/posts`, data);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["post"]);
        queryClient.invalidateQueries(["userPosts"]);
        onSuccess();
      },
      onError: onError,
    }
  );
};

export const useGetPosts = (page = 1, limit = 10, filter = "undefined") => {
  return useQuery(
    ["posts", page, limit, filter],
    () => {
      return axios.get(
        `http://localhost:8000/api/v1/posts/cms?page=${page}&limit=${limit}&filter=${filter}`
      );
    },
    {
      select: (data) => {
        const posts = data.data.data;
        return posts;
      },
    }
  );
};

export const useGetPost = (postId) => {
  return useQuery(
    "post",
    () => {
      return axios.get(`http://localhost:8000/api/v1/posts/${postId}`);
    },
    {
      enabled: !!postId,
      select: (data) => {
        const post = data.data.data.doc;
        return post;
      },
    }
  );
};

export const useDeletePost = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "deletePost",
    (postId: string) => {
      return axios.delete(`http://localhost:8000/api/v1/posts/${postId}`);
    },
    {
      onError: onError,
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["post"]);
        onSuccess();
      },
    }
  );
};

// export const useUpdatePost = (onSuccess, onError) => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     "updatePost",
//     (data) => {
//       return axios.patch(
//         `http://localhost:8000/api/v1/posts/${data.postId}`,
//         data.data
//       );
//     },
//     {
//       onError: onError,
//       onSuccess: (data) => {
//         queryClient.invalidateQueries(["posts"]);
//         queryClient.invalidateQueries(["post"]);
//         onSuccess();
//       },
//     }
//   );
// };

export const useGetUsersByBookmark = (postId) => {
  return useQuery(
    "usersByBookmark",
    () => {
      return axios.get(
        `http://localhost:8000/api/v1/posts/bookmarks/${postId}`
      );
    },
    {
      select: (data) => {
        const users = data.data.data.users;
        return users;
      },
    }
  );
};

export const useGetTotalPosts = () => {
  return useQuery(
    "totalPosts",
    () => {
      return axios.get(`http://localhost:8000/api/v1/posts/total`);
    },
    {
      select: (data) => {
        data;
        const totalPosts = data.data.data.total;
        return totalPosts;
      },
    }
  );
};

export const useGetTotalLikes = () => {
  return useQuery(
    "totalLikes",
    () => {
      return axios.get(`http://localhost:8000/api/v1/posts/totalLikes`);
    },
    {
      select: (data) => {
        data;
        const totalLikes = data.data.data.totalLikes;
        return totalLikes;
      },
    }
  );
};
