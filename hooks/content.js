import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setPosts, setTags, setUser } from "../redux/slices";
import { client } from "../sanity";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import query from "../queries/getAllPosts";

export const useGetPosts = () => {
    const dispatch = useDispatch();
    return useQuery("posts", () => {
        client.fetch(query).then((data) => {
            dispatch(setPosts(data));
        });
    });
};

export const useSignin = (onSuccess, onError) => {
    const session = useSelector((state) => state.base.session);
    const queryClient = useQueryClient();
    const [cookie, setCookie] = useCookies(["user"]);
    return useMutation(
        "userSignIn",
        (data) => {
            return axios.post("/api/users/signin", data, {
                headers: {
                    authorization: `Bearer ${session}`,
                },
            });
        },
        {
            onSuccess: (data) => {
                data;
                queryClient.invalidateQueries({ queryKey: ["getMe"] });
                if (data.data.cookie) {
                    setCookie("user", JSON.stringify(data.data.cookie), {
                        path: "/",
                        maxAge: 3600,
                        sameSite: true,
                    });
                }
                onSuccess(data);
            },
            onError: onError,
        }
    );
};
export const useRegister = (onSuccess, onError) => {
    const session = useSelector((state) => state.base.session);
    const queryClient = useQueryClient();
    return useMutation(
        "userSignIn",
        (user) => {
            return axios.post("/api/users/register", user);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};

export const useGetMe = () => {
    const session = useSelector((state) => state.base.session);
    const posts = useSelector((state) => state.base.posts);
    const dispatch = useDispatch();
    return useQuery(
        "getMe",
        () => {
            return axios.get("/api/users/getMe", {
                headers: {
                    authorization: `Bearer ${session}`,
                },
            });
        },
        {
            enabled: !!session,
            onSuccess: (data) => {
                dispatch(setUser(data.data.user));
            },
        }
    );
};

export const useUpdateAccount = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(
        "updateAccount",
        (data) => {
            return axios.put("/api/users/updateuser", data);
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries("getMe");
                onSuccess();
            },
            onError: onError,
        }
    );
};

export const useOauth = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["user"]);
    return useMutation(
        "oauth",
        (data) => {
            return axios.post("/api/users/oauth", data);
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries("getMe");
                if (data.data.token) {
                    setCookie("user", JSON.stringify(data.data.token), {
                        path: "/",
                        maxAge: 3600,
                        sameSite: true,
                    });
                }
            },
        }
    );
};

export const useGetCategories = () => {
    const dispatch = useDispatch();
    return useQuery(
        "getCategories",
        () => {
            return axios.post("/api/users/categories");
        },
        {
            onSuccess: (data) => {
                dispatch(setCategories(data.data));
            },
        }
    );
};
export const useGetTags = () => {
    const dispatch = useDispatch();
    return useQuery(
        "getTags",
        () => {
            return axios.get("/api/users/tags");
        },
        {
            onSuccess: (data) => {
                dispatch(setTags(data.data));
            },
        }
    );
};

export const useCreateTag = (onSuccess, onError) => {
    const dispatch = useDispatch();
    return useMutation(
        "createTag",
        (data) => {
            return axios.post("/api/users/tags", data);
        },
        {
            onSuccess: (data) => {
                data;
                dispatch(setTags(data.data));
                onSuccess();
            },
            onError: onError,
        }
    );
};

export const useForgotPassword = (onSuccess, onError) => {
    return useMutation(
        "forgotPassword",
        (data) => {
            return axios.post("/api/users/forgotPassword", data);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};

export const useCreateUserPost = (onSuccess, onError) => {
    return useMutation(
        "createUserPost",
        (data) => {
            return axios.post("/api/users/userPost", data);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};

export const useResetPassword = (onSuccess, onError) => {
    return useMutation(
        "resetPassword",
        (data) => {
            return axios.post("/api/users/resetPassword", data);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};
