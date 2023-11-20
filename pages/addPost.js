import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { Checkbox, CircularProgress, Link } from "@mui/material";
import TextEditor from "../sites/cms/components/TextEditor";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Preview from "./preview";
import { useCreatePost } from "../sites/cms/hooks/usePost";
import { useDispatch, useSelector } from "react-redux";
import { setError, setMessage, setSuccess } from "../sites/cms/redux/slices";
import * as Yup from "yup";
import { useUploadImage } from "../sites/cms/hooks/useImage";
import Image from "next/image";
import { useGetCategories } from "../sites/cms/hooks/useCategory";
import { useGetAuthors } from "../sites/cms/hooks/useUser";
import { useGetTags } from "../sites/cms/hooks/useTag";

const AddPost = () => {
  const { data: tags } = useGetTags();
  const { data: authors } = useGetAuthors();
  const user = useSelector((state) => state.base.user);
  const [content, setContent] = useState("");
  // const [tags, setTags] = useState([]);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [readTime, setReadTime] = useState(0);
  const [author, setAuthor] = useState(null);
  const [featured, setFeatured] = useState(false);
  const [bestPost, setBestPost] = useState(false);
  const [type, setType] = useState(null);

  const { data: categories } = useGetCategories();
  console.log(categories);

  const onSuccess = () => {
    dispatch(setSuccess(true));
    dispatch(setMessage("Post created Successfully"));
    setContent("");
    setTitle("");
    setTags([]);
    setSelectedCategory("");
    setImage(null);
  };
  const onError = (e) => {
    dispatch(setError(true));
    dispatch(setMessage(e));
  };

  const { mutate: createPost } = useCreatePost(onSuccess, onError);
  const submitHandler = (e) => {
    if (!user && !user?.isAdmin) {
      dispatch(setError(true));
      dispatch(setMessage("Only admin can create a post"));
    } else {
      e.preventDefault();
      const data = {
        title,
        content,
        tags: selectedTags,
        category: selectedCategory,
        image,
        bestPost,
        featured,
        readTime,
        type,
        author,
      };
      createPost(data);
    }
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
    if (!user && !user?.isAdmin) {
      dispatch(setError(true));
      dispatch(setMessage("Only admin can upload image"));
    } else {
      setLoading(true);
      const image = e.target.files[0];
      uploadImage(image);
    }
  };

  return (
    <div className=" px-4 sbp:px-20  font-gilroy4 bg-[#f8f9fa] py-4 h relative h-fit">
      <p className="text-3xl my-10">ADD NEW POST</p>
      <div className="flex gap-6 flex-col fbp:flex-row">
        <div className="bg-white p-8 flex sticky top-24 flex-col gap-4 w-full fbp:w-[70%] h-full  rounded-xl shadow-xl">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              className=" bg-white outline-none border border-gray-500 rounded-md py-1 px-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Read Time</label>
            <input
              onChange={(e) => {
                setReadTime(e.target.value);
              }}
              type="number"
              className=" bg-white outline-none border border-gray-500 rounded-md py-1 px-2"
            />
          </div>
          <div className="flex gap-10 mt-2">
            <div className="flex gap-4 items-center">
              <Checkbox
                onChange={(e) => {
                  setBestPost(e.target.checked);
                }}
                className=" w-2 h-2"
                color="success"
                id="bestPost"
              />
              <label htmlFor="bestPost" className=" cursor-pointer">
                Best Post
              </label>
            </div>
            <div className="flex gap-4 items-center">
              <Checkbox
                onChange={(e) => {
                  setFeatured(e.target.checked);
                }}
                className=" w-2 h-2"
                color="success"
                id="featured"
              />
              <label htmlFor="featured" className=" cursor-pointer">
                Featured
              </label>
            </div>
          </div>
          <TextEditor content={content} setContent={setContent} />
        </div>
        <div className=" w-full fbp:w-[30%] flex gap-10 flex-col">
          <div className=" w-full h-[300px] border relative overflow-hidden flex justify-center items-center border-black border-dotted bg-white shadow-lg rounded-lg">
            {image && (
              <Image
                src={image}
                width={500}
                className="w-full h-full absolute"
                height={500}
              />
            )}
            {loading ? (
              <CircularProgress color="inherit" size="46px" />
            ) : (
              <>
                <p>Drag and Drop or upload image</p>
                <input
                  type="file"
                  className=" absolute w-full h-full opacity-0"
                  onChange={handleImage}
                />
              </>
            )}
          </div>
          <div className=" bg-white pt-8 rounded-xl h-fit shadow-xl overflow-hidden">
            <div className=" shadow-sm px-10 py-4">
              <p className="text-lg font-bold">PUBLISH</p>
            </div>
            <div className="px-10 py-4">
              <div className=" flex justify-between border-b pb-4">
                <button className="bg-white border px-2 py-1 rounded-md hover:text-white hover:bg-black transition-all duration-300">
                  Save Draft
                </button>
                <button
                  onClick={() => {
                    // if (user) {
                    setActive(true);
                    // } else {
                    //   dispatch(setError(true));
                    //   dispatch(setMessage("Only admin can preview post"));
                    // }
                  }}
                  className="bg-white border px-2 py-1 rounded-md hover:text-white hover:bg-black transition-all duration-300"
                >
                  Preview
                </button>
              </div>
              <div className="py-4 flex flex-col gap-4">
                <p>
                  Status: <span className="font-bold">Draft</span>{" "}
                  <button
                    className="text-blue-500 text-xs ml-4"
                    onClick={() => {
                      dispatch(setError(true));
                      dispatch(
                        setMessage("Only Admin can perform this action")
                      );
                    }}
                  >
                    Edit
                  </button>
                </p>
                <p>
                  Visibility: <span className="font-bold">Public</span>{" "}
                  <button
                    className="text-blue-500 text-xs ml-4"
                    onClick={() => {
                      dispatch(setError(true));
                      dispatch(
                        setMessage("Only Admin can perform this action")
                      );
                    }}
                  >
                    Edit
                  </button>
                </p>
                <p>
                  Publish: <span className="font-bold">immediately</span>{" "}
                  <button
                    className="text-blue-500 text-xs ml-4"
                    onClick={() => {
                      dispatch(setError(true));
                      dispatch(
                        setMessage("Only Admin can perform this action")
                      );
                    }}
                  >
                    Edit
                  </button>
                </p>
              </div>
            </div>
            <div className="bg-[#f8f9fa] py-4 px-10 flex justify-end">
              <button
                type="submit"
                onClick={submitHandler}
                className="bg-gray-900 hover:bg-black transition-all duration-300 text-white px-3 py-1 rounded-lg flex gap-2 items-center"
              >
                <p>CREATE POST</p>
              </button>
            </div>
          </div>
          <div className=" bg-white pt-8 rounded-xl h-fit shadow-xl overflow-hidden">
            <div className=" shadow-sm px-10 py-4">
              <p className="text-lg font-bold">CATEGORIES</p>
            </div>
            <div className="px-10 py-4">
              <div className="py-4 flex flex-col gap-4">
                {categories?.categories?.map((category) => (
                  <div className="flex gap-4" key={category._id}>
                    <Checkbox
                      onChange={(e) => {
                        if (selectedCategory.title == category.title) {
                          setSelectedCategory("");
                        } else {
                          setSelectedCategory(category);
                        }
                      }}
                      className=" w-2 h-2"
                      checked={selectedCategory.title == category.title}
                      color="error"
                      id={category._id}
                    />
                    <label htmlFor={category._id} className=" cursor-pointer">
                      {category.title}
                    </label>
                  </div>
                ))}
                <Link
                  href="/categories"
                  className="flex gap-2 text-blue-500  border-b cursor-pointer transition-all duration-300 border-white w-fit"
                >
                  <AddIcon />
                  <p>Add New Category</p>
                </Link>
              </div>
            </div>
          </div>
          <div className=" bg-white pt-8 rounded-xl h-fit shadow-xl overflow-hidden">
            <div className=" shadow-sm px-10 py-4">
              <p className="text-lg font-bold">TAG</p>
            </div>
            <div className="px-10 py-4">
              <div className="py-4 flex flex-col gap-4 max-h-[300px] overflow-y-scroll">
                {tags?.tags?.map((tag) => (
                  <div className="flex gap-4" key={tag._id}>
                    <Checkbox
                      onChange={(e) => {
                        if (selectedCategory.title == tag.title) {
                          setSelectedCategory("");
                        } else {
                          setSelectedCategory(tag);
                        }
                      }}
                      className=" w-2 h-2"
                      checked={selectedCategory.title == tag.title}
                      color="error"
                      id={tag._id}
                    />
                    <label htmlFor={tag._id} className=" cursor-pointer">
                      {tag.title}
                    </label>
                  </div>
                ))}
              </div>
              <Link
                href="/tags"
                className="flex gap-2 mt-2 text-blue-500  border-b cursor-pointer transition-all duration-300 border-white w-fit"
              >
                <AddIcon />
                <p>Add New Tag</p>
              </Link>
            </div>
          </div>
          <div className=" bg-white pt-8 rounded-xl h-fit shadow-xl overflow-hidden">
            <div className=" shadow-sm px-10 py-4">
              <p className="text-lg font-bold">TYPE</p>
            </div>
            <div className="px-10 py-4">
              <div className="py-4 flex flex-col gap-4 max-h-[300px] overflow-y-scroll">
                {["blog", "short", "experience", "information"].map((tag) => (
                  <div className="flex gap-4" key={tag._id}>
                    <Checkbox
                      onChange={(e) => {}}
                      className=" w-2 h-2"
                      color="error"
                      id={tag}
                    />
                    <label htmlFor={tag} className=" cursor-pointer">
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className=" bg-white py-8 rounded-xl h-fit shadow-xl overflow-hidden">
            <div className=" shadow-sm px-10 py-4">
              <p className="text-lg font-bold">TAGS</p>
            </div>
            <div className="px-10 py-4">
              <form className="flex flex-wrap overflow-hidden bg-[#f9f9f9]">
                <div className="flex gap-2 flex-wrap p-2">
                  {tags?.map((tag) => (
                    <div
                      className="bg-black text-white h-fit p-2 flex gap-2 items-center rounded-lg"
                      key={tag}
                    >
                      <p>{tag}</p>
                      <button
                        onClick={() => {
                          const filterTags = tags?.filter((item) => {
                            return item != tag;
                          });
                          setTags(filterTags);
                        }}
                      >
                        <CloseIcon className=" text-sn" />
                      </button>
                    </div>
                  ))}
                </div>
                <textarea
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.target.value;
                      setTags([...tags, e.target.value]);
                      e.target.value = " ";
                    }
                  }}
                  className=" min-h-[100px] outline-none p-4 w-full resize-none bg-[#f9f9f9]"
                ></textarea>
              </form>
            </div>
          </div> */}
        </div>
        {/* <div className="bg-[#f8f9fa] py-4 px-10 flex justify-end"></div> */}
      </div>
      <Preview
        active={active}
        setActive={setActive}
        title={title}
        tags={tags}
        selectedCategory={selectedCategory}
        image={image}
        content={content}
      />
    </div>
  );
};

export default AddPost;

export async function getServerSideProps(context) {
  const subdomain = context.req.headers.host.split(".")[0];
  return {
    props: {
      title: "Sachin Sharma - Media",
      image: "/logo.png",
      summery:
        "Experienced Web and App Developer | Showcase of Expertise in Crafting Innovative Digital Solutions",
      keywords:
        "Web development, app development, software development, front-end development, back-end development, responsive design, user experience (UX), user interface (UI), mobile applications, cross-platform development, JavaScript, HTML5, CSS3, ReactJS, NextJS, API integration, database management, e-commerce solutions, custom web applications, portfolio showcase, digital solutions",
      type: "website",
      imageAlt: "codebysachin.com logo",
      parameter: "media",
      subdomain,
    },
  };
}
