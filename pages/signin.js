import Image from "next/image";
import React, { useEffect, useState } from "react";
import Smooth from "../utils/Smooth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useGetCategories, useOauth, useSignin } from "../hooks/content";
import { signIn, useSession } from "next-auth/react";
import {
    Alert,
    Dialog,
    DialogContent,
    Stack,
    DialogTitle,
    DialogActions,
    DialogContentText,
    Button,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";
import Head from "next/head";
import { client } from "../sanity";
import axios from "axios";
import { setErrorPopup, setMessage, setSuccessPopup } from "../redux/slices";
import CloseIcon from "@mui/icons-material/Close";
import { useLogIn } from "../routers/useAuth";
import { useUpdateUser } from "../routers/useUser";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import Layout from "../components/Layout";

const SignIn = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.base.mode);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const categories = useSelector((state) => state.base.categories);
    const user = useSelector((state) => state.base.user);
    const [preferences, setPreferences] = useState([]);

    const onSuccess = (data) => {
        dispatch(setSuccessPopup(true));
        dispatch(setMessage("Signed In successfully"));
        setTimeout(() => {
            if (
                !data.data.data.user.preferences ||
                data.data.data.user.preferences.length === 0
            ) {
                setShowDialog(true);
            } else {
                router.push("/");
            }
        }, 2000);
    };
    const onError = (err) => {
        dispatch(setErrorPopup(true));
        dispatch(setMessage(err.response.data.message));
    };
    const { mutate: login, error: err } = useLogIn(onSuccess, onError);
    const submitHandler = async (e) => {
        e.preventDefault();
        const user = { email, password };
        login(user);
    };

    const onUpdateSuccess = () => {
        router.push("/");
    };

    const { mutate: updateUser } = useUpdateUser(onUpdateSuccess);
    const addPreferences = async () => {
        const userData = { data: { ...user, preferences }, userId: user._id };
        updateUser(userData);
    };

    const { data: session } = useSession();
    useEffect(() => {
        if (session) {
            const data = {
                name: session.user.name,
                email: session.user.email,
                oAuth: true,
            };
            login(data);
        }
    }, [session]);

    const oAuthSignIn = async (provider) => {
        if (provider === "twitter") {
            dispatch(setErrorPopup(true));
            dispatch(setMessage("TWITTER IS NOT FUNCTIONAL CURRENTLY"));
        } else {
            await signIn(provider).then((session) => {});
        }
    };

    return (
        <Layout className="relative">
            <Dialog open={showDialog}>
                <DialogTitle>CHOOSE YOUR PREFERENCES</DialogTitle>
                <DialogContent>
                    <DialogContentText className="flex gap-1 mb-10 flex-wrap">
                        {categories?.map((category, i) => (
                            <div
                                onClick={() => {
                                    if (
                                        preferences.find(
                                            (item) => item._id === category._id
                                        )
                                    ) {
                                        setPreferences(
                                            preferences.filter(
                                                (item) =>
                                                    item._id !== category._id
                                            )
                                        );
                                    } else {
                                        setPreferences([
                                            ...preferences,
                                            { ...category, _key: i },
                                        ]);
                                    }
                                }}
                                key={i}
                                className={`${
                                    preferences.find(
                                        (item) => item._id === category._id
                                    )
                                        ? "bg-[#f8f8f8] text-black"
                                        : "bg-black text-white"
                                } border-2 px-4 rounded-full  py-1 hover:bg-[#f8f8f8] border-black hover:text-black cursor-pointer transition-all duration-300`}
                            >
                                {category?.title}
                            </div>
                        ))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={addPreferences}
                        className=" absolute bottom-4 right-6 bg-gradient-to-r text-white from-[#ff7d69] to-blue-700 px-6 rounded-full active:scale-90 transition-all duration-300"
                    >
                        Save
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
            </Dialog>
            <Head>
                <title>TBFE - Sign In</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/site-light-chopped.jpg"
                />
            </Head>
            <Smooth
                className={`${mode == "light" ? "bg-[#f8f8f8]" : ""}   flex
            justify-center
            items-center
            text-xs
            min-h-screen relative pt-10`}
            >
                <div
                    className={` -translate-y-6 h-fit w-full mx-10 shadow-2xl text-white flex flex-col md:flex-row items-center justify-center rounded-lg md:rounded-3xl overflow-hidden`}
                >
                    <div className="bg-[#e9e9e9] w-full md:w-[40%] h-[20vh] md:h-[100vh] p-4 flex justify-center items-center md:relative">
                        <h1 className="text-[#262626] text-lg font-bold absolute top-2 left-2 sm:top-4 sm:left-4 hidden sm:flex">
                            Welcome!
                        </h1>
                        <h1 className="text-5xl">TBFE</h1>
                        <Link
                            href="/register"
                            className={`text-[#262626] flex gap-1 hover:gap-2 justify-center items-center self-end transition-all duration-200 absolute bottom-4 left-4`}
                        >
                            <p>
                                Not registered yet ?{" "}
                                <span className="font-bold">Register</span>
                            </p>
                            <EastIcon className="text-xs" />
                        </Link>
                    </div>
                    <div className="flex-col gap-4 items-center justify-center bg-[#f8f8f8] px-4 w-[100%] md:w-[60%] md:h-[100vh] md:mb-0 pb-20">
                        <form
                            onSubmit={submitHandler}
                            className="flex flex-col  gap-4 items-center justify-center md:px-10 mt-4 md:mt-20"
                        >
                            <h1 className=" w-full text-3xl text-left b font-bold bg-gradient-to-r text-[#262626]">
                                Sign in
                            </h1>
                            <div className="flex flex-col gap-4 items-center w-full">
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    placeholder="Email"
                                    className=" bg-[#f8f8f8] w-full h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                <input
                                    type="password"
                                    name=""
                                    id=""
                                    placeholder="Password"
                                    className=" bg-[#f8f8f8] w-full  h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className={`
                                                         border-black text-black hover:bg-black hover:text-white
                                                 border w-full px-4 py-2 rounded-2xl  transition-all duration-200 h-14 text-xl valid:active:scale-90 disabled:bg-[#e8e8e8] disabled:text-white disabled:border-[#e8e8e8]`}
                                >
                                    SIGN IN
                                </button>
                                <div className="flex justify-between w-full">
                                    <Link
                                        href="/forgotPassword"
                                        className={`text-[#262626] flex gap-1 hover:gap-2 justify-center items-center self-end transition-all duration-200`}
                                    >
                                        <p>FORGOT PASSWORD</p>
                                        <EastIcon className="text-xs" />
                                    </Link>
                                </div>
                            </div>
                        </form>
                        <div className={`text-black mt-5 text-center`}>OR</div>2
                        <div className=" mt-6 items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-center px-10 w-[100%]">
                            <div
                                onClick={() => {
                                    oAuthSignIn("google");
                                }}
                                className="flex px-4 border border-[#262626] hover:bg-black hover:text-white py-1 gap-2 rounded-2xl  justify-center items-center bg-[#f8f8f8] text-black cursor-pointer active:scale-95 transition-all duration-200"
                            >
                                <GoogleIcon />
                                <p>GOOGLE</p>
                            </div>
                            <div
                                onClick={() => {
                                    oAuthSignIn("facebook");
                                }}
                                className="flex px-4 py-1 gap-2 rounded-2xl justify-center items-center text-black border border-[#262626]  cursor-pointer hover:bg-[#262626] hover:text-white active:scale-95 transition-all duration-200"
                            >
                                <FacebookIcon />
                                <p>FACEBOOK</p>
                            </div>
                            <div
                                onClick={() => {
                                    oAuthSignIn("github");
                                }}
                                className=" flex px-4 py-1 gap-2 rounded-2xl justify-center items-center text-black border border-[#262626]  hover:bg-[#262626] hover:text-white cursor-pointer active:scale-95 transition-all duration-200"
                            >
                                <GitHubIcon />
                                <p>GITHUB</p>
                            </div>
                            <div
                                onClick={() => {
                                    oAuthSignIn("twitter");
                                }}
                                className="flex px-4 py-1 gap-2 rounded-2xl justify-center items-center text-black border border-[#262626]  cursor-pointer hover:bg-[#262626] hover:text-white  active:scale-95 transition-all duration-200"
                            >
                                <TwitterIcon />
                                <p>TWITTER</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Smooth>
        </Layout>
    );
};

export default SignIn;

SignIn.getInitialProps = async (context) => {
    return {
        title: "Sign In | TBFE",
        image: "/site-light-chopped.jpg",
        summery:
            "Sign In to TEFE to get access to all the features of the site",
        keywords:
            "register, sign in, sign up, login, tefe, tech, tech blog, tech blog for everyone",
        type: "website",
        imageAlt: "The Blog For Everything log",
        parameter: "signin",
    };
};
