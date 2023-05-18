import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import WestIcon from "@mui/icons-material/West";
import Head from "next/head";
import Layout from "../components/Layout";

const PageNotFound = () => {
    const router = useRouter();
    const mode = useSelector((state) => state.base.mode);
    return (
        <Layout>
            <Head>
                <title>TBFE - 404</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/site-light-chopped.jpg"
                />
            </Head>
            <div
                className={`${
                    mode == "dark" ? "bg-[#262626] text-white" : "bg-[#f8f8f8]"
                } flex justify-center items-center min-h-screen`}
            >
                <div className="-translate-y-10 flex flex-col items-center gap-4">
                    <h1 className=" text-5xl font-bold">404</h1>
                    <p>
                        <span className=" text-[#eb9586]">
                            This URL does not exist on this website
                        </span>
                    </p>
                    <div className={`${mode == "light" ? "text-black" : ""}`}>
                        <Link href="/">
                            <div className=" text-xl flex items-center gap-2 cursor-pointer hover:gap-3 transition-all duration-200 justify-center">
                                <WestIcon className="" />
                                <p>Home</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PageNotFound;
