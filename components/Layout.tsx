import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../utils/types";

const Layout = ({ children }) => {
  const mode = useSelector((state: State) => state.base.mode);
  const user = useSelector((state: State) => state.base.user);
  const router = useRouter();
  return (
    <div
      className={`${router.pathname.startsWith("/post") ? "pb-0" : "pb-32"} ${
        mode === "light" ? "bg-[#f8f8f8]" : "bg-[#262626]"
      }`}
    >
      {children}
    </div>
  );
};

export default Layout;
