/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { setErrorPopup, setMessage, setSuccessPopup } from "../redux/slices";
import { useUpdateUser } from "../routers/useUser";

const Footer = () => {
    const mode = useSelector((state) => state.base.mode);
    const router = useRouter();
    const user = useSelector((state) => state.base.user);

    const onSuccess = () => {
        setSuccessPopup(true);
        setMessage(
            "You will receive email when a new post related to you favorite topic is posted"
        );
        setTimeout(() => {
            setSuccessPopup(true);
            setMessage("Newsletter has been activated for your account");
        }, 2000);
    };
    const onError = (err) => {
        setErrorPopup(true);
        setMessage(err.response.data.message);
    };
    const { mutate: updateUser } = useUpdateUser(onSuccess, onError);
    const handleSubscription = async () => {
        if (!user) {
            router.push("/signin");
            return;
        }
        const data = {
            newsletter: true,
        };
        updateUser({ data, userId: user._id });
    };
    return (
        <footer
            className={`${
                mode == "light" ? "text-gray-800 bg-[#f8f8f8]" : "text-gray-300"
            }  px-10 text-xs border-gray-500  flex relative lg:flex-row justify-between gap-2  lg:justify-start  bg-gradient-to-r from-[#ff7d69] to-blue-700 items-start flex-col h-[70px] lg:gap-32`}
        >
            <div className="bg-white absolute top-[-85px] lg:-top-[85px] right-4 w-[300px] md:w-[600px] sm:w-[500px] rounded-md">
                <div className="relative">
                    <div
                        className={`${
                            mode === "dark"
                                ? "bg-[#262626] shadow-black"
                                : "bg-[#f8f8f8] shadow-black"
                        } z-40 absolute top-0 left-0 w-full h-fit rounded-lg rounded-tl-none shadow-2xl p-4 flex flex-col gap-2`}
                    >
                        {!user || !user.newsletter ? (
                            <>
                                <h3
                                    className={`${
                                        mode === "dark"
                                            ? "text-[#f8f8f8]"
                                            : "text-[#262626]"
                                    }  text-xl
                            uppercase
                            font-bold text-center`}
                                >
                                    SUBSCRIBE TO OUR NEWSLETTER
                                </h3>
                                <div className="flex gap-2 flex-col sm:flex-row items-center justify-center">
                                    <button
                                        onClick={handleSubscription}
                                        className={`${
                                            mode == "light"
                                                ? "text-white"
                                                : "text-black"
                                        }  transition-all duration-200 w-full h-10 bg-gradient-to-r from-[#ff7d65] to-blue-700  self-end rounded-2xl p-2 active:scale-95 font-semibold shadow-xl`}
                                    >
                                        SUBSCRIBE
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center items-center gap-4">
                                <h3
                                    className={`${
                                        mode === "dark"
                                            ? "text-[#f8f8f8]"
                                            : "text-[#262626]"
                                    }  text-2xl
                            uppercase
                            font-bold text-center`}
                                >
                                    Follow us on youtube
                                </h3>
                                <div className="flex gap-2 flex-col sm:flex-row items-center justify-center">
                                    <a
                                        href="https://www.youtube.com/@TheVidoesForEverything"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <img
                                            src="/youtube.png"
                                            className="active:scale-95 transition-all duration-300"
                                        />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        className={`${
                            mode === "dark" ? "bg-[#f8f8f8]" : "bg-[#262626]"
                        }  absolute triangle top-[1px] -left-[24px]  w-20 h-[84px] z-0`}
                    ></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
