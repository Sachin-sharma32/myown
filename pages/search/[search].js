import Link from "next/link";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import Smooth from "../../utils/Smooth";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import Head from "next/head";
import Social from "../../utils/Socials";
import Layout from "../../components/Layout";
import Posts from "../../components/Posts";
import { useRouter } from "next/router";

const Search = () => {
    const router = useRouter();
    const { search } = router.query;
    const mode = useSelector((state) => state.base.mode);

    return (
        <Layout>
            <div
                className={` flex gap-1 sm:gap-2 px-2 justify-center sm:px-10 text-xs fixed top-[48px] pt-2 w-full sm:pt-2 h-fit z-40 pb-2 ${
                    mode === "dark" ? "bg-[#262626] text-white" : "bg-[#f8f8f8]"
                }`}
            >
                <Link
                    href={`/search/${search}`}
                    className=" active:scale-90 transition-all duration-300  border-2 px-2 rounded-full bg-black text-white border-black"
                >
                    ALL
                </Link>
                <Link
                    href={`/search/blogs/${search}`}
                    className=" active:scale-90 transition-all  duration-300 border-2 px-2 rounded-full hover:bg-black hover:text-white hover:border-black"
                >
                    BLOGS
                </Link>
                <Link
                    href={`/search/shorts/${search}`}
                    className=" active:scale-90 transition-all duration-300 border-2 px-2 rounded-full hover:bg-black hover:text-white hover:border-black"
                >
                    SHORTS
                </Link>
                <Link
                    href={`/search/experiences/${search}`}
                    className=" active:scale-90 transition-all duration-300 border-2 px-2 rounded-full hover:bg-black hover:text-white hover:border-black"
                >
                    EXPERIENCES
                </Link>
                <Link
                    href={`/search/information/${search}`}
                    className=" active:scale-90 transition-all duration-300 border-2 px-2 rounded-full hover:bg-black hover:text-white hover:border-black"
                >
                    INFORMATION
                </Link>
            </div>
            <Head>
                <title>TBFE - {search}</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/site-light-chopped.jpg"
                />
                <meta
                    name="description"
                    content='  A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you&apos;re looking to
                    stay informed, learn something new, or simply be
                    entertained, "The Blog for Everything" has
                    something for everyone.'
                />
                <meta name="keywords" content="blog" />
                <meta property="og:title" content={`TBFE - ${search}`} />
                <meta
                    property="og:description"
                    content=" A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you're looking to
                    stay informed, learn something new, or simply be
                    entertained, 'The Blog for Everything' has
                    something for everyone."
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TheBlogForEverything" />
                <meta property="og:image" content="/site-light-chopped.jpg" />
                <meta
                    property="og:url"
                    content={`https://theblogforeverything.com/search/${search}`}
                />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:site"
                    content="TBFE - The Blog For Everything"
                />
                <meta property="twitter:title" content={`TBFE - ${search}`} />
                <meta
                    property="twitter:description"
                    content="A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you're looking to
                    stay informed, learn something new, or simply be
                    entertained, 'The Blog for Everything' has
                    something for everyone."
                />
                <meta
                    property="twitter:image:src"
                    content="/site-light-chopped.jpg"
                />
                <meta
                    property="og:url"
                    content={`https://theblogforeverything.com/search/${search}`}
                />
            </Head>
            <Smooth
                className={`${
                    mode == "light" ? "bg-[#f8f8f8]" : ""
                } p-10 flex flex-col justify-center items-center text-sm text-gray-500 min-h-screen`}
            >
                <Posts
                    values={{
                        title: `SHOWING RESULTS FOR ${search}`,
                        filter: search,
                        type: "",
                    }}
                />
            </Smooth>
        </Layout>
    );
};

export default Search;
