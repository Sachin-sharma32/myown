import { Avatar } from "@mui/material";
import Link from "next/link";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const RelatedPosts = ({ post }) => {
    const mode = useSelector((state) => state.base.mode);
    const posts = useSelector((state) => state.base.posts);
    // const relatedPosts = useMemo(() => {
    //     return posts
    //         .filter((item) => {
    //             if (item.category) {
    //                 return (
    //                     item.category._id == post.category._id &&
    //                     item._id != post._id
    //                 );
    //             } else {
    //                 return false;
    //             }
    //         })
    //         .splice(0, 2);
    // }, [posts, post]);
    const relatedPosts = posts
        .filter((item) => {
            if (item.category) {
                return (
                    item.category._id == post?.category?._id &&
                    item._id != post._id
                );
            } else {
                return false;
            }
        })
        .splice(0, 2);
    relatedPosts;
    return (
        <div
            className={`${
                mode == "dark"
                    ? "bg-[#262626] text-white"
                    : " bg-[#f8f8f8] text-gray-800"
            }  p-8
            flex
            flex-col
            justify-center
            items-center shadow-xl`}
        >
            <h4 className=" text-xl font-bold bg-gradient-to-r from-[#ff7d69] to-blue-700 text-transparent bg-clip-text">
                RELATED POSTS
            </h4>
            <div className=" mt-4 flex flex-col gap-4">
                {relatedPosts.map((post, i) => (
                    <Link href={`/post/${post._id}`} key={post._id}>
                        <div className=" border-b-2 pb-2">
                            {post.author && (
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Avatar src={`${post?.author?.image}`} />
                                    <p className=" text-xs font-semibold relative">
                                        {post.author?.name}
                                        {post.author.isVerified ||
                                            (post.author.isAdmin && (
                                                <img
                                                    src="/verified.png"
                                                    alt="verifie"
                                                    className="w-4 absolute -top-2 -right-4"
                                                />
                                            ))}
                                    </p>
                                </div>
                            )}
                            <div className="text-xs text-[#eb9586] flex gap-2 mt-2">
                                {post.tags.map((item, i) => (
                                    <div key={i}>
                                        <p>#{item.title}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="font-semibold cursor-pointer text-lg lg:text-xl">
                                {post.title}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default React.memo(RelatedPosts);
