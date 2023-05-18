import Image from "next/image";
import React, { useEffect, useState } from "react";
import Smooth from "../utils/Smooth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useOauth } from "../hooks/content";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Error from "../utils/Error";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import Head from "next/head";
import { useLogIn, useRegister } from "../routers/useAuth";
import { setErrorPopup, setMessage, setSuccessPopup } from "../redux/slices";
import { useUpdateUser } from "../routers/useUser";
import CloseIcon from "@mui/icons-material/Close";
import Layout from "../components/Layout";

const Register = () => {
    const router = useRouter();
    const mode = useSelector((state) => state.base.mode);
    const categories = useSelector((state) => state.base.categories);
    const user = useSelector((state) => state.base.user);
    const [preferences, setPreferences] = useState([]);
    const [showDialog, setShowDialog] = useState(false);

    const PASSWORD_REGEX =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const EMAIL_REGEX =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validationObject = yup.object({
        name: yup
            .string()
            .required("Required")
            .min(3, "Name should be atleast 3 characters long"),
        email: yup
            .string()
            .matches(EMAIL_REGEX, "INVALID EMAIL")
            .required("Required"),
        password: yup
            .string()
            .matches(PASSWORD_REGEX, "PROVIDE STRONGER PASSWORD")
            .required("Required"),
        passwordConfirm: yup
            .string()
            .required("Required")
            .when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: yup
                    .string()
                    .oneOf([yup.ref("password")], "PASSWORD MISMATCH"),
            }),
    });
    const initialValues = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    };
    const dispatch = useDispatch();
    const onSuccess = () => {
        dispatch(setSuccessPopup(true));
        dispatch(setMessage("A verification link has been sent to your email"));
        setTimeout(() => {
            router.push("/signin");
        }, 2000);
    };
    const onError = (err) => {
        dispatch(setErrorPopup(true));
        dispatch(setMessage(err.response.data.message));
    };
    const { mutate: register } = useRegister(onSuccess, onError);
    const submitHandler = async (values) => {
        const user = {
            name: values.name,
            email: values.email,
            password: values.password,
        };
        register(user);
    };

    const onLogInSuccess = (data) => {
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
    const onLogInError = (err) => {
        dispatch(setErrorPopup(true));
        dispatch(setMessage(err.response.data.message));
    };

    const { data: session } = useSession();
    const { mutate: login } = useLogIn(onLogInSuccess, onLogInError);
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

    const onUpdateSuccess = () => {
        router.push("/");
    };
    const { mutate: updateUser } = useUpdateUser(onUpdateSuccess);
    const addPreferences = async () => {
        const userData = { data: { ...user, preferences }, userId: user._id };
        updateUser(userData);
    };

    const oAuthSignIn = async (provider) => {
        if (provider === "twitter") {
            dispatch(setErrorPopup(true));
            dispatch(setMessage("TWITTER IS NOT FUNCTIONAL CURRENTLY"));
        } else {
            await signIn(provider).then((session) => {});
        }
    };

    return (
        <Layout>
            <div
                className={`${mode == "light" ? "bg-[#f8f8f8]" : ""}   flex
            justify-center
            items-center
            text-xs
            min-h-screen pt-10`}
            >
                <Dialog open={showDialog}>
                    <DialogTitle>CHOOSE YOUR PREFERENCES</DialogTitle>
                    <DialogContent>
                        <DialogContentText className="flex gap-1 mb-10 flex-wrap">
                            {categories?.map((category, i) => (
                                <div
                                    onClick={() => {
                                        if (
                                            preferences.find(
                                                (item) =>
                                                    item._id === category._id
                                            )
                                        ) {
                                            setPreferences(
                                                preferences.filter(
                                                    (item) =>
                                                        item._id !==
                                                        category._id
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
                <div
                    className={` -translate-y-6 h-fit w-full mx-10 shadow-2xl text-white flex flex-col md:flex-row items-center justify-center rounded-lg md:rounded-3xl overflow-hidden`}
                >
                    <div className="bg-[#e9e9e9] w-full md:w-[40%] h-[20vh] md:h-[100vh] p-4 flex justify-center items-center md:relative">
                        <h1 className="text-[#262626] text-lg font-bold absolute top-2 left-2 sm:top-4 sm:left-4 hidden sm:flex">
                            Welcome!
                        </h1>
                        <h1 className="text-5xl">TBFE</h1>
                        <Link
                            href="/signin"
                            className={`text-black
                             flex gap-1 hover:gap-2 justify-center items-center self-end duration-200 transition-all absolute bottom-4 left-4`}
                        >
                            <p>
                                Already a memeber ?{" "}
                                <span className="font-bold ml-2">Sign in</span>
                            </p>
                            <EastIcon className="text-xs" />
                        </Link>
                    </div>
                    <div className="flex-col gap-4 items-center justify-center bg-[#f8f8f8] w-[90%] md:w-[60%] md:h-[100vh] md:mb-0 pb-20">
                        <div className="flex flex-col">
                            <div className="mb-2"></div>
                            <Formik
                                onSubmit={submitHandler}
                                initialValues={initialValues}
                                validationSchema={validationObject}
                                validateOnBlur={true}
                                validateOnChange={true}
                                className="w-[100%]"
                            >
                                {(props) => {
                                    return (
                                        <Form
                                            className="flex flex-col gap-4 items-center justify-center mt-4 md:px-10"
                                            autocomplete="off"
                                        >
                                            <h3 className=" text-left w-full text-2xl bg-gradient-to-r text-[#262626] font-extrabold">
                                                Register
                                            </h3>
                                            <div className="relative h-12 w-full">
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    className=" bg-[#f8f8f8] w-full h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                                />
                                                <ErrorMessage
                                                    name="name"
                                                    component={Error}
                                                />
                                            </div>
                                            <div className="relative h-12 w-full">
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    placeholder="Email"
                                                    className=" bg-[#f8f8f8]  w-full h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component={Error}
                                                />
                                            </div>
                                            <div className="relative h-12 w-full">
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    className=" bg-[#f8f8f8]  w-full h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component={Error}
                                                />
                                            </div>
                                            <div className="relative h-12 w-full">
                                                <Field
                                                    type="password"
                                                    name="passwordConfirm"
                                                    placeholder="passwordConfirm"
                                                    className=" bg-[#f8f8f8] w-[100%] h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                                />
                                                <ErrorMessage
                                                    name="passwordConfirm"
                                                    component={Error}
                                                />
                                            </div>
                                            <button
                                                disabled={!props.isValid}
                                                type="submit"d
                                                className={`
                                                         border-black text-black hover:bg-black hover:text-white
                                                 border w-[100%] px-4 py-2 rounded-2xl  transition-all duration-200 h-14 text-xl valid:active:scale-90 disabled:bg-[#e8e8e8] disabled:text-white disabled:border-[#e8e8e8]`}
                                            >
                                                REGISTER
                                            </button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
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
            </div>
        </Layout>
    );
};

export default Register;

Register.getInitialProps = async (context) => {
    return {
        title: "Register | TEFE",
        image: "/site-light-chopped.jpg",
        summery:
            "Register to TEFE to get access to all the features of the site",
        keywords:
            "register, sign in, sign up, login, TBFE, tech, tech blog, the blog for everyone",
        type: "website",
        imageAlt: "The Blog For Everything log",
        parameter: "register",
    };
};
