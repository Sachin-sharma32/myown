import React, { useEffect, useMemo, useState } from "react";
import { Alert, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { imageBuilder } from "../sanity";
import Link from "next/link";
import { motion } from "framer-motion";
import BookmarkBtn from "../utils/BookmarkBtn";
import styled from "styled-components";
import { setMessage, setSuccessPopup } from "../redux/slices";
import Skeleton from "@mui/material/Skeleton";
import { useGetBestPost } from "../routers/usePost";

const Header = () => {
    const mode = useSelector((state) => state.base.mode);
    const posts = useSelector((state) => state.base.posts);
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false);
    const { data: post } = useGetBestPost();
    post;

    useEffect(() => {
        if (success) {
            dispatch(setSuccessPopup(true));
            dispatch(setMessage("Added To Bookmark"));
        }
    }, [success]);

    let StyledContainer;
    if (post && mode) {
        StyledContainer = styled.div`
            @media only screen and (max-width: 768px) {
                background-image: linear-gradient(
                        90deg,
                        ${mode === "dark"
                                ? "rgba(0, 0, 0, 0.649) 25%,"
                                : "rgba(230, 230, 230, 0.8),"}
                            ${mode === "dark"
                                ? "rgba(0, 0, 0, 0.641) 50%,"
                                : "rgba(230, 230, 230, 0.897) 50%,"}
                            ${mode === "dark"
                                ? "rgba(0, 0, 0, 0.665) 100%"
                                : "rgba(230, 230, 230, 0.831) 100%"}
                    ),
                    url(${post?.image});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            @media only screen and (min-width: 769px) {
                background-image: linear-gradient(
                        90deg,
                        ${mode === "dark"
                                ? "rgba(0, 0, 0, 0.5) 25%,"
                                : "rgba(100 , 100, 100,.6) 0%,"}
                            ${mode === "dark"
                                ? "rgba(0, 0, 0, 0.7) 50%,"
                                : "rgba(250, 250, 250) 75%,"}
                            ${mode === "dark"
                                ? "rgba(0, 0, 0) 100%"
                                : "rgba(250, 250, 250) 100%"}
                    ),
                    url(${post.image});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: end;
            align-items: center;
            border-radius: 40px;
        `;
    }
    return (
        <>
            <header className=" flex justify-center items-center mt-0 pt-8">
                {post ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ x: [200, 0], opacity: 1 }}
                        transition={{ duration: 1 }}
                        className={` w-[80vw] h-[60vh] sm:h-[80vh] flex justify-end items-center shadow-2xl cursor-pointer rounded-[40px] overflow-hidden"`}
                    >
                        <StyledContainer mode={mode}>
                            {post && (
                                <section>
                                    <article className=" sm:w-80 p-4 sm:p-0 w-50 flex flex-col gap-4 sm:gap-10 mr-0 sm:mr-10 cursor-pointer justify-center relative">
                                        <Link
                                            href={`/post/${post._id}`}
                                            className="flex flex-col gap-4 sm:gap-10 "
                                        >
                                            <h1 className=" text-3xl font-bold bg-gradient-to-r from-[#ff7d69] to-blue-700 text-transparent bg-clip-text">
                                                {post.title}
                                            </h1>
                                            <p
                                                className={`${
                                                    mode == "light"
                                                        ? "text-black"
                                                        : "text-white"
                                                }`}
                                            >
                                                {post.summery}
                                            </p>
                                            <figure className="flex gap-4 items-center">
                                                <Avatar
                                                    src={post?.author?.image}
                                                    className=" w-14 h-14"
                                                />
                                                <figcaption>
                                                    <p
                                                        className={`${
                                                            mode == "light"
                                                                ? "text-black"
                                                                : "text-white"
                                                        } relative`}
                                                    >
                                                        {post.author?.name}
                                                        {post.author
                                                            .isVerified ||
                                                            (post.author
                                                                .isAdmin && (
                                                                <img
                                                                    src="/verified.png"
                                                                    alt="verified"
                                                                    className="w-4 absolute top-0 -right-3"
                                                                />
                                                            ))}
                                                    </p>
                                                    <p className=" text-xs">
                                                        {post.author?.work}
                                                    </p>
                                                </figcaption>
                                            </figure>
                                        </Link>
                                        <div
                                            className={`${
                                                mode == "light"
                                                    ? "text-black"
                                                    : "text-white"
                                            } flex justify-end gap-4 text-lg h-7 absolute bottom-4 right-4`}
                                        >
                                            <BookmarkBtn
                                                post={post}
                                                setSuccess={setSuccess}
                                            />
                                        </div>
                                    </article>
                                </section>
                            )}
                        </StyledContainer>
                    </motion.div>
                ) : (
                    <Skeleton
                        variant="rectangular"
                        // width={210}
                        // height={118}
                        className={` w-[80vw] h-[60vh] sm:h-[80vh] bg-[#f8f8f8] flex justify-end items-center shadow-2xl cursor-pointer rounded-[40px] overflow-hidden`}
                    />
                )}
            </header>
        </>
    );
};

export default React.memo(Header);
