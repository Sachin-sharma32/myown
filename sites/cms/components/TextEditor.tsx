import dynamic from "next/dynamic";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import hljs from "highlight.js";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../../node_modules/react-quill/dist/quill.snow.css"

const TextEditor = ({ content, setContent }) => {
  let values;
  if (typeof window !== "undefined") {
    values = JSON.parse(localStorage.getItem("storage"));
  }
  return (
    <Stack
      sx={{
        backgroundColor: "white",
        paddingTop: "",
        minHeight: "",
        height: "",
        overflowX: "hidden",
        width: "100%",
        border: "",
      }}
      className="editor-container "
    >
      <ReactQuill
        theme="snow"
        style={{ backgroundColor: "white", textAlign: "center" }}
        value={content}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
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
          "video",
          "link",
          "image",
          "code-block",
        ]}
        onChange={(e) => {
          setContent(e);
          localStorage.setItem(
            "storage",
            JSON.stringify({
              ...values,
              content: e,
            })
          );
        }}
        className="h-full  border-none bg-white"
      />
    </Stack>
  );
};

export default TextEditor;
