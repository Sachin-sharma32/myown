import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices";

export const useGetAuthors = (
  page?: number,
  limit?: number,
  filter?: string
) => {
  return useQuery(
    ["allAuthors", page, limit, filter],
    () => {
      return axios.get(
        `http://localhost:8000/api/v1/users/admins/cms?page=${page}&limit=${limit}&filter=${filter}`
      );
    },
    {
      select: (data) => {
        const users = data.data.data.docs;
        const authors = users.filter((user) => user.isAdmin);
        const total = data.data.data.total;
        return { users: authors, total };
      },
    }
  );
};

export const useGetUsers = (page, limit, filter) => {
  return useQuery(
    ["allUsers", page, limit, filter],
    () => {
      return axios.get(
        `http://localhost:8000/api/v1/users/cms?page=${page}&limit=${limit}&filter=${filter}`
      );
    },
    {
      select: (data) => {
        const users = data.data.data.docs.filter((user) => !user.isAdmin);
        const total = data.data.data.total;
        return { users, total };
      },
    }
  );
};

export const useGetUser = (onSuccess, onError) => {
  return useQuery(
    "user",
    (userId) => {
      return axios.get(`http://localhost:8000/api/v1/users/${userId}`);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useDeleteUser = (onSuccess?: () => void, onError?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    "deleteUser",
    (userId: string | string[]) => {
      return axios.delete(`http://localhost:8000/api/v1/users/${userId}`);
    },
    {
      onError: onError,
      onSuccess: (data) => {
        queryClient.invalidateQueries(["allUsers"]);
        queryClient.invalidateQueries(["allAuthors"]);
        queryClient.invalidateQueries(["user"]);
        onSuccess();
      },
    }
  );
};

export const useUserPosts = (userId) => {
  return useQuery(
    "userPosts",
    () => {
      return axios.get(`http://localhost:8000/api/v1/users/posts/${userId}`);
    },
    {
      select: (data) => {
        data;
        const posts = data.data.data.docs;
        return posts;
      },
    }
  );
};

// export const useUpdateUser = (onSuccess, onError) => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     "updateUser",
//     (data) => {
//       data;
//       return axios.patch(
//         `http://localhost:8000/api/v1/users/${data.userId}`,
//         data.data
//       );
//     },
//     {
//       onError: onError,
//       onSuccess: (data) => {
//         queryClient.invalidateQueries(["allUsers"]);
//         queryClient.invalidateQueries(["allAuthors"]);
//         queryClient.invalidateQueries(["user"]);
//         onSuccess();
//       },
//     }
//   );
// };

interface Success {
  (): void;
}

export const useGetMe = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return useQuery(
    "me",
    () => {
      return axios.get(`http://localhost:8000/getMe`);
    },
    {
      select: (data) => {
        const user = data.data.data.user;
        return user;
      },
      onSuccess: (data) => {
        console.log(data);
        dispatch(setUser(data));
      },
      onError: (error) => {
        // router.push("/");
        error;
      },
    }
  );
};

export const useGetAllBookmarks = (userId) => {
  return useQuery(
    "allBookmarks",
    () => {
      return axios.get(
        `http://localhost:8000/api/v1/users/bookmarks/${userId}`
      );
    },
    {
      select: (data) => {
        const bookmarks = data.data.data.bookmarks;
        return bookmarks;
      },
    }
  );
};

export const useUserLikes = (userId) => {
  return useQuery(
    "userLikes",
    () => {
      return axios.get(
        `http://localhost:8000/api/v1/users/userLikes/${userId}`
      );
    },
    {
      select: (data) => {
        const likes = data.data.data.posts;
        return likes;
      },
    }
  );
};

export const useGetTotalUsers = () => {
  return useQuery(
    "totalUsers",
    () => {
      return axios.get(`http://localhost:8000/api/v1/users/total`);
    },
    {
      select: (data) => {
        const total = data.data.data.totalUsers;
        return total;
      },
    }
  );
};

export const useGetTotalBookmarks = () => {
  return useQuery(
    "totalBookmarks",
    () => {
      return axios.get(`http://localhost:8000/api/v1/users/totalBookmarks`);
    },
    {
      select: (data) => {
        data;
        const total = data.data.data.totalBookmarks;
        return total;
      },
    }
  );
};
