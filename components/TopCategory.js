import { Avatar } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import Like from "../utils/LikeIcon";
import BookmarkBtn from "../utils/BookmarkBtn";
import { imageBuilder } from "../sanity";
import { useRef } from "react";
import { motion } from "framer-motion";

const TopCategory = ({ num, category }) => {
    category;
    const mode = useSelector((state) => state.base.mode);
    const categoryRef = useRef(null);
    const headingRef = useRef(null);
    const showCategoryBox = () => {
        categoryRef.current.classList.remove("sm:hidden");
        headingRef.current.classList.add("sm:hidden");
    };
    const hideCategoryBox = () => {
        headingRef.current.classList.remove("sm:hidden");
        categoryRef.current.classList.add("sm:hidden");
    };
    return (
        <section
            className={` relative p-4 md:hover:rotate-[0deg] flex justify-center shadow-md items-start w-[250px] md:min-w-[300px] h-80 rounded-2xl border-gray-500 border md:border-transparent top-card ${
                num != 0 && " md:-ml-[240px]"
            } ${
                mode == "light"
                    ? " bg-[#f8f8f8] light-shadow"
                    : "bg-[#262626] black-shadow"
            } relative overflow-hidden`}
            onMouseEnter={showCategoryBox}
            onMouseLeave={hideCategoryBox}
        >
            <Link href={`/search/${category.title}`} className="h-full flex">
                <h3
                    ref={headingRef}
                    className="-rotate-90 text-xl hidden sm:flex"
                >
                    {category.title}
                </h3>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className=" flex:hidden sm:hidden  absolute top-0 left-0 h-full w-full"
                    ref={categoryRef}
                >
                    <h3 className=" text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full text-center backdrop-brightness-50">
                        {category.title}
                    </h3>
                    <img
                        src={category.image}
                        alt=""
                        className="h-full w-full"
                    />
                </motion.div>
                {/* <div>
                        <p>{moment(post.updatedAt).format("ll")}</p>
                        <h5
                            className={`${
                                mode == "light" ? "text-black" : "text-white"
                            } text-xl`}
                        >
                            {post.title}
                        </h5>
                        <div className=" text-[#ff7d69] via-[#ff7d69] flex gap-x-4 flex-wrap">
                            {post.tags &&
                                post.tags.map((item, i) => (
                                    <div key={i}>
                                        <p>#{item.title}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className=" flex gap-4">
                        <Avatar src={imageBuilder(post.author.image)} />
                        <div>
                            <p
                                className={`${
                                    mode == "dark" ? "text-white" : "text-black"
                                }`}
                            >
                                {post.author.name}
                            </p>
                            <p className=" text-xs">{post.author.work}</p>
                        </div>
                    </div> */}
            </Link>
        </section>
    );
};

export default TopCategory;
