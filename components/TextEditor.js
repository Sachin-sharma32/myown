import dynamic from "next/dynamic";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

import ReactQuill, { Quill } from "react-quill";
import "../node_modules/react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
const BubbleTheme = Quill.import("themes/bubble");

class ExtendBubbleTheme extends BubbleTheme {
    constructor(quill, options) {
        super(quill, options);

        quill.on("selection-change", (range) => {
            if (range) {
                quill.theme.tooltip.show();
                quill.theme.tooltip.position(quill.getBounds(range));
            }
        });
    }
}
Quill.register("themes/bubble", ExtendBubbleTheme);

window.innerWidth;

const TextEditor = ({ content, setContent }) => {
    return (
        <>
            <Stack
                sx={{
                    backgroundColor: "white",
                    paddingTop: "",
                    minHeight: "90vh",
                    height: "",
                    overflowX: "hidden",
                    width: "100%",
                    border: "20px solid white",
                }}
                className="editor-container min-h-screen"
            >
                {window.innerWidth > 600 ? (
                    <ReactQuill
                        theme="bubble"
                        style={{
                            backgroundColor: "white",
                            textAlign: "center",
                        }}
                        placeholder="hello"
                        value={content}
                        modules={{
                            toolbar: {
                                container: [
                                    [{ header: "1" }, { header: "2" }],
                                    ["bold", "italic", "blockquote"],
                                    [{ list: "ordered" }, { list: "bullet" }],
                                    ["video", "image", "link"],
                                    ["clean"],
                                    ["code-block"],
                                ],
                            },
                        }}
                        formats={[
                            "header",
                            "font",
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                            "list",
                            "bullet",
                            "indent",
                            "video",
                            "link",
                            "image",
                            "code-block",
                        ]}
                        onChange={(e) => {
                            setContent(e);
                        }}
                        className="h-[90vh] border-none bg-[#f8f8f8]"
                    />
                ) : (
                    <ReactQuill
                        theme="bubble"
                        style={{
                            backgroundColor: "white",
                            textAlign: "center",
                        }}
                        placeholder="hello"
                        value={content}
                        modules={{
                            toolbar: [
                                [{ header: "1" }, { header: "2" }],
                                ["bold", "italic", "blockquote"],
                                [{ list: "bullet" }],
                                ["video", "image", "link"],
                                ["clean"],
                                ["code-block"],
                            ],
                        }}
                        formats={[
                            "header",
                            "font",
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                            "list",
                            "bullet",
                            "indent",
                            "link",
                            "image",
                            "code-block",
                        ]}
                        onChange={(e) => {
                            ("hello");
                            setContent(e);
                        }}
                        className="h-[90vh] border-none bg-[#f8f8f8]"
                    />
                )}
            </Stack>
        </>
    );
};

export default TextEditor;
