// import { Alert } from "@mui/material";
// import Link from "next/link";
// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import TopCard from "./TopCard";

// const TopPosts = () => {
//     const posts = useSelector((state) => state.base.posts);
//     const topPosts = posts.filter((post) => {
//         return post.topPostOfTheWeek;
//     });
//     topPosts.sort(
//         (a, b) =>
//             new Date(b.updatedAt ? b.updatedAt : b.publishedAt).getTime() -
//             new Date(a.updatedAt ? a.updatedAt : a.publishedAt).getTime()
//     );
//     const [bookmarkSuccess, setBookmarkSuccess] = useState(false);
//     const [likeSuccess, setLikeSuccess] = useState(false);
//     useEffect(() => {
//         if (bookmarkSuccess) {
//             setTimeout(() => {
//                 setBookmarkSuccess(false);
//             }, 5000);
//         }
//         if (likeSuccess) {
//             setTimeout(() => {
//                 setLikeSuccess(false);
//             }, 5000);
//         }
//     }, [bookmarkSuccess, likeSuccess]);
//     return (
//         <div className=" mt-10 flex justify-center flex-col p-2 md:p-10 md:gap-4 relative">
//             <h2 className="bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent text-xl font-bold text-center md:hidden">
//                 TOP POSTS OF THE WEEK
//             </h2>
//             <section className="flex overflow-x-scroll p-2 gap-4 h-96 items-center">
//                 <section className=" flex-col justify-end bg-gradient-to-b from-[#ff7d69] to-blue-700 p-10 rounded-2xl text-white min-w-[200px] md:min-w-[300px] h-80 hidden md:flex">
//                     <h3>TOP POSTS OF THE WEEK</h3>
//                     <h4 className=" text-xs text-gray-200">Sachin Sharma</h4>
//                 </section>
//                 <section className="flex gap-4 md:gap-2">
//                     {topPosts.map((post, i) => (
//                         <TopCard
//                             key={i}
//                             num={i}
//                             post={post}
//                             setBookmarkSuccess={setBookmarkSuccess}
//                             setLikeSuccess={setLikeSuccess}
//                         />
//                     ))}
//                 </section>
//             </section>
//             {likeSuccess && (
//                 <Alert security="success" className="absolute top-10 left-1/2">
//                     <Link href="/like">MY LIKES</Link>
//                 </Alert>
//             )}
//             {bookmarkSuccess && (
//                 <Alert security="success" className="absolute top-24 left-1/2">
//                     <Link href="/bookmark">MY BOOKMARKS</Link>
//                 </Alert>
//             )}
//         </div>
//     );
// };

// export default TopPosts;
