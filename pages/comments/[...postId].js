import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import LikeCommentIcon from "../../utils/LikeCommentIcon";
import Smooth from "../../utils/Smooth";
import Link from "next/link";
import WestIcon from "@mui/icons-material/West";
import Head from "next/head";
import App from "next/app";
import { useGetComments } from "../../routers/useComment";
import Layout from "../../components/Layout";

const Comments = ({ postId }) => {
    const router = useRouter();
    const { data: comments } = useGetComments(postId);
    const mode = useSelector((state) => state.base.mode);
    if (comments) {
        return (
            <Layout>
                <Head>
                    <title>TBFE - {comments.postId?.title}</title>
                    <link
                        rel="icon"
                        type="image/png"
                        href="/site-light-chopped.jpg"
                    />
                    link
                </Head>
                <Smooth
                    className={`${
                        mode === "light"
                            ? "bg-[#f8f8f8] text-black"
                            : "bg-[#262626] text-gray-400"
                    } min-h-screen flex justify-center p-10 text-xs sm:text-base`}
                >
                    <div className=" w-[100%] sm:w-[80%]">
                        <div className="flex flex-col justify-center items-center text-center">
                            <p>ALL COMMENTS FOR</p>
                            <h1 className="bg-gradient-to-r from-[#ff7d69] to-blue-700 text-transparent bg-clip-text text-2xl font-bold mb-10">
                                {comments.postId?.title}
                            </h1>
                            <Link
                                href={`/post/${comments.postId?._id}`}
                                className={`${
                                    mode == "dark" ? "text-white" : "text-black"
                                } flex gap-2 hover:gap-4 justify-center items-center self-end duration-200 transition-all text-xs`}
                            >
                                <WestIcon />
                                <p>BACK TO POST</p>
                            </Link>
                        </div>
                        {comments?.comments?.map((item, i) => (
                            <div
                                className={`${
                                    mode == "dark"
                                        ? "border-white"
                                        : "border-black"
                                } border-t-[1px] mt-4`}
                                key={i}
                            >
                                <div>
                                    <h5 className=" text-lg sm:text-xl md:text-2xl font-semibold">
                                        {item.name}
                                    </h5>
                                    <p className=" text-xs">
                                        #{" "}
                                        {moment(item.publishedAt).format("ll")}
                                    </p>
                                </div>
                                <div
                                    className={`${
                                        mode == "dark"
                                            ? " text-black bg-[#f8f8f8]"
                                            : " text-white bg-gray-300"
                                    } mt-2  p-4 pr-20 rounded-2xl `}
                                >
                                    <div className="relative">
                                        <p>{item.message}</p>
                                        <div className=" absolute -bottom-4 -right-16 flex gap-6">
                                            <LikeCommentIcon
                                                comments={comments}
                                                comment={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Smooth>
            </Layout>
        );
    }
};

export default Comments;

export async function getServerSideProps(context) {
    const postId = context.params.postId[0];
    return {
        props: { postId },
    };
}
