import Link from "next/link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import RightArrow from "../sites/cms/utils/RightArrow";
import LeftArrow from "../sites/cms/utils/LeftArrow";
import CloseIcon from "../sites/cms/utils/CloseIcon";
import { useGetPosts } from "../sites/cms/hooks/usePost";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../sites/cms/redux/slices";
import { ThreeDots } from "react-loader-spinner";

const Media = () => {
  const filter = useSelector((state) => state.base.filter);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(30);
  let { isLoading, data } = useGetPosts(activePage, 30, filter);
  let totalLength = Math.floor(data?.total / limit) + 1;
  const arr = [];
  for (let i = 1; i <= totalLength; i++) {
    arr.push(i);
  }

  const [num, setNum] = useState(0);
  const [active, setActive] = useState(false);
  return (
    <div className="w-full py-10 px-4 fbp:px-20 flex flex-col gap-20 relative font-gilroy5">
      <div className="flex justify-between">
        <h1 className=" text-2xl sbp:text-4xl font-gilroy4">MEDIA LIBRARY</h1>
        <Link
          href={"/addPost"}
          className="bg-gray-900 hover:bg-black transition-all duration-300 text-white px-3 py-1 rounded-lg flex gap-2 items-center"
        >
          <AddIcon />
          <p>ADD NEW</p>
        </Link>
      </div>
      <div className="w-full bg-white rounded-xl shadow-xl p-8 flex justify-between items-center">
        <div className="flex gap-4 ">
          <select
            name="action"
            title="Action"
            id=""
            className="bg-white border  outline-none border-gray-300 rounded-md py-2 px-4"
          >
            <option value="bulk">All Media Items</option>
            <option value="delete">Images</option>
            <option value="delete">Audio</option>
            <option value="delete">Video</option>
            <option value="delete">Documents</option>
          </select>
          <select
            name="action"
            title="Action"
            id=""
            className="bg-white border hidden sbp:flex outline-none border-gray-300 rounded-md py-2 px-4"
          >
            <option value="bulk">All Media Items</option>
            <option value="delete">Images</option>
            <option value="delete">Audio</option>
            <option value="delete">Video</option>
            <option value="delete">Documents</option>
          </select>
        </div>
        <input
          onChange={(e) => {
            dispatch(setFilter(e.target.value));
          }}
          type="text"
          className=" hidden tbp:flex bg-white border-[1px] border-gray-400 px-2  py-2 h-fit outline-none w-52 rounded-md text-sm"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-wrap justify-center  gap-10 min-h-[500px] relative">
        {data?.docs?.length === 0 && (
          <div className=" absolute flex items-center h-full w-full justify-center">
            No Results Found
          </div>
        )}
        {isLoading && (
          <div className="flex absolute items-center h-full w-full  justify-center">
            <ThreeDots
              height="10"
              width="100"
              radius="2"
              color="#000000"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        )}
        {data?.docs?.map((item, i) => (
          <div
            key={item._id}
            className=" rounded-xl overflow-hidden w-[400px] shadow-lg cursor-pointer"
            onClick={() => {
              setActive(true);
              setNum(i);
            }}
          >
            <Image
              src={item.image}
              width={200}
              className="h-[250px] w-[400px]"
              height={200}
              alt={item.image}
            />
            <p className="p-4">{item.title}</p>
          </div>
        ))}
      </div>
      <div
        className={`fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-90 ${
          active ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-all duration-300`}
      >
        <div className="b-screen overflow-x-hidden relative arrow-container flex w-screen">
          <div
            className=" flex transition-all duration-500"
            style={{ transform: `translateX(calc(-100vw * ${num}))` }}
          >
            {data?.docs?.map((item) => (
              <div
                className=" w-screen h-screen overflow-hidden relative"
                key={item._id}
              >
                <Image
                  src={item.image}
                  width={2500}
                  alt={item.title}
                  height={2500}
                  className={`sbp:w-[50vw] sbp:h-[50vh] w-[90vw] h-[30vh] scale-125 absolute transition-all duration-300 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${
                    active ? "scale-100" : "scale-0"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className=" absolute top-1/2 md:right-10 right-4 -translate-y-1/2 arrow transition-all duration-300 md:scale-[2]">
            <RightArrow max={data?.docs?.length} setNum={setNum} num={num} />
          </div>
          <div className=" absolute top-1/2 md:left-10 left-4 -translate-y-1/2 arrow transition-all duration-300 md:scale-[2]">
            <LeftArrow max={data?.docs?.length} setNum={setNum} num={num} />
          </div>
          <CloseIcon setActive={setActive} />
          <div className=" absolute bottom-10 hidden right-10 fbp:flex gap-2">
            {data?.docs?.map((item, i) => (
              <div
                key={item._id}
                className={` h-[2px] bg-white hover:opacity-100 rounded-3xl ${
                  num === i ? "w-[100px] opacity-100" : "w-[30px] opacity-20"
                } transition-all duration-300 ${
                  num + 1 === i ? "opacity-100" : ""
                }`}
                onClick={() => {
                  setNum(i);
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-10 flex items-center justify-between">
        <p className="hidden md:flex text-[#fb8500]">
          Showing{" "}
          <span className="text-black mr-1 ml-1">
            {10 * activePage - (10 - 1)}
          </span>{" "}
          to{"   "}
          <span className="text-black mr-1 ml-1">
            {10 * activePage - (10 - data?.docs?.length)}
          </span>{" "}
          of <span className="text-black mr-1 ml-1">{data?.total}</span> entries
        </p>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setActivePage((a) => {
                if (a === 1) {
                  return totalLength;
                } else {
                  return a - 1;
                }
              });
            }}
          >
            <ArrowRightIcon className="cursor-pointer w-8 h-8 hover:bg-gray-300 transition-all duration-300 rounded-full rotate-180" />
          </button>
          {totalLength !== 0 &&
            arr?.map((page, i) => (
              <div
                key={page}
                onClick={() => {
                  setActivePage(i + 1);
                }}
                className={`p-2 w-8 flex items-center justify-center rounded-full h-8 text-black cursor-pointer ${
                  activePage === i + 1 ? "bg-gray-300" : ""
                }`}
              >
                {i + 1}
              </div>
            ))}
          <ArrowRightIcon
            onClick={() => {
              setActivePage((a) => {
                if (a === totalLength) {
                  return 1;
                } else {
                  return a + 1;
                }
              });
            }}
            className="cursor-pointer w-8 h-8 hover:bg-gray-300 transition-all duration-300 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Media;

export async function getServerSideProps(context) {
  const subdomain = context.req.headers.host.split(".")[0];
  return {
    props: {
      title: "Sachin Sharma - Media",
      image: "/logo.png",
      summery:
        "Experienced Web and App Developer | Showcase of Expertise in Crafting Innovative Digital Solutions",
      keywords:
        "Web development, app development, software development, front-end development, back-end development, responsive design, user experience (UX), user interface (UI), mobile applications, cross-platform development, JavaScript, HTML5, CSS3, ReactJS, NextJS, API integration, database management, e-commerce solutions, custom web applications, portfolio showcase, digital solutions",
      type: "website",
      imageAlt: "codebysachin.com logo",
      parameter: "media",
      subdomain,
    },
  };
}
