import React, { useEffect, useRef, useState } from "react";
import PagesIcon from "@mui/icons-material/Pages";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import CheckOutsideClick from "./CheckOutsideClick";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useGetMe } from "../hooks/useUser";
import { useLogOut } from "../hooks/useAuth";
import { Alert, Snackbar } from "@mui/material";
import { setError, setSuccess } from "../redux/slices";
import { State } from "../utils/types";

const Navbar = () => {
  useGetMe();
  const recent = [
    {
      name: "Posts",
      url: "/posts",
    },
    {
      name: "Categories",
      url: "/categories",
    },
    {
      name: "Profile",
      url: "/adminAccount",
    },
  ];
  const admins = ["Jason Doe", "Frank Williams", "Ashley Wood"];
  const [search, setSearch] = useState(false);
  const [categories, setCategories] = useState(false);
  const [profile, setProfile] = useState(false);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);
  const profileRef = useRef(null);
  const user = useSelector((state) => state.base.user);
  user;
  const filter = [
    {
      color: "#08d0b9",
      bg: "#08d0b933",
      title: "Posts",
      desc: "Search All Posts",
      url: "/posts",
    },
    {
      color: "#e04e5b",
      bg: "#e04e5b1a",
      title: "Media",
      desc: "See All Image",
      url: "/media",
    },
    {
      color: "#ffc515",
      bg: "#ffc5151a",
      title: "Category",
      desc: "Search All Categories",
      url: "/addCategory",
    },
  ];
  const allCategories = [
    { name: "All Posts", url: "/posts" },
    { name: "Create Post", url: "/addPost" },
    { name: "Categories", url: "/categories" },
    { name: "Media Library", url: "/media" },
    {
      name: "Tags",
      url: "/tags",
    },
    {
      name: "Users",
      url: "/users",
    },
    {
      name: "Admins",
      url: "/admins",
    },
  ];

  const success = useSelector((state: State) => state.base.success);
  const error = useSelector((state: State) => state.base.error);
  const message = useSelector((state: State) => state.base.message);

  const dispatch = useDispatch();

  const { mutate: logOut } = useLogOut();

  return (
    <div className="fixed top-0 w-full  bg-white z-50 ">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(setSuccess(false));
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="mt-10"
      >
        <Alert
          onClose={() => {
            dispatch(setSuccess(false));
          }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(setError(false));
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="mt-10"
      >
        <Alert
          severity="error"
          onClose={() => {
            dispatch(setError(false));
          }}
        >
          {message}
        </Alert>
      </Snackbar>
      <div className="px-10 py-4 bg-white shadow-lg relative flex justify-end font-gilroy4 text-xs">
        <Link
          href={"/posts"}
          className="text-xl cursor-pointer font-bold absolute top-1/2 fbp:left-1/2 fbp:-translate-x-1/2 left-4 -translate-y-1/2"
        >
          <span className="text-[#fd7c69]">THEBLOGFOREVERYTHING</span>
        </Link>
        <div className="flex gap-4 items-center ">
          <div className=" relative">
            <div className="hidden tbp:flex relative">
              <input
                onClick={() => {
                  setSearch(true);
                  setCategories(false);
                  setProfile(false);
                }}
                type="text"
                className=" bg-[#e0e4e8] px-2 text-sm py-1 h-fit outline-none w-52 rounded-md text-base"
                placeholder="Search"
              />
              <SearchIcon className=" absolute top-1/2 -translate-y-1/2 cursor-pointer right-1" />
            </div>
            <CheckOutsideClick setSearch={setSearch}>
              <div
                ref={searchRef}
                className={` bg-white shadow-xl z-50  px-2 py-1 absolute top-12 transition-all duration-300 rounded-lg ${
                  search
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10 pointer-events-none"
                }`}
              >
                <div className="flex flex-col border-b pb-4 gap-3">
                  <p className="px-4">RECENT PAGES</p>
                  <ul className="flex flex-col">
                    {recent.map((item, i) => (
                      <Link
                        key={i}
                        href={item.url}
                        className="flex items-center gap-2 hover:bg-[#e9ecef] px-4 py-2 cursor-pointer"
                        onClick={() => {
                          setSearch(false);
                        }}
                      >
                        <Image
                          alt="page icon"
                          src="/page.png"
                          width={15}
                          height={15}
                        />
                        <p>{item.name}</p>
                      </Link>
                    ))}
                  </ul>
                </div>
                {user && (
                  <div className="flex flex-col border-b py-4 gap-3">
                    <p className="px-4">ADMINS</p>
                    <ul className="flex flex-col">
                      <Link
                        href={"/account"}
                        className="flex items-center gap-2 hover:bg-[#e9ecef] px-4 py-2 cursor-pointer"
                        onClick={() => {
                          setSearch(false);
                        }}
                      >
                        <div className="p-1 rounded-full shadow-md shadow-gray-400 cursor-pointer">
                          <Image
                            src={user?.image}
                            width={100}
                            height={100}
                            className="w-6 h-6 rounded-full"
                            alt={`${user?.name} image`}
                          />
                        </div>
                        <p>{user?.name}</p>
                      </Link>
                    </ul>
                  </div>
                )}
                <div className="flex flex-col pt-4 gap-3">
                  <p className="px-4">FEATURED</p>
                  <ul className="flex flex-col">
                    {filter.map((item) => (
                      <Link
                        href={item.url}
                        className="flex items-center gap-2 hover:bg-[#e9ecef] px-4 py-2 cursor-pointer"
                        onClick={() => {
                          setSearch(false);
                        }}
                      >
                        <div
                          style={{
                            color: `${item.color}`,
                            backgroundColor: `${item?.bg}`,
                          }}
                          className={` px-2 py-1 rounded-lg`}
                        >
                          {item.title}
                        </div>
                        <p>{item.desc}</p>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            </CheckOutsideClick>
          </div>
          <div>
            <div className=" relative">
              <PagesIcon
                className=" text-[#e0e4e8] text-3xl cursor-pointer"
                onClick={() => {
                  setCategories(true);
                  setSearch(false);
                  setProfile(false);
                }}
              />
              <CheckOutsideClick setCategories={setCategories}>
                <div
                  ref={categoryRef}
                  className={` bg-white shadow-xl z-50 min-w-[200px]  px-2 py-1 absolute right-0 top-12 transition-all duration-300 rounded-lg ${
                    categories
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10 pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col pb-4 gap-3">
                    <p className="px-4">ALL PAGES</p>
                    <ul className="flex flex-col">
                      {allCategories.map((item, i) => (
                        <Link
                          key={i}
                          href={`${item.url}`}
                          className="flex items-center gap-2 hover:bg-[#e9ecef] px-4 py-2 cursor-pointer"
                          onClick={() => {
                            setCategories(false);
                          }}
                        >
                          <Image
                            alt="page icons"
                            src="/page.png"
                            width={15}
                            height={15}
                          />
                          <p>{item.name}</p>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              </CheckOutsideClick>
            </div>
          </div>
          {user && (
            <div className="p-1 rounded-full shadow-md shadow-gray-400 cursor-pointer relative">
              <Image
                src={user.image}
                width={100}
                height={100}
                className="w-8 h-8 rounded-full"
                onClick={() => {
                  setCategories(false);
                  setProfile(true);
                  setSearch(false);
                }}
                alt={`${user.name} image`}
              />
              <CheckOutsideClick setProfile={setProfile}>
                <div
                  ref={profileRef}
                  className={` bg-white shadow-xl z-50 min-w-[200px] py-1 absolute right-0 top-12 transition-all duration-300 rounded-lg ${
                    profile
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10 pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col pb-4 gap-3">
                    <div className=" px-4 border-b py-2">
                      <p className=" uppercase text-base font-bold">
                        {user.name}
                      </p>
                      <p>{user.work}</p>
                    </div>
                    <ul className="flex flex-col border-b pb-4">
                      <Link
                        href={"/account"}
                        className="flex items-center gap-2 text-md hover:bg-[#e9ecef] px-4 py-2 cursor-pointer"
                        onClick={() => {
                          setProfile(false);
                        }}
                      >
                        <p>Settings</p>
                      </Link>
                    </ul>
                    <ul className="flex flex-col">
                      <button
                        onClick={() => {
                          logOut();
                        }}
                        className="flex items-center gap-2 text-md hover:bg-[#e9ecef] px-4 py-2 cursor-pointer"
                      >
                        <p>Log Out</p>
                      </button>
                    </ul>
                  </div>
                </div>
              </CheckOutsideClick>
            </div>
          )}
          {!user && (
            <Link className="text-lg font-lobster" href="/">
              LogIn
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
