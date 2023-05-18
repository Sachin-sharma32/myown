import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
const TextEditor = dynamic(() => import("../components/TextEditor"), {
  ssr: false,
});
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as yup from "yup";
import { useCreateTag } from "../hooks/content";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { IconButton } from "@mui/material";
import { client } from "../sanity";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { setErrorPopup, setMessage, setSuccessPopup } from "../redux/slices";
import { useCreatePost } from "../routers/usePost";
import { useUploadImage } from "../routers/useImage";
import Tooltip from "@mui/material/Tooltip";
import SendIcon from "@mui/icons-material/Send";
import { useAssistence } from "../routers/useConversation";
import { ThreeDots } from "react-loader-spinner";
import CopyToClipboard from "react-copy-to-clipboard";
import DoneIcon from "@mui/icons-material/Done";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Layout from "../components/Layout";

const Create = () => {
  const router = useRouter();
  const categoryId = router.query.category;
  const type = router.query.type;
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const tags = useSelector((state) => state.base.tags);
  const [showTagsDialog, setShowTagsDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.base.user);
  const [imageDialog, setImageDialog] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const [conversation, setConversation] = useState([]);
  const [copy, setCopy] = useState(false);

  const validationObject = yup.object({
    title: yup.string().min(1).max(10),
  });
  const dispatch = useDispatch();

  const onError = (error) => {
    dispatch(setErrorPopup(true));
    dispatch(setMessage(error.response.data.message));
  };
  const onSuccess = (data) => {
    dispatch(setSuccessPopup(true));
    dispatch(setMessage("Tag created successfully"));
  };
  const { mutate: createTag } = useCreateTag(onSuccess, onError);
  const tagHandler = (values) => {
    values;
    if (
      tags?.find((tag) =>
        tag.title.toLowerCase().includes(values.title.toLowerCase())
      )
    ) {
      setError(true);
      setMessage("Tag already exists");
      return;
    }
    createTag(values);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: tagHandler,
    validationSchema: validationObject,
  });

  filter;
  useEffect(() => {
    if (tags) {
      if (search != "") {
        search;
        setFilter(
          tags.filter((tag) =>
            tag.title.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        ("tags");
        setFilter(tags);
      }
    }
  }, [search, tags]);

  const onImageSuccess = (data) => {
    setImage(data.data);
  };

  const onImageError = () => {
    ("something went wrong");
  };

  const { mutate: upload } = useUploadImage(onImageSuccess, onImageError);
  const uploadImage = (e) => {
    const file = e.target.files[0];
    upload(file);
  };

  const onPostSuccess = () => {
    dispatch(setSuccessPopup(true));
    dispatch(setMessage("Post Created Successfully"));
    setTimeout(() => {
      router.push("/");
    }, 2000);
    setImage(null);
    setTitle(null);
    setSelectedTags([]);
    setContent("");
  };
  const onPostError = (err) => {
    dispatch(setErrorPopup(true));
    dispatch(setMessage(err.response.data.message));
  };

  const { mutate: createPost } = useCreatePost(onPostSuccess, onPostError);
  const postHandler = () => {
    const summery = `${content
      .replace(/(<([^>]+)>)/gi, "")
      .slice(0, 300)}.......`;
    const contentLength = content.replace(/(<([^>]+)>)/gi, "").length;
    if (type == "short" && contentLength > 1000) {
      setErrorPopup(true);
      setMessage("Short should be less than 1000 characters");
      return;
    } else if (contentLength > 10000) {
      setErrorPopup(true);
      setMessage("Content should be less than 10000 characters long");
      return;
    }
    const data = {
      title,
      type,
      content,
      image,
      readTime: Math.ceil(contentLength / 1000),
      summery,
      tags: selectedTags,
      category: categoryId,
      author: user,
    };
    createPost(data);
  };

  const assistenceRef = useRef();
  const handleAssistenceToggle = () => {
    if (assistenceRef.current.classList.contains("translate-x-[100%]")) {
      assistenceRef.current.classList.remove("translate-x-[100%]");
      if (typeof window !== "undefined") {
        document.body.style.overflow = "hidden";
        window.scroll(0, 0);
      }
    } else {
      assistenceRef.current.classList.add("translate-x-[100%]");
      if (typeof window !== "undefined") {
        document.body.style.overflow = "scroll";
      }
    }
  };

  const onAssistenceSuccess = (data) => {
    data;
    setLoading(false);
    setConversation([...conversation, { query: data.data.bot, type: "bot" }]);
  };
  const onAssistenceError = () => {};

  const { mutate: assist } = useAssistence(
    onAssistenceSuccess,
    onAssistenceError
  );
  const handleAssistence = (e) => {
    e.preventDefault();
    setQuery("");
    setConversation([...conversation, { query, type: "user" }]);
    assist(query);
    setLoading(true);
  };
  conversation, query;

  return (
    <div className=" min-h-[90vh] flex-col pb-32 bg-white relative mt-2 overflow-x-hidden">
      <Dialog open={showTagsDialog} className=" bg-[#f8f8f8]">
        <DialogTitle className="bg-[#f8f8f8]">Choose Tags (3)</DialogTitle>
        <DialogContent
          sx={{ maxWidth: "500px", height: "300px" }}
          className="bg-[#f8f8f8]"
        >
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="border-b border-black bg-[#f8f8f8] outline-none w-[90%] mb-4"
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlue={formik.handleBlur}
              placeholder="Create A Tag"
              className="border-b border-black bg-[#f8f8f8] outline-none w-[90%]"
            />
            <button
              type="submit"
              disabled={!formik.isValid}
              onClick={formik.handleSubmit}
              className=" cursor-pointer bg-black text-white w-6 h-6 flex justify-center items-center transition-all duration-300 rounded-full active:scale-90"
            >
              <AddIcon />
            </button>
          </div>
          <div className="flex overflow-y-scroll bg-white flex-wrap gap-1 sm:gap-2 pt-4">
            {filter?.map((tag, i) => (
              <div
                key={i}
                onClick={() => {
                  if (selectedTags.find((item) => item._id === tag._id)) {
                    setSelectedTags(
                      selectedTags.filter((item) => item._id !== tag._id)
                    );
                  } else {
                    if (selectedTags.length < 3) {
                      setSelectedTags([
                        ...selectedTags,
                        { ...tag, _key: i + 1 },
                      ]);
                    }
                  }
                }}
                className={`${
                  selectedTags.find((item) => item._id === tag._id)
                    ? "bg-[#f8f8f8] text-black"
                    : "bg-black text-white"
                } border-2 px-2 rounded-full text-xs w-fit sm:text-base disabled:bg-gray-500  py-1 hover:bg-[#f8f8f8] border-black hover:text-black cursor-pointer transition-all duration-300`}
              >
                {tag?.title}
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <button
            disabled={selectedTags.length < 3}
            onClick={() => {
              setShowTagsDialog(false);
              setImageDialog(true);
              if (selectedTags.length < 3) {
                dispatch(setErrorPopup(true));
                dispatch(setMessage("Please choose 3 tags"));
              }
            }}
            className=" sticky bottom-4 left-4 w-fit bg-gradient-to-r text-white from-[#ff7d69] to-blue-700 px-6 rounded-full active:scale-90 transition-all duration-300"
          >
            Next
          </button>
          <button
            className=" absolute top-4 right-4"
            onClick={() => {
              setShowTagsDialog(false);
            }}
          >
            <CloseIcon />
          </button>
        </DialogActions>
      </Dialog>
      <Dialog open={imageDialog}>
        <DialogTitle>Choose Banner Image</DialogTitle>
        <DialogContent className=" w-[500px] h-[200px]">
          <IconButton
            aria-label="upload picture"
            component="label"
            size="large"
            sx={{
              width: "fit-content",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
            className=" -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <input hidden accept="image/*" type="file" onChange={uploadImage} />
            <CameraAltIcon size="large" className="text-5xl" />
          </IconButton>
          <button
            className={`${
              image ? "text-white" : "text-black"
            } absolute top-4 right-4 z-50`}
            onClick={() => {
              setImageDialog(false);
            }}
          >
            <CloseIcon />
          </button>
          {image && (
            <img
              src={image}
              className=" absolute top-0 left-0 h-full w-full z-40"
            />
          )}
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              postHandler();
              setImageDialog(false);
            }}
            className=" absolute bottom-4 right-4 z-50 w-fit bg-gradient-to-r text-white from-[#ff7d69] to-blue-700 px-6 rounded-full active:scale-90 transition-all duration-300"
          >
            CREATE POST
          </button>
        </DialogActions>
      </Dialog>
      <div className=" w-[100%] bg-[#f8f8f8] flex flex-col gap-0 items-center relative overflow-x-hidden">
        <div
          className={` ${
            handleAssistenceToggle ? "top-20" : "top-40"
          } fixed right-2 !top-40 sm:right-10 z-40`}
          onClick={handleAssistenceToggle}
        >
          <Tooltip title="Assistence">
            <button>
              <img
                src="/assistence.png"
                className="bg-black h-8 w-8 sm:h-10 sm:w-10 rounded-full p-1"
              />
            </button>
          </Tooltip>
        </div>
        <div
          ref={assistenceRef}
          className="bg-[#262626] h-[100vh] w-screen absolute top-0 left-0 translate-x-[100%] transition-all duration-300 z-30 text-white flex justify-center text-xs p-10"
        >
          <div
            ref={containerRef}
            className=" h-full w-full flex flex-col gap-4 overflow-y-scroll pb-20 pr-4 sm:pr-20"
          >
            {conversation.map((item, i) =>
              item.type === "user" ? (
                <div className="flex gap-10 items-center px-2" key={i}>
                  <img src="/user-2.png" className="w-6 self-start" />
                  <p>{item.query}</p>
                </div>
              ) : (
                <div
                  className="flex gap-10 items-center bg-gray-700 rounded-2xl px-2 pr-12 py-2 relative"
                  key={i}
                >
                  <img src="/bot.png" className="w-6 self-start" />
                  <p>{item.query}</p>
                  {copy && copy.text === item.query ? (
                    <CopyToClipboard text={item.query}>
                      <button className=" text-green-500 active:scale-90 transition-all duration-200 absolute top-2 right-2">
                        <DoneIcon />
                      </button>
                    </CopyToClipboard>
                  ) : (
                    <CopyToClipboard text={item.query}>
                      <button
                        onClick={() => {
                          setCopy({
                            bool: true,
                            text: item.query,
                          });
                          setTimeout(() => {
                            setCopy(false);
                          }, 2000);
                        }}
                        className=" absolute top-2 right-2 active:scale-90 transition-all duration-200"
                      >
                        <ContentCopyIcon />
                      </button>
                    </CopyToClipboard>
                  )}
                </div>
              )
            )}
            {loading && (
              <div className="flex gap-10 items-center bg-gray-700 rounded-2xl px-2 py-2">
                <img src="/bot.png" className="w-6" />
                <ThreeDots
                  height="10"
                  width="100"
                  radius="2"
                  color="#ffffff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            )}
            <form
              onSubmit={handleAssistence}
              className="flex gap-2 items-center bg-gray-500 px-4  rounded-full justify-center absolute bottom-40 sm:bottom-20 w-[90%] py-1 -translate-x-4 sm:translate-x-0"
            >
              <input
                placeholder="Give more details to see better results"
                required
                value={query}
                type="text"
                className=" bg-gray-500 outline-none w-[100%] h-fit"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <button type="submit">
                <SendIcon className=" cursor-pointer active:scale-90 transition-all duration-300" />
              </button>
            </form>
          </div>
        </div>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="border-b font-bold  bg-[#f8f8f8] outline-none text-sm sm:text-xl md:text-2xl w-[90%] mt-14 pb-2 border-gray-200"
          placeholder="Title"
        />
        <div className=" min-h-screen bg-[#f8f8f8] w-screen">
          <TextEditor content={content} setContent={setContent} />
        </div>
        <button
          onClick={() => {
            setShowTagsDialog(true);
          }}
          className=" absolute bottom-2 right-4 bg-black text-white px-10 rounded-full hover:bg-[#f8f8f8] border-black hover:text-black border transition-all duration-300"
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default Create;
