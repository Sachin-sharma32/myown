// import CheckList from "@editorjs/checklist";
// import CodeBox from "@bomdi/codebox";
// import Delimiter from "@editorjs/delimiter";
// import Embed from "@editorjs/embed";
// import Image from "@editorjs/image";
// import InlineCode from "@editorjs/inline-code";
// import LinkTool from "@editorjs/link";
// import List from "@editorjs/list";
// import Quote from "@editorjs/quote";
// import SimpleImage from "@editorjs/simple-image";
// import Header from "@editorjs/header";
// import EditorJS from "@editorjs/editorjs";
// import axios from "axios";
// import { useUploadImage } from "../hooks/useImage";
// import { useState } from "react";

// const CustomEditor = () => {
//     // const onChange = (editor) => {
//     //     editor.saver.save().then((data) => {
//     //     });
//     // };

//     const { mutate: uploadImage } = useUploadImage();

//     const editor = new EditorJS({
//         holder: "editorjs",
//         // onChange: (editor) => {
//         //     onChange(editor);
//         // },
//         defaultBlock: "paragraph",
//         placeholder: "Write your content...........",
//         data: [],
//         tools: {
//             checklist: CheckList,
//             codebox: CodeBox,
//             delimiter: Delimiter,
//             embed: Embed,
//             image: Image,
//             inlineCode: InlineCode,
//             list: List,
//             quote: Quote,
//             simpleImage: SimpleImage,
//             header: {
//                 class: Header,
//                 shortcut: "CMD+SHIFT+H",
//                 config: {
//                     placeholder: "Enter heading",
//                     default: "h1",
//                 },
//             },
//             embed: {
//                 class: Embed,
//                 inlineToolbar: true,
//             },
//             paragraph: {
//                 shortcut: "CMD+SHIFT+P",
//                 config: {
//                     placeholder: "Write the content...............",
//                 },
//             },
//             link: {
//                 class: LinkTool,
//             },
//             code: {
//                 class: CodeBox,
//                 shortcut: "CMD+SHIFT+C",
//             },
//             image: {
//                 class: Image,
//                 config: {
//                     uploader: {
//                         async uploadByFile(file) {
//                             const formData = new FormData();
//                             formData.append("image", file);
//                             return axios
//                                 .post(
//                                     `http://localhost:8000/api/v1/uploads`,
//                                     formData,
//                                     {
//                                         headers: {
//                                             "Content-Type":
//                                                 "multipart/form-data",
//                                         },
//                                     }
//                                 )
//                                 .then((data) => {
//                                     return {
//                                         success: 1,
//                                         file: {
//                                             url: `${data.data}`,
//                                         },
//                                     };
//                                 });
//                         },
//                     },
//                 },
//             },
//         },
//     });

//     const saveValue = () => {
//         editor.save().then((data) => {});
//     };

//     return (
//         <div>
//             <div
//                 id="editorjs"
//                 style={{
//                     minHeight: "100vh",
//                     border: "1px solid black",
//                     width: "80%",
//                     margin: "auto",
//                     borderRadius: "10px",
//                 }}
//             />
//         </div>
//     );
// };
// export default CustomEditor;
