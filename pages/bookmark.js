import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Post from "../components/Post";
import ErrorBoundry from "../utils/ErrorBoundry";
import Smooth from "../utils/Smooth";

const Bookmark = () => {
    const mode = useSelector((state) => state.base.mode);
    const user = useSelector((state) => state.base.user);
    const posts = useSelector((state) => state.base.posts);
    let bookmarks = [];
    if (user && posts) {
        bookmarks = posts.filter((post) => {
            return user.bookmarks.find((bookmark) => {
                return bookmark._id == post._id;
            });
        });
    }
    return (
        <Layout>
            <Head>
                <title>TBFE - Bookmarks</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/site-light-chopped.jpg"
                />
            </Head>
            <Smooth
                className={`${
                    mode == "light" ? "bg-[#f8f8f8]" : ""
                } p-10 flex flex-col items-center text-sm text-gray-500 min-h-screen pb-20`}
            >
                <div>
                    <h3 className=" text-3xl text-center mb-10 bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent font-bold">
                        MY BOOKMARKS
                    </h3>
                </div>
                <div className="columns-1 md:columns-2 lg:columns-3 2xl:columns-4 gap-4">
                    {bookmarks?.map((post, i) => (
                        <ErrorBoundry key={i}>
                            <Post post={post} />
                        </ErrorBoundry>
                    ))}
                </div>
                {bookmarks?.length === 0 && (
                    <div className="bg-red-500 text-black p-4 absolute top-40 font-bold">
                        THERE ARE NO BOOKMARKS
                    </div>
                )}
            </Smooth>
        </Layout>
    );
};

export default Bookmark;
