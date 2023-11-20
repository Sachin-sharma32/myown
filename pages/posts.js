import React from "react";
import { setError, setSuccess, setMessage } from "../sites/cms/redux/slices";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Layout from "../sites/cms/components/Layout";
import moment from "moment";
import Image from "next/image";
import {
  TextField,
  Stack,
  MenuItem,
  FormControlLabel,
  Switch,
  FormControl,
  FormLabel,
  Paper,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  InputAdornment,
  InputLabel,
  FilledInput,
  OutlinedInput,
  Select,
  DialogTitle,
  DialogActions,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useCreatePost, useDeletePost, useGetPosts } from "../sites/cms/hooks/usePost";
import { useUploadImage } from "../sites/cms/hooks/useImage";
import { useCreateCategory, useGetCategories } from "../sites/cms/hooks/useCategory";
import { useCreateTag, useGetTags } from "../sites/cms/hooks/useTag";
import { useGetAuthors, useGetMe } from "../sites/cms/hooks/useUser";
import AllPosts from "../sites/cms/components/AllPosts";
import EditorComponent from "../sites/cms/components/Base";
import CloseIcon from "@mui/icons-material/Close";
import dynamic from "next/dynamic";
const MyEditor = dynamic(() => import("../sites/cms/components/MyEditor"), {
  ssr: false,
});
const TextEditor = dynamic(() => import("../sites/cms/components/TextEditor"), {
  ssr: false,
});
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../sites/cms/redux/slices";

