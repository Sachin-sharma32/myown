import React, { useMemo } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const CategoryBox = ({ setToggleCategories, toggleCategories }) => {
    const categories = useSelector((state) => state.base.categories);
    const headerCategories = useMemo(() => {
        return categories.filter((category) => {
            return category.header;
        });
    }, [categories]);
    const mode = useSelector((state) => state.base.mode);
    return (
        <motion.div
            className={`${
                mode == "light"
                    ? "bg-[#f8f8f8] text-black"
                    : "bg-black text-white"
            } overflow-hidden  text-xs absolute top-8 -right-2  p-2 w-52 flex flex-col items-center justify-center gap-0 rounded-2xl z-50 shadow-2xl bg-gradient-to-r from-[#ff7d69] to-blue-700`}
        >
            {headerCategories.map((item, index) => {
                return (
                    <Link
                        href={`/search/${item.title}`}
                        key={index}
                        onClick={() => {
                            setToggleCategories(false);
                        }}
                    >
                        <p
                            className={`${
                                mode == "light"
                                    ? "text-white hover:bg-[#f8f8f8] hover:text-black"
                                    : "text-black hover:bg-black hover:text-white"
                            } w-48 transition-all duration-150 p-2 text-center rounded-2xl backdrop-opacity-50 font-semibold`}
                        >
                            {item.title.toUpperCase()}
                        </p>
                    </Link>
                );
            })}
        </motion.div>
    );
};

export default CategoryBox;
