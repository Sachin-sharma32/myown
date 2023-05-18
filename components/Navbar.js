import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {
    Avatar,
    Snackbar,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
    setLiked,
    setMode,
    setSession,
    setSuccess,
    setUser,
} from "../redux/slices";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { signOut } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryBox from "./CategoryBox";
import LoginIcon from "@mui/icons-material/Login";
import CheckOutsideClick from "../utils/CheckOutsideClick";
import ErrorBoundry from "../utils/ErrorBoundry";
import CreateIcon from "@mui/icons-material/Create";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import { setErrorPopup, setSuccessPopup } from "../redux/slices";
import { useAllCategories } from "../routers/useCategory";
import { useGetMe } from "../routers/useUser";
import { useGetAllPosts } from "../routers/usePost";
import { useGetAllTags } from "../routers/useTag";

const Navbar = () => {
    const [hasSession, setHasSession] = useState(false);
    const mode = useSelector((state) => state.base.mode);
    const categories = useSelector((state) => state.base.categories);
    const tags = useSelector((state) => state.base.tags);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showCategoryDialog, setShowCategoryDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [showTitleDialog, setShowTitleDialog] = useState(false);

    const options = ["blog", "short", "experience", "information"];

    const dispatch = useDispatch();
    useGetMe();
    const [shown, setShown] = useState(false);

    if (typeof window !== "undefined") {
        document.body.style.backgroundColor = `${
            mode === "light" ? "white" : "#262626"
        }`;
        document.body.style.scrollbarTrackColor = "white";
    }

    const [toggleCategories, setToggleCategories] = useState(false);

    useGetAllTags();
    useAllCategories();
    useGetAllPosts();

    const sideRef = useRef();

    const showSideBar = () => {
        sideRef.current.classList.remove("translate-x-[500px]");
        setShown(true);
    };
    const hideSideBar = () => {
        sideRef.current.classList.add("translate-x-[500px]");
        setShown(false);
    };

    const siteUser = useSelector((state) => state.base.user);

    const session = useSelector((state) => state.base.session);
    const posts = useSelector((state) => state.base.posts);
    const likes = useSelector((state) => state.base.likes);

    useEffect(() => {
        if (session) {
            setHasSession(true);
        }
    }, [session]);
    const [cookie, setCookie] = useCookies(["jwt"]);
    if (siteUser) {
        dispatch(setSession(cookie.jwt));
    }

    const router = useRouter();

    const [search, setSearch] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        router.push(`/search/${search}`);
    };
    let liked = [];
    useEffect(() => {
        if (siteUser) {
            posts.map((post) => {
                post.likes?.map((item) => {
                    if (item._id === siteUser._id) {
                        liked.push(post);
                    }
                });
            });
            dispatch(setLiked(liked));
        }
    }, [posts]);

    useEffect(() => {
        const md = localStorage.getItem("mode");
        if (md === null) {
            dispatch(setMode("dark"));
        } else {
            dispatch(setMode(localStorage.getItem("mode")));
        }
    }, []);

    const handleCreate = () => {
        setShowCategoryDialog(false);
        router.push(
            `/create?type=${selectedOption}&category=${selectedCategory._id}`
        );
    };

    const message = useSelector((state) => state.base.message);
    const error = useSelector((state) => state.base.error);
    const success = useSelector((state) => state.base.success);

    return (
        <nav
            className={` px-2 sm:px-5 py-1 flex text-black justify-between items-center fixed w-full top-0 pt-2 text-xs md:text-base ${
                mode == "light" ? "bg-[#f8f8f8]" : "bg-[#262626]"
            } z-50 gap-2 h-12`}
        >
            <Snackbar
                open={error}
                autoHideDuration={3000}
                onClose={() => {
                    dispatch(setErrorPopup(false));
                }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                className="mt-10"
            >
                <Alert
                    onClose={() => {
                        dispatch(setErrorPopup(false));
                    }}
                    severity="error"
                >
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => {
                    dispatch(setSuccessPopup(false));
                }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                className="mt-10"
            >
                <Alert
                    onClose={() => {
                        dispatch(setSuccessPopup(false));
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
            <Dialog open={showDialog}>
                <DialogTitle>Choose A Type</DialogTitle>
                <DialogContent>
                    <DialogContentText className="flex gap-1 mb-10 flex-wrap">
                        {options?.map((option, i) => (
                            <div
                                onClick={() => {
                                    if (selectedOption == option) {
                                        setSelectedOption("");
                                    } else {
                                        setSelectedOption(option);
                                    }
                                }}
                                key={i}
                                className={`${
                                    selectedOption == option
                                        ? "bg-[#f8f8f8] text-black"
                                        : "bg-black text-white"
                                } border-2 px-4 rounded-full  py-1 hover:bg-[#f8f8f8] border-black hover:text-black cursor-pointer transition-all duration-300`}
                            >
                                {option}
                            </div>
                        ))}
                    </DialogContentText>
                    <DialogActions>
                        <button
                            disabled={!selectedOption}
                            onClick={() => {
                                setShowDialog(false);
                                setShowCategoryDialog(true);
                            }}
                            className=" bg-gradient-to-r text-white from-[#ff7d69] to-blue-700 px-6 rounded-full active:scale-90 transition-all duration-300"
                        >
                            Next
                        </button>
                        <button
                            className=" absolute top-4 right-4"
                            onClick={() => {
                                setShowDialog(false);
                            }}
                        >
                            <CloseIcon />
                        </button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Dialog open={showCategoryDialog}>
                <DialogTitle>Choose A Category</DialogTitle>
                <DialogContent>
                    <DialogContentText className="flex gap-1 mb-10 flex-wrap">
                        {categories?.map((category, i) => (
                            <div
                                onClick={() => {
                                    if (selectedCategory._id == category._id) {
                                        setSelectedCategory(null);
                                    } else {
                                        setSelectedCategory(category);
                                    }
                                }}
                                key={i}
                                className={`${
                                    selectedCategory?._id == category._id
                                        ? "bg-[#f8f8f8] text-black"
                                        : "bg-black text-white"
                                } border-2 px-4 text-xs rounded-full w-fit  py-1 hover:bg-[#f8f8f8] border-black hover:text-black cursor-pointer transition-all duration-300`}
                            >
                                {category?.title}
                            </div>
                        ))}
                    </DialogContentText>
                    <DialogActions>
                        <button
                            disabled={!selectedCategory}
                            onClick={handleCreate}
                            className=" absolute bottom-4 right-6 bg-gradient-to-r text-white from-[#ff7d69] to-blue-700 px-6 rounded-full active:scale-90 transition-all duration-300"
                        >
                            Next
                        </button>
                        <button
                            className=" absolute top-4 right-4"
                            onClick={() => {
                                setShowCategoryDialog(false);
                            }}
                        >
                            <CloseIcon />
                        </button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <div className="flex gap-4 items-center">
                <Link href="/">
                    {mode == "dark" ? (
                        <Image
                            src="/site-chopped-dark.jpg"
                            width="100"
                            height="20"
                            alt="Website Logo"
                        />
                    ) : (
                        <Image
                            src="/site-chopped-light.jpg"
                            width="100"
                            height="20"
                            alt="Website Logo"
                        />
                    )}
                </Link>
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <form
                        onSubmit={submitHandler}
                        className={`${
                            mode == "dark"
                                ? "bg-gray-500 focus-within:bg-[#f8f8f8] focus-within:shadow-gray-900"
                                : "bg-[#f8f8f8] border focus-within:bg-gray-200"
                        } rounded-2xl pl-3 flex justify-between items-center h-7 px-1 md:pl-4 w-52 sm:w-60 md:w-80 md:focus-within:w-96 transition-scale duration-200 focus-within:shadow-lg text-xs`}
                    >
                        <input
                            type="text"
                            name=""
                            id=""
                            className={`${
                                mode == "dark"
                                    ? " bg-inherit focus-within:bg-inherit"
                                    : " bg-inherit focus-within:bg-inherit"
                            } h-fit outline-none w-full`}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <button
                            type="submit"
                            className=" active:scale-90 transition-all duration-200"
                        >
                            <SearchIcon className=" text-black text-lg sm:text-2xl" />
                        </button>
                    </form>
                </div>
                <CheckOutsideClick setToggleCategories={setToggleCategories}>
                    <section
                        className={`${
                            mode == "dark" ? "text-white" : "text-black"
                        } relative hidden sm:flex`}
                    >
                        <a
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                setToggleCategories((current) => !current);
                            }}
                        >
                            {mode === "dark" ? (
                                <Image
                                    src="/category-light.png"
                                    width="24"
                                    height="24"
                                    className=" hover:rotate-180 transition-all duration-200 active:rotate-180"
                                />
                            ) : (
                                <Image
                                    src="/category-dark.png"
                                    width="24"
                                    height="24"
                                    className=" hover:rotate-180 transition-all duration-200 active:rotate-180"
                                />
                            )}
                            {/* <div className=" hidden sm:flex">
                                {toggleCategories ? (
                                    <ArrowDropUpIcon />
                                ) : (
                                    <ArrowDropDownIcon />
                                )}
                            </div> */}
                        </a>
                        {toggleCategories && (
                            <ErrorBoundry>
                                <CategoryBox
                                    setToggleCategories={setToggleCategories}
                                />
                            </ErrorBoundry>
                        )}
                    </section>
                </CheckOutsideClick>
            </div>
            {siteUser ? (
                <div className=" relative">
                    <div>
                        <button
                            className=" cursor-pointer flex md:hidden"
                            onClick={showSideBar}
                        >
                            <MenuIcon className="mt-[4rem] absolute w-5 text-transparent h-5 -top-16 right-0 z-50" />
                        </button>
                        <CheckOutsideClick handleClose={hideSideBar}>
                            <div
                                ref={sideRef}
                                className=" transition-all duration-200 absolute -top-8 -right-6 min-h-screen mt-[4rem] w-[200px] translate-x-[500px] p-4 flex flex-col gap-4 z-50"
                            >
                                <ul
                                    className={`${
                                        mode == "dark"
                                            ? "bg-[#262626] text-white"
                                            : " bg-[#f8f8f8] text-black"
                                    } shadow-2xl shadow-black flex-col text-sm user-links font-normal z-50`}
                                >
                                    <li className="bg-gradient-to-r from-[#ff7d69] to-blue-700 p-4">
                                        Hi, {siteUser?.name}
                                    </li>
                                    <Link href="/account" onClick={hideSideBar}>
                                        <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                            My Account
                                        </li>
                                    </Link>
                                    <Link
                                        href="/bookmark"
                                        onClick={hideSideBar}
                                    >
                                        <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                            My Bookmarks
                                        </li>
                                    </Link>
                                    <Link href="/myPosts" onClick={hideSideBar}>
                                        <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                            My Posts
                                        </li>
                                    </Link>
                                    <Link href="/like" onClick={hideSideBar}>
                                        <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                            Liked Posts
                                        </li>
                                    </Link>
                                    <Link href="/images" onClick={hideSideBar}>
                                        <li className=" bg-[#ff7d69] hover:bg-gray-200 hover:text-black w-full p-4">
                                            Image Library
                                        </li>
                                    </Link>
                                    {siteUser?.isAdmin && (
                                        <Link
                                            href="https://the-blog-for-everything-cms.vercel.app/"
                                            target="black"
                                            onClick={hideSideBar}
                                        >
                                            <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                                Dashboard
                                            </li>
                                        </Link>
                                    )}
                                    <li
                                        className=" hover:bg-gray-200 hover:text-black w-full p-4 flex flex-col text-center cursor-pointer"
                                        onClick={() => {
                                            setCookie("jwt", "logout", {
                                                path: "/",
                                                maxAge: 0,
                                                sameSite: true,
                                            });
                                            setHasSession(false);
                                            dispatch(setUser(null));
                                            dispatch(setSession(null));
                                            signOut();
                                            router.push("/");
                                        }}
                                    >
                                        <p>LOGOUT</p>
                                    </li>
                                </ul>
                                <button
                                    className=" mt-[4rem] absolute w-8 text-transparent h-8 -top-24 right-6 z-50"
                                    onClick={hideSideBar}
                                >
                                    <MenuIcon className="" />
                                </button>
                            </div>
                        </CheckOutsideClick>
                    </div>
                    <div className=" flex gap-2 sm:gap-4 items-center justify-center">
                        <button
                            className={` ${
                                mode == "light" ? "text-black" : "text-white"
                            } cursor-pointer hover:scale-125 transition-all duration-200 animation-effect flex items-center gap-1`}
                            onClick={() => {
                                setShowDialog(true);
                            }}
                        >
                            {mode === "dark" ? (
                                <img src="/write-light.png" className=" w-6" />
                            ) : (
                                <img src="/write-dark.png" className=" w-6" />
                            )}
                        </button>
                        <Link
                            href="/bookmark"
                            className="relative md:flex hidden"
                        >
                            <button
                                className={` ${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                } cursor-pointer hover:scale-125 transition-all duration-200 animation-effect`}
                            >
                                <BookmarkBorderIcon />
                            </button>
                            <p
                                className={`${
                                    mode == "dark"
                                        ? "bg-[#f8f8f8] text-black"
                                        : "bg-black text-white"
                                } rounded-full p-2 flex justify-center items-center w-5 h-5 absolute -top-2 -right-2`}
                            >
                                {siteUser?.bookmarks?.length}
                            </p>
                        </Link>
                        <Link href="/like" className="relative hidden md:flex">
                            <div
                                className={` ${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                } cursor-pointer hover:scale-125 animation-effect`}
                            >
                                <FavoriteBorderIcon />
                            </div>
                            <p
                                className={`${
                                    mode == "dark"
                                        ? "bg-[#f8f8f8] text-black"
                                        : "bg-black text-white"
                                } absolute -top-2 -right-2 w-5 h-5 rounded-full flex justify-center items-center`}
                            >
                                {likes.length}
                            </p>
                        </Link>
                        <button
                            onClick={() => {
                                mode == "dark"
                                    ? dispatch(setMode("light"))
                                    : dispatch(setMode("dark"));
                            }}
                        >
                            <a
                                className={` ${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                } cursor-pointer hover:scale-125 text-lg sm:text-2xl animation-effect hover:rotate-180 transition-all duration-200`}
                            >
                                <Brightness4Icon className="text-lg sm:text-2xl" />
                            </a>
                        </button>
                        <div className=" relative profile-icon">
                            <div className="">
                                {siteUser?.image?.length > 0 && (
                                    <Avatar
                                        src={`${siteUser?.image}`}
                                        className=" cursor-pointer w-7 h-7 sm:w-10 sm:h-10"
                                        alt="user image"
                                    />
                                )}
                                {!siteUser?.image &&
                                    (mode == "dark" ? (
                                        <Avatar
                                            src="/site-chopped-light.jpg"
                                            className=" cursor-pointer w-7 h-7 sm:w-10 sm:h-10"
                                        />
                                    ) : (
                                        <Avatar
                                            src="/site-chopped-dark.jpg"
                                            className=" cursor-pointer w-7 h-7 sm:w-10 sm:h-10"
                                        />
                                    ))}
                            </div>
                            <ul
                                className={`${
                                    mode === "dark"
                                        ? "bg-[#262626] text-white"
                                        : "bg-[#f8f8f8] text-black"
                                } absolute top-10 -left-36 -translate-x-1/2 shadow-2xl shadow-black flex-col text-sm rounded-2xl overflow-hidden user-links font-normal z-0 hidden drop-down`}
                            >
                                <li className="bg-gradient-to-r from-[#ff7d69] to-blue-700 p-4">
                                    Hi, {siteUser?.name.toUpperCase()}
                                </li>
                                <Link href="/account">
                                    <li className=" hover:bg-gray-200 hover:text-black w-96 p-4">
                                        My Account
                                    </li>
                                </Link>
                                <Link href="/bookmark">
                                    <li className=" hover:bg-gray-200 hover:text-black w-96 p-4">
                                        My Bookmarks
                                    </li>
                                </Link>
                                <Link href="/myPosts">
                                    <li className=" hover:bg-gray-200 hover:text-black w-96 p-4">
                                        My Posts
                                    </li>
                                </Link>
                                <Link href="/like">
                                    <li className=" hover:bg-gray-200 hover:text-black w-96 p-4">
                                        Liked Posts
                                    </li>
                                </Link>
                                <Link href="/images">
                                    <li className=" bg-[#ffb1a4] hover:bg-gray-200 hover:text-black w-96 p-4">
                                        Image Library
                                    </li>
                                </Link>
                                {siteUser?.isAdmin && (
                                    <Link
                                        href="https://the-blog-for-everything-cms.vercel.app/"
                                        target="black"
                                    >
                                        <li className=" hover:bg-gray-200 hover:text-black w-96 p-4">
                                            Dashboard
                                        </li>
                                    </Link>
                                )}
                                <li
                                    className=" hover:bg-gray-200 hover:text-black w-96 p-4 flex flex-col text-center cursor-pointer"
                                    onClick={() => {
                                        setCookie("jwt", "logout", {
                                            path: "/",
                                            maxAge: 0,
                                            sameSite: true,
                                        });
                                        setHasSession(false);
                                        dispatch(setUser(null));
                                        dispatch(setSession(null));
                                        signOut();
                                    }}
                                >
                                    <p>LOGOUT</p>
                                    <p className=" text-xs">
                                        {siteUser?.email}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`${
                        mode == "dark" ? "text-white" : "text-black "
                    } flex gap-1 sm:gap-4 text-xs items-center`}
                >
                    <a
                        onClick={() => {
                            mode == "dark"
                                ? dispatch(setMode("light"))
                                : dispatch(setMode("dark"));
                        }}
                        className={` ${
                            mode == "light" ? "text-black" : "text-white"
                        } cursor-pointer hover:scale-125 animation-effect transition-all duration-200 text-lg sm:text-2xl flex`}
                    >
                        <Brightness4Icon className=" hover:rotate-180 transition-all duration-200" />
                    </a>
                    <div className="hidden md:flex gap-2">
                        <Link
                            href="/signin"
                            className={`${
                                mode == "light"
                                    ? "hover:bg-black hover:text-white hover:border-black"
                                    : "hover:bg-[#f8f8f8] hover:text-black"
                            }  font-bold border-2 px-2 flex items-center w-20 justify-center py-1 rounded-2xl text- active:scale-90 transition-all duration-200`}
                        >
                            SIGN IN
                        </Link>
                        <Link
                            href="/register"
                            className={`${
                                mode == "light"
                                    ? "bg-black text-white hover:bg-[#f8f8f8] hover:text-black border-black"
                                    : "bg-[#f8f8f8] text-black hover:bg-[#262626] hover:text-white"
                            } border-2  flex items-center px-2 py-1 rounded-2xl active:scale-90 transition-all duration-200`}
                        >
                            REGISTER
                        </Link>
                    </div>
                    <Link
                        href="/signin"
                        className={` ${
                            mode == "light" ? "text-black" : "text-white"
                        } cursor-pointer hover:scale-125 transition-all duration-200 md:hidden`}
                    >
                        <LoginIcon />
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
