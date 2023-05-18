import Link from "next/link";
import React from "react";
import { imageBuilder } from "../sanity";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SyntaxHighlighter from "react-syntax-highlighter";
import CopyToClipboard from "react-copy-to-clipboard";

const RichTextComponent = (copy, setCopy) => {
    const richText = {
        types: {
            image: ({ value }) => {
                return (
                    <div className="relative w-[100%] h-fit my-4 sm:m-10 mx-auto overflow-hidden">
                        <img
                            className=" object-contain w-[100%] h-[300px]"
                            src={imageBuilder(value)}
                            alt="Blog image"
                            fill
                        />
                    </div>
                );
            },
            code: (props) => (
                <div className=" relative my-4">
                    <SyntaxHighlighter language={props.value.language}>
                        {props.value.code}
                    </SyntaxHighlighter>
                    <div>
                        {copy ? (
                            <CopyToClipboard text={props.value.code}>
                                <button className=" bg-gray-500 px-2 py-1 rounded-bl-md copy-btn active:scale-90 transition-all duration-200">
                                    Copied
                                </button>
                            </CopyToClipboard>
                        ) : (
                            <CopyToClipboard text={props.value.code}>
                                <button
                                    onClick={() => {
                                        setCopy(true);
                                        setTimeout(() => {
                                            setCopy(false);
                                        }, 1000);
                                    }}
                                    className=" absolute top-10 min-w-[80px] bg-gray-500 px-2 py-1 copy-btn rounded-bl-md active:scale-90 transition-all duration-200"
                                >
                                    Copy
                                </button>
                            </CopyToClipboard>
                        )}
                    </div>
                </div>
            ),
        },
        list: {
            bullet: ({ children }) => (
                <div>
                    <ul
                        className=" py-5 list-disk space-y-5"
                    >
                        {children.map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <ArrowForwardIcon className=" text-[#eb9586]" />
                                <li>{item}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            ),
            number: ({ children }) => (
                <ul className=" py-5 list-disk space-y-5">
                    {children.map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <p className=" text-[#eb9586] font-bold">
                                {i + 1}.
                            </p>
                            <li>{item}</li>
                        </div>
                    ))}
                </ul>
            ),
        },
        block: {
            h1: ({ children }) => (
                <h1 className=" text-2xl sm:text-5xl py-4 sm:py-10 font-extrabold text-[#eb9586]">
                    {children}
                </h1>
            ),
            h2: ({ children }) => (
                <h2 className=" text-xl sm:text-4xl py-4 sm:py-10 font-extrabold text-[#eb9586]">
                    {children}
                </h2>
            ),
            h3: ({ children }) => (
                <h3 className=" text-lg sm:text-3xl py-4 sm:py-10 font-extrabold text-[#eb9586]">
                    {children}
                </h3>
            ),
            h4: ({ children }) => (
                <h3 className=" text-base sm:text-2xl py-4 sm:py-10 font-extrabold text-[#eb9586]">
                    {children}
                </h3>
            ),
            h5: ({ children }) => <h3 className=" py-4">{children}</h3>,
            h6: ({ children }) => <h3 className=" py-2">{children}</h3>,
            blockquote: ({ children }) => (
                <div className=" flex gap-4 bg-orange-100 my-4 rounded-2xl overflow-hidden">
                    <div className="bg-orange-500 p-4 flex justify-center items-center">
                        Attention
                    </div>
                    <blockquote className=" text-inherit text-black">
                        <p className="text-black p-4 text-xs">{children}</p>
                    </blockquote>
                </div>
            ),
        },
        marks: {
            link: ({ children, value }) => {
                const rel = !value.href.startsWith("/")
                    ? "noreferrer noopener"
                    : undefined;
                return (
                    <Link
                        href={value.href}
                        rel={rel}
                        className=" underline decoration-white hover:decoration-black"
                    />
                );
            },
        },
    };
    return richText;
};

export default RichTextComponent;