const Posts = () => {
  const onSaveHandler = async (blogData, title, description) => {
    const toSaveData = {
      title,
      blogData,
      description,
    };
  };
  const [deleteOption, setDeleteOption] = useState("delete");
  const { mutate: deletePost } = useDeletePost();
  const [editorState, setEditorState] = React.useState(null);
  const [limit, setLimit] = useState(10);
  const filter = useSelector((state) => state.base.filter);
  const [activePage, setActivePage] = useState(1);
  const { data } = useGetPosts(activePage, limit, filter);
  console.log(data);
  const [selectedPostsForDelete, setSelectedPostsForDelete] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.base.user);
  console.log(user);

  let totalLength = Math.floor(data?.total / limit) + 1;
  const arr = [];
  for (let i = 1; i <= totalLength; i++) {
    arr.push(i);
  }
  const onEditorStateChange = (editorState) => {};
  const [loading, setLoading] = React.useState(false);
  const [showTagsPopup, setShowTagsPopup] = React.useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = React.useState(false);
  const [category, setCategory] = React.useState(false);
  const [tag, setTag] = React.useState(false);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(20, "Title must be at least 20 characters long")
      .max(100, "Title must be at most 200 characters long"),
    readTime: Yup.number()
      .required("Read time is required")
      .min(1, "Read time must be at least 1 minute long")
      .max(60, "Read time must be at most 60 minutes long"),
    author: Yup.string().required("Author is required"),
    tags: Yup.array()
      .of(Yup.string())
      .min(3, "Must have at least 3 tags")
      .max(3, "Must have at most 3 tags"),
    category: Yup.string().required("Category is required"),
    type: Yup.string().required("Type is required"),
    summery: Yup.string().required("Summery is required"),
  });

  const onSuccess = () => {
    setSuccess(true);
    setMessage("Post created successfully");
    localStorage.setItem("storage", null);
  };
  const onError = (error) => {
    setError(true);
    setMessage(error.response.data.message);
  };

  const { mutate: createPost } = useCreatePost(onSuccess, onError);
  const submitHandler = (values, { resetForm }) => {
    const data = {
      ...values,
      bestPost: best,
      featured: featured,
      content,
      image,
      author: user,
    };
    createPost(data);
    resetForm({ values: "" });
    setContent("");
    setImage(null);
    setBest(false);
    setFeatured(false);
  };

  let storageValues;
  if (typeof window != "undefined") {
    storageValues = JSON.parse(localStorage.getItem("storage"));
    storageValues;
  }
  storageValues;
  const [image, setImage] = React.useState("");
  const [featured, setFeatured] = React.useState(null);
  const [best, setBest] = React.useState(null);
  const [content, setContent] = React.useState("");
  useEffect(() => {
    setImage(storageValues?.image ? storageValues.image : null);
    setFeatured(storageValues?.featured ? storageValues.featured : false);
    setBest(storageValues?.best ? storageValues.best : false);
    setContent(storageValues?.content ? storageValues.content : "");
  }, []);

  featured;

  const initialValues = {
    title: storageValues?.values?.title ? storageValues?.values.title : "",
    readTime: storageValues?.values?.readTime
      ? storageValues?.values.readTime
      : "",
    author: storageValues?.values?.author ? storageValues?.values.author : "",
    tags: storageValues?.values?.tags ? storageValues?.values.tags : [],
    category: storageValues?.values?.category
      ? storageValues?.values.category
      : "",
    type: storageValues?.values?.type ? storageValues?.values.type : "",
    summery: storageValues?.values?.summery
      ? storageValues?.values.summery
      : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
    validateOnBlue: true,
  });

  const onImageSuccess = (data) => {
    setImage(data.data);
    setSuccess(true);
    setMessage("Image uploaded successfully");
    setLoading(false);
    localStorage.setItem(
      "storage",
      JSON.stringify({
        image: data.data,
        best,
        featured,
        values: formik.values,
        content,
      })
    );
  };

  const onImageError = (error) => {};

  const { mutate: uploadImage } = useUploadImage(onImageSuccess, onImageError);
  const handleImage = (e) => {
    setLoading(true);
    const image = e.target.files[0];
    uploadImage(image);
  };

  const { data: categories } = useGetCategories();
  const { data: tags } = useGetTags();
  const { data: authors } = useGetAuthors();

  const onCategorySuccess = () => {
    setSuccess(true);
    setMessage("Tag Created Successfully");
    setShowCategoryPopup(false);
  };
  const onCategoryError = (err) => {
    setError(true);
    setMessage(err.response.data.message);
  };
  const onTagSuccess = () => {
    setSuccess(true);
    setMessage("Tag Created Successfully");
    setShowTagsPopup(false);
  };
  const onTagError = (err) => {
    setError(true);
    setMessage(err.response.data.message);
  };
  const { mutate: createCategory } = useCreateCategory(
    onCategorySuccess,
    onCategoryError
  );
  const handleCreateCategory = () => {
    const data = {
      title: category,
    };
    createCategory(data);
  };
  const { mutate: createTag } = useCreateTag(onTagSuccess, onTagError);
  const handleCreateTag = () => {
    const data = { title: tag };
    createTag(data);
  };
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const handleDelete = () => {
    deletePost(selectedPostsForDelete);
    setShowDeletePopup(false);
  };

  return (
    <div className="min-h-screen flex justify-center sbp:px-20 font-gilroy4 px-20">
      <Dialog open={showDeletePopup}>
        <DialogTitle>Alert</DialogTitle>
        <DialogContent>Are you sure you want to delete this post</DialogContent>
        <DialogActions>
          <button
            className="border rounded-md bg-white hover:bg-black transition-all duration-300 p-2 hover:text-white"
            variant="outlined"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className=" absolute top-4 right-4"
            onClick={() => {
              setShowDeletePopup(false);
            }}
          >
            <CloseIcon />
          </button>
        </DialogActions>
      </Dialog>
      <div className="w-full py-10">
        <div className="flex justify-between">
          <h1 className=" text-4xl font-gilroy4">POSTS</h1>
          <Link
            href={"/addPost"}
            className="bg-gray-900 hover:bg-black transition-all duration-300 text-white px-3 py-1 rounded-lg flex gap-2 items-center"
          >
            <AddIcon />
            <p>ADD NEW</p>
          </Link>
        </div>
        <div className=" text-sm mt-20 bg-[#f8f9fa] rounded-xl shadow-xl">
          <div className="flex items-center justify-between p-4 sbp:p-10">
            <div className="text-black flex gap-2 items-center">
              <select
                name="action"
                title="Action"
                id=""
                className="bg-white border  outline-none border-gray-300 rounded-md py-1"
                onChange={(e) => {
                  setDeleteOption(e.target.value);
                  if (e.target.value == "delete") {
                    setSelectedPostsForDelete("");
                  } else {
                    setSelectedPostsForDelete([]);
                  }
                }}
                value={deleteOption}
              >
                <option value="bulk">Bulk Delete</option>
                <option value="delete">Delete</option>
              </select>
              <button
                onClick={() => {
                  if (!user && !user?.isAdmin) {
                    dispatch(setError(true));
                    dispatch(
                      setMessage(
                        "Only admin is permitted to perform this action"
                      )
                    );
                  } else {
                    setShowDeletePopup(true);
                  }
                }}
                className="bg-white border px-2 py-1 rounded-md hover:text-white hover:bg-black transition-all duration-300"
              >
                Apply
              </button>

              <select
                name="action"
                title="Action"
                id=""
                className="bg-white border  outline-none border-gray-300 py-1 rounded-md"
                onChange={(e) => {
                  setActivePage(1);
                  setLimit(+e.target.value);
                }}
                value={limit}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              <p className="hidden fbp:flex">Number of posts per page</p>
            </div>
            <div className="hidden tbp:flex">
              <input
                onChange={(e) => {
                  dispatch(setFilter(e.target.value));
                }}
                type="text"
                className=" bg-white border-[1px] border-gray-400 px-2  py-1 h-fit outline-none w-52 rounded-md text-sm"
                placeholder="Search"
              />
            </div>
          </div>
          <table className="w-full font-gilroy3 bg-white">
            <thead className="bg-black text-white px-4">
              <tr>
                <th></th>
                <th className="py-6 text-start">TITLE</th>
                <th className="">AUTHOR</th>
                <th className="">CREATED AT</th>
                <th className="">CATEGORY</th>
                <th className="">BEST POST</th>
                <th className="">FEATURED</th>
              </tr>
            </thead>
            <tbody className="">
              {data?.docs?.map((post) => (
                <tr
                  className="px-4 border-b hover:bg-gray-200 cursor-pointer"
                  key={post._id}
                >
                  <td className="pl-4">
                    <Checkbox
                      color="error"
                      onChange={(e) => {
                        if (typeof selectedPostsForDelete === "string") {
                          if (selectedPostsForDelete == post._id) {
                            setSelectedPostsForDelete("");
                          } else {
                            setSelectedPostsForDelete(post._id);
                          }
                        } else {
                          if (selectedPostsForDelete?.includes(post._id)) {
                            setSelectedPostsForDelete((s) => {
                              const index = selectedPostsForDelete.indexOf(
                                post._id
                              );
                              return selectedPostsForDelete.splice(index, 1);
                            });
                          } else {
                            setSelectedPostsForDelete((s) => {
                              return s.push(post._id);
                            });
                          }
                        }
                      }}
                      checked={
                        (Array.isArray(selectedPostsForDelete) &&
                          selectedPostsForDelete.includes(post._id)) ||
                        (typeof selectedPostsForDelete === "string" &&
                          selectedPostsForDelete == post._id)
                      }
                    />
                  </td>
                  <td className=" py-4">
                    <Link
                      href={`/cms-post/${post._id}`}
                      className="flex items-center gap-4 justify-start"
                    >
                      <Image
                        src={post.image}
                        className="w-32 h-20 rounded-xl"
                        width={100}
                        height={50}
                      />
                      <p className="font-bold ">{post.title}</p>
                    </Link>
                  </td>
                  <td className=" text-center">{post.author.name}</td>
                  <td className=" text-center">
                    {moment(post.createdAt).subtract(10, "days").calendar()}
                  </td>
                  <td className=" text-center">{post.category.title}</td>
                  <td className=" text-center">
                    {post.bestPost ? "true" : "false"}
                  </td>
                  <td className=" text-center">
                    {post.featured ? "true" : "false"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-10 flex items-center justify-between">
            <p className="hidden md:flex text-[#fb8500]">
              Showing{" "}
              <span className="text-black mr-1 ml-1">
                {10 * activePage - (10 - 1)}
              </span>{" "}
              to{"   "}
              <span className="text-black mr-1 ml-1">
                {10 * activePage - (10 - data?.docs?.length)}
              </span>{" "}
              of <span className="text-black mr-1 ml-1">{data?.total}</span>{" "}
              entries
            </p>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => {
                  setActivePage((a) => {
                    if (a === 1) {
                      return totalLength;
                    } else {
                      return a - 1;
                    }
                  });
                }}
              >
                <ArrowRightIcon className="cursor-pointer w-8 h-8 hover:bg-gray-300 transition-all duration-300 rounded-full rotate-180" />
              </button>
              {totalLength !== 0 &&
                arr?.map((page, i) => (
                  <div
                    key={page}
                    onClick={() => {
                      setActivePage(i + 1);
                    }}
                    className={`p-2 w-8 flex items-center justify-center rounded-full h-8 text-black cursor-pointer ${
                      activePage === i + 1 ? "bg-gray-300" : ""
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              <ArrowRightIcon
                onClick={() => {
                  setActivePage((a) => {
                    if (a === totalLength) {
                      return 1;
                    } else {
                      return a + 1;
                    }
                  });
                }}
                className="cursor-pointer w-8 h-8 hover:bg-gray-300 transition-all duration-300 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
