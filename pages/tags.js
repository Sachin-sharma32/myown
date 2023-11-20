import React, { useState } from "react";
import { setError, setSuccess, setMessage } from "../sites/cms/redux/slices";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import CloseIcon from "@mui/icons-material/Close";
import Layout from "../sites/cms/components/Layout";
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
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useUploadImage } from "../sites/cms/hooks/useImage";
import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategories,
} from "../sites/cms/hooks/useCategory";
import { useGetTags, useDeleteTag, useCreateTag } from "../sites/cms/hooks/useTag";
import AllCategories from "../sites/cms/components/AllCategories";
import { Alert, Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const [activePage, setActivePage] = useState(1);

  const [topCategory, setTopCategory] = React.useState(false);
  const [footer, setFooter] = React.useState(false);
  const [header, setHeader] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [limit, setLimit] = useState(20);
  const [slug, setSlug] = useState("");
  const [selectedTagsForDelete, setSelectedTagsForDelete] = useState("");
  const { data } = useGetTags(activePage, limit);
  console.log(data);

  const user = useSelector((state) => state.base.user);
  const dispatch = useDispatch();

  const addCategory = (e) => {
    e.preventDefault();
    if (!user && !user?.isAdmin) {
      dispatch(setError(true));
      dispatch(setMessage("Only admin can create tag"));
    } else {
      const data = { name: title, desc, slug };
      createCategory(data);
    }
  };
  const [deleteOption, setDeleteOption] = useState("delete");
  let totalLength = Math.floor(data?.total / limit) + 1;
  totalLength;
  const arr = [];
  for (let i = 1; i <= totalLength; i++) {
    arr.push(i);
  }
  const { mutate: deleteTag } = useDeleteTag();
  const handleDelete = () => {
    if (!user && !user?.isAdmin) {
      dispatch(setError(true));
      dispatch(setMessage("Only admin can upload image"));
    } else {
      deleteTag(selectedTagsForDelete);
      setShowDeletePopup(false);
    }
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(2, "Title must be at least 2 characters long")
      .max(30, "Title must be at most 30 characters long"),
    description: Yup.string(),
  });
  const initialValues = {
    title: "",
    description: "",
  };
  const onSuccess = () => {
    setSuccess(true);
    setMessage("Category created successfully");
  };
  const onError = (error) => {
    setError(true);
    setMessage(error.response.data.message);
  };

  const onImageSuccess = (data) => {
    setImage(data.data);
    setSuccess(true);
    setMessage("Image uploaded successfully");
    setLoading(false);
  };

  const onImageError = (error) => {};

  const { mutate: uploadImage } = useUploadImage(onImageSuccess, onImageError);
  const handleImage = (e) => {
    setLoading(true);
    const image = e.target.files[0];
    uploadImage(image);
  };

  const { mutate: createCategory } = useCreateTag(onSuccess, onError);
  const submitHandler = (values, { resetForm }) => {
    const data = {
      ...values,
      topCategory,
      header,
      footer,
      image,
      desc: values.description,
    };
    createCategory(data);
    resetForm({ values: "" });
    setImage(null);
    setFooter(false);
    setHeader(false);
    setTopCategory(false);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
    validateOnBlue: true,
  });
  return (
    <div className="bg-[#f8f9fa] py-1 cfbp:px-20 px-4 font-gilroy5 min-h-screen pb-20">
      <Dialog
        className="bg-black z-[1000] bg-opacity-10"
        open={showDeletePopup}
      >
        <DialogTitle>Alert</DialogTitle>
        <DialogContent className="relative">
          Are you sure you want to delete this category
        </DialogContent>
        <DialogActions>
          <button
            className="absolute top-4 right-4"
            onClick={() => {
              setShowDeletePopup(false);
            }}
          >
            <CloseIcon />
          </button>
          <button
            className="border rounded-md bg-white hover:bg-black transition-all duration-300 p-2 hover:text-white"
            variant="outlined"
            onClick={handleDelete}
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>
      <h1 className=" my-10 text-3xl">TAGS</h1>
      <div className="flex gap-8 fbp:flex-row flex-col">
        <form className="fbp:w-[30%] w-full h-full bg-white p-10 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              className=" bg-white outline-none border border-gray-500 rounded-md py-1 px-2"
            />
            <p className=" text-xs text-gray-500">
              The name is how it appears on your site.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Slug</label>
            <input
              onChange={(e) => {
                setSlug(e.target.value);
              }}
              value={slug}
              type="text"
              className=" bg-white outline-none border border-gray-500 rounded-md py-1 px-2"
            />
            <p className=" text-xs text-gray-500">
              The &quot;slug&quot; is the URL-friendly version of the name. It
              is usually all lowercase and contains only letters, numbers, and
              hypens.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Description</label>
            <textarea
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              value={desc}
              rows={10}
              type="text"
              className=" bg-white resize-none outline-none border border-gray-500 rounded-md py-1 px-2"
            />
            <p className=" text-xs text-gray-500">
              The description is not prominent by default; however, some themes
              may show it.
            </p>
          </div>
          <button
            type="submit"
            onClick={addCategory}
            className="bg-gray-900 w-fit self-end hover:bg-black transition-all duration-300 text-white px-3 py-1 rounded-lg flex gap-2 items-center"
          >
            <p>ADD NEW TAG</p>
          </button>
        </form>
        <div className="fbp:w-[70%] w-full">
          <div className=" w-full">
            <div className=" text-sm  bg-[#ffffff] rounded-xl shadow-xl">
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
                        setSelectedTagsForDelete("");
                      } else {
                        setSelectedTagsForDelete([]);
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
                        dispatch(setMessage("Only admin can delete tag"));
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
                      setLimit(e.target.value);
                    }}
                  >
                    <option value="5">20</option>
                    <option value="10">30</option>
                    <option value="20">40</option>
                    <option value="30">50</option>
                  </select>
                  <p className="hidden cfbp:flex">Number of posts per page</p>
                </div>
                <div>
                  {/* <input
                    onClick={() => {}}
                    type="text"
                    className=" hidden tbp:flex bg-white border-[1px] border-gray-400 px-2  py-1 h-fit outline-none w-52 rounded-md text-sm"
                    placeholder="Search"
                  /> */}
                </div>
              </div>
              <table className="w-full font-gilroy3 bg-white">
                <thead className="bg-black text-white px-4">
                  <tr>
                    <th></th>
                    <th className="py-6 text-start">Name</th>
                    <th className="">DESCRIPTION</th>
                    <th>SLUG</th>
                  </tr>
                </thead>
                <tbody className="">
                  {data?.tags?.map((category) => (
                    <tr
                      className="px-4 border-b hover:bg-gray-200 cursor-pointer"
                      key={category._id}
                    >
                      <td className="pl-4">
                        <Checkbox
                          color="error"
                          onChange={(e) => {
                            if (typeof selectedTagsForDelete === "string") {
                              if (selectedTagsForDelete == category._id) {
                                setSelectedTagsForDelete("");
                              } else {
                                setSelectedTagsForDelete(category._id);
                              }
                            } else {
                              if (
                                selectedTagsForDelete?.includes(category._id)
                              ) {
                                setSelectedTagsForDelete((s) => {
                                  const index = selectedTagsForDelete.indexOf(
                                    category._id
                                  );
                                  return selectedTagsForDelete.splice(index, 1);
                                });
                              } else {
                                setSelectedTagsForDelete((s) => {
                                  return s.push(category._id);
                                });
                              }
                            }
                          }}
                          checked={
                            (Array.isArray(selectedTagsForDelete) &&
                              selectedTagsForDelete.includes(category._id)) ||
                            (typeof selectedTagsForDelete === "string" &&
                              selectedTagsForDelete == category._id)
                          }
                        />
                      </td>
                      <td className="flex items-center gap-4 py-4 justify-start">
                        <p className="font-bold ">{category.title}</p>
                      </td>
                      <td className=" text-center">
                        {category.desc ? category.desc : "-"}
                      </td>
                      <td className=" text-center">
                        {category.slug ? category.slug : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-10  flex items-end justify-between">
                <p className=" hidden tbp:flex text-[#fb8500]">
                  Showing{" "}
                  <span className="text-black mr-1 ml-1">
                    {limit * activePage - (limit - 1)}
                  </span>{" "}
                  to{" "}
                  <span className="text-black mr-1 ml-1">
                    {limit * activePage - (limit - data?.tags?.length)}
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
      </div>
    </div>
  );
};

export default Categories;
