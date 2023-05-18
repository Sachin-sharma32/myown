import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
    const mode = useSelector((state) => state.base.mode);
    const user = useSelector((state) => state.base.user);
    const router = useRouter();
    return (
        <div
            className={`${
                router.pathname.startsWith("/post") ? "pb-0" : "pb-32"
            } ${mode === "light" ? "bg-[#f8f8f8]" : "bg-[#262626]"}`}
        >
            {children}
        </div>
    );
};

export default Layout;
