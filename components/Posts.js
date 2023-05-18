import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import ErrorBoundry from "../utils/ErrorBoundry";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Skeleton } from "@mui/material";
import { useTotalPosts } from "../routers/usePost";
import { useInfiniteQuery, useQuery } from "react-query";
import axios from "axios";

// {exact: true}
// setQueryData

const Posts = ({ values }) => {
  let user = useSelector((state) => state.base.user);
  const containerRef = useRef(null);

  const [filter, setFilter] = useState("-updatedAt");
  let filterOptions;
  if (values.title === "FEATURED POSTS" && user?.preferences) {
    filterOptions = [
      { title: "Preferred", value: "" },
      { title: "Newest", value: "-updatedAt" },
      { title: "Oldest", value: "updatedAt" },
    ];
  } else {
    filterOptions = [
      { title: "Newest", value: "-updatedAt" },
      { title: "Oldest", value: "updatedAt" },
    ];
  }
  const mode = useSelector((state) => state.base.mode);

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery(
      ["posts", "infinite", filter, values],
      ({ pageParam = 1 }) => {
        return axios.get(
          `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/posts?page=${pageParam}&limit=12&sort=${filter}&filter=${values.filter}&type=${values.type}`
        );
      },
      {
        getNextPageParam: (_lastPage, pages) => {
          if (pages.length < Math.ceil(pages[0].data.data.total / 12)) {
            return pages.length + 1;
          } else {
            return undefined;
          }
        },
      }
    );

  if (data?.pages[0].data.data.docs.length === 0) {
    return (
      <div className="text-white text-xl">
        No{" "}
        <span className="bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent">
          {values.type ? values.type : "Posts"}
        </span>{" "}
        related to{" "}
        <span className="bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent">
          {values.filter}
        </span>{" "}
        were found{" "}
      </div>
    );
  } else {
    return (
      <section className=" p-10 md:w-[100%] flex flex-col justify-center items-center gap-2 md:gap-10">
        <div>
          <h3
            ref={containerRef}
            className=" text-3xl text-center mb-10 bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent font-bold"
          >
            {values.title}
          </h3>
          <div className="flex gap-4 mb-4 justify-center">
            {filterOptions.map((item, i) => (
              <p
                key={i}
                className={`${
                  filter == item.value ? "border-b border-orange-500" : ""
                }   cursor-pointer ${
                  mode == "dark" ? "text-gray-200" : "text-gray-800"
                }`}
                onClick={() => {
                  setFilter(item.value);
                }}
              >
                {item.title}
              </p>
            ))}
          </div>
        </div>
        <motion.div
          // layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4"
        >
          {data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group.data.data.docs.map((post, index) => (
                <ErrorBoundry key={index}>
                  <Post post={post} />
                </ErrorBoundry>
              ))}
            </Fragment>
          ))}
        </motion.div>
        {(isFetchingNextPage || isLoading) && (
          <div className="columns-1 md:columns-2 lg:columns-3 2xl:columns-4 gap-4">
            {[...Array(12)].map((item, i) => (
              <Skeleton
                className=" h-[200px] bg-[#f2f2f2] w-[350px] rounded-2xl shadow-2xl"
                key={i}
              />
            ))}
          </div>
        )}
        <div>
          <button
            className={`${
              mode == "light" ? "text-white" : "text-black"
            }  transition-all duration-200 min-w-[120px] bg-gradient-to-r disabled:opacity-60 disabled:hover:scale-100 disabled:active:scale-100 from-[#ff7d69] to-blue-700 w-fit self-end rounded-2xl p-2 hover:scale-110 active:scale-100 font-semibold`}
            onClick={fetchNextPage}
            disabled={!hasNextPage}
          >
            Load More
          </button>
        </div>
        {/* <div className="flex gap-2 mt-6 md:mt-0">
                    <a className=" cursor-pointer hover:-translate-x-2 transition-all duration-200">
                        <WestIcon
                            onClick={() => {
                                containerRef.current.scrollIntoView({
                                    behavior: "smooth",
                                });
                                if (page > 1) {
                                    setPage((cur) => cur - 1);
                                } else {
                                    setPage(pages.length);
                                }
                            }}
                        />
                    </a>
                    {pages.map((item, i) => (
                        <div
                            key={i}
                            className={`${
                                page == item && mode == "dark"
                                    ? "bg-[#f8f8f8] text-black"
                                    : ""
                            } ${
                                page == item && mode == "light"
                                    ? "bg-black text-white"
                                    : ""
                            } ${
                                mode == "dark"
                                    ? "border-white text-white"
                                    : "border-black"
                            } hover:scale-110 active:scale-100 transition-all duration-200 w-6 h-6 flex justify-center items-center cursor-pointer border- rounded-full`}
                            onClick={() => {
                                containerRef.current.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setPage(item);
                            }}
                        >
                            {item}
                        </div>
                    ))}
                    <a className=" cursor-pointer hover:translate-x-2 transition-all duration-200">
                        <EastIcon
                            onClick={() => {
                                containerRef.current.scrollIntoView({
                                    behavior: "smooth",
                                });
                                if (page < pages.length) {
                                    setPage((cur) => cur + 1);
                                } else {
                                    setPage(1);
                                }
                            }}
                        />
                    </a>
                </div> */}
      </section>
    );
  }
};

export default React.memo(Posts);
