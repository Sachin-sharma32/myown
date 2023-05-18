// import React from "react";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// import ErrorBoundry from "../utils/ErrorBoundry";

// const TopCategories = () => {
//     const mode = useSelector((state) => state.base.mode);
//     const posts = useSelector((state) => state.base.posts);
//     let recommended = new Set();
//     posts.forEach((post) => {
//         if (post?.category?.recommended) {
//             recommended.add(post.category.title);
//         }
//         post?.tags?.map((item) => {
//             if (item.recommended) {
//                 recommended.add(item.title);
//             }
//         });
//     });
//     recommended = Array.from(recommended);

//     //? css -> "contain: paint" alternative of overflow-x-hidden, coz overflow-hidden doesn't allow sticky

//     return (
//         <section
//             className={`${
//                 mode == "dark"
//                     ? "bg-[#262626] shadow-2xl shadow-black"
//                     : "bg-[#f8f8f8] shadow-2xl"
//             } top-categories-box duration-500 gap-4 md:w-[50%] lg:w-[30%] mb-20  mt-28 justify-center items-center flex h-fit mx-6 flex-col p-10 md:p-4 rounded-2xl md:sticky top-16`}
//         >
//             <h4 className="font-bold text-xl bg-gradient-to-r from-[#ff7d69] to-blue-700 text-transparent bg-clip-text">
//                 RECOMMENDED
//             </h4>
//             <div className=" flex flex-wrap gap-4 text-xs justify-center ">
//                 {recommended?.map((item, i) => (
//                     <ErrorBoundry key={i}>
//                         <Link href={`/search/${item}`}>
//                             <div
//                                 key={i}
//                                 className={`${
//                                     mode == "dark"
//                                         ? "bg-gray-200 text-black"
//                                         : "bg-gray-800 text-white"
//                                 } hover:scale-110 active:scale-100 translate-all duration-200 px-4 rounded-2xl cursor-pointer h-6 items-center flex`}
//                             >
//                                 {item}
//                             </div>
//                         </Link>
//                     </ErrorBoundry>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default TopCategories;

import { Alert } from "@mui/material";
import { ErrorBoundary } from "@sanity/ui";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TopCard from "./TopCard";
import TopCategory from "./TopCategory";
import Skeleton from "@mui/material/Skeleton";

const TopCategories = () => {
    const categories = useSelector((state) => state.base.categories);
    const mode = useSelector((state) => state.base.mode);
    return (
        <div className=" mt-10 flex justify-center flex-col p-2 md:p-10 md:gap-4 relative">
            <h2 className=" bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent text-xl font-bold text-center md:hidden">
                TOP CATEGORIES
            </h2>
            {categories.length > 0 ? (
                <section
                    className={` ${
                        mode === "light" && "hor-scroll-light"
                    } flex overflow-x-scroll p-2 gap-4 h-96 items-center`}
                >
                    <section className="card flex-col justify-center font-extrabold p-10 rounded-2xl text-white min-w-[200px] md:min-w-[300px] h-80 hidden md:flex">
                        <div className="bg-gradient-to-b card__side card__side--front rounded-2xl flex justify-center items-center from-[#ff7d69] to-blue-700 h-full w-full">
                            <h3 className="text-2xl ">TOP CATEGORIES</h3>
                        </div>
                        <div className="bg-gradient-to-b card__side card__side--back rounded-2xl flex justify-center items-center from-[#ff7d69] to-blue-700 h-full w-full">
                            <Link href="/search" className="text-2xl ">
                                ALL POSTS
                            </Link>
                        </div>
                    </section>
                    <section className="flex gap-4 md:gap-2">
                        {categories.map(
                            (category, i) =>
                                category.title &&
                                category.image && (
                                    <ErrorBoundary key={i}>
                                        <TopCategory
                                            num={i}
                                            category={category}
                                        />
                                    </ErrorBoundary>
                                )
                        )}
                    </section>
                </section>
            ) : (
                <Skeleton className="flex-col justify-center font-extrabold rounded-2xl min-w-[200px] md:min-w-[300px] h-96 md:flex bg-[#f8f8f8] shadow-2xl" />
            )}
        </div>
    );
};

export default React.memo(TopCategories);
