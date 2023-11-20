import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useGetPosts } from "../hooks/content";
import { setLiked, setPosts } from "../redux/slices";
import { Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useHandleLike } from "../routers/usePost";
import { useGetPost } from "../routers/usePost";

const Like = ({ post, setSuccess }) => {
    const router = useRouter();
    const [like, setLike] = useState(true);
    const mode = useSelector((state) => state.base.mode);
    const user = useSelector((state) => state.base.user);
    const likes = useSelector((state) => state.base.likes);
    const [count, setCount] = useState(post.likes.length);
    const dispatch = useDispatch();
    // const { data: currentPost } = useGetPost(post?._id);
    useEffect(() => {
        if (user && post) {
            likes?.map((like) => {
                if (like._id === post._id) {
                    setLike(false);
                }
            });
        }
    }, [user, likes]);

    const onSuccess = () => {
        // setLike((current) => !current);
    };
    const onError = () => {};
    const { mutate: toggleLike } = useHandleLike(onSuccess, onError);
    const handleLike = () => {
        if (user) {
            if (like) {
                dispatch(setLiked([...likes, post]));
                setCount(count + 1);
                setLike(false);
            } else {
                ("hello");
                dispatch(
                    setLiked(likes.filter((like) => like._id !== post._id))
                );
                setCount(count - 1);
                setLike(true);
            }
            toggleLike({
                postId: post._id,
                userId: user._id,
            });
        } else {
            router.push("/signin");
        }
    };
    return (
        <div
            className={`${
                mode == "dark" ? "text-white" : "text-black"
            } hover:scale-125 transition-all duration-200`}
        >
            <div onClick={handleLike}>
                <Tooltip title="Like" placement="bottom">
                    {like ? (
                        <a className="cursor-pointer">
                            <FavoriteBorderIcon />
                        </a>
                    ) : (
                        <div className="cursor-pointer ">
                            <FavoriteIcon className=" text-red-500" />
                        </div>
                    )}
                </Tooltip>
                {post?.likes ? (
                    <p
                        className={`${
                            mode === "dark"
                                ? "bg-[#f8f8f8] text-black"
                                : "bg-black text-white"
                        } absolute top-0 -right-0 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full text-xs flex items-center justify-center`}
                    >
                        {count}
                    </p>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Like;
