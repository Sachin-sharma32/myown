import { Alert, Avatar, CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import RelatedPosts from "../../components/RelatedPosts";
import Author from "../../components/Author";
import Smooth from "../../utils/Smooth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment/moment";
import Link from "next/link";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Error from "../../utils/Error";
import axios from "axios";
import LikeCommentIcon from "../../utils/LikeCommentIcon";
import Head from "next/head";
import BookmarkBtn from "../../utils/BookmarkBtn";
import Like from "../../utils/LikeIcon";
import { useAddComment, useGetComments } from "../../routers/useComment";
import EastIcon from "@mui/icons-material/East";
import ErrorBoundry from "../../utils/ErrorBoundry";
import { motion } from "framer-motion";
import {
  FacebookShareButton,
  FacebookShareCount,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import ShareIcon from "@mui/icons-material/Share";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Layout from "../../components/Layout";

const Post = ({ post }) => {
  const router = useRouter();
  const { data: comments } = useGetComments(post._id);
  const [loading, setLoading] = useState(false);
  const [editor, setEditor] = useState(null);
  const mode = useSelector((state) => state.base.mode);
  const user = useSelector((state) => state.base.user);
  const [comment, setComment] = useState("");
  const [copy, setCopy] = useState(false);

  const initialValues = {
    name: "",
    comment: "",
    email: "",
  };

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validationObject = yup.object({
    name: yup.string().required("This field is required").min(3),
    email: yup
      .string()
      .required()
      .matches(EMAIL_REGEX, "Please provide a valid email address"),
  });
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }, [success]);
  const { mutate: createComment } = useAddComment();
  const submitHandler = async (values, { resetForm }) => {
    values = {
      name: values.name,
      email: values.email,
      message: values.comment,
    };
    createComment({ postId: post._id, data: values });
    resetForm({ values: "" });
    setLoading(false);
    setSuccess(true);
  };
  const submitUserHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const values = {
      name: user.name,
      email: user.email,
      message: comment,
    };
    createComment({ postId: post._id, data: values });
    setComment("");
    setLoading(false);
    setSuccess(true);
  };
  const [effect, setEffect] = useState(null);
  useEffect(() => {
    if (post) {
      if (mode === "light") {
        setEffect(
          `linear-gradient(rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 90%, rgb(255, 255, 255) 100%),url("${post.image}")`
        );
      } else {
        setEffect(
          `linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgb(0, 0, 0,.8) 50%, rgba(0, 0, 0, 0.9) 90%, rgb(0, 0, 0) 100%),url("${post.image}")`
        );
      }
    }
  }, [mode, post]);
  const [bookmarkSuccess, setBookmarkSuccess] = useState(false);
  const [likeSuccess, setLikeSuccess] = useState(false);
  useEffect(() => {
    if (bookmarkSuccess) {
      setTimeout(() => {
        setBookmarkSuccess(false);
      }, 5000);
    }
    if (likeSuccess) {
      setTimeout(() => {
        setLikeSuccess(false);
      }, 5000);
    }
  }, [bookmarkSuccess, likeSuccess]);
  const postCentent = post?.content
    ?.replaceAll("<h1>", '<h1 class="text-2xl font-poppins font-bold mb-0">')
    .replaceAll("<h2>", '<h2 class="text-xl font-poppins font-bold mb-0">')
    .replaceAll("<h3>", '<h3 class="text-3xl font-poppins font-bold mb-0">')
    .replaceAll("<h4>", '<h4 class="text-2xl font-poppins font-bold mb-0">')
    .replaceAll("<h5>", '<h5 class="text-xl font-poppins font-bold mb-0">')
    .replaceAll("<h6>", '<h6 class="text-lg font-poppins font-bold mb-0">')
    .replaceAll("<ul>", '<ul class="list-disc font-poppins font-normal">')
    .replaceAll("<ol>", '<ol class="list-decimal font-poppins font-normal">')
    .replaceAll("<ul>", "<ul font-poppins>")
    .replaceAll("<li>", '<li class="mb-0 font-poppins">')
    .replaceAll(
      "<pre",
      '<pre class="bg-gray-100 p-4 rounded-md text-black overflow-scroll max-w-[500px] max-h-[300;x] mb-0 m-auto font-poppins'
    )
    .replaceAll("<img", "<img class='h-[300px] m-auto w-[500px] mb-0'")
    .replaceAll(
      "<blockquote font-poppins>",
      '<blockquote class="p-4 pl-2 h-fit border-l-4 border-orange-500 bg-orange-100 text-gray-500 rounded-lg font-bold mb-0 text-center quote font-poppins">'
    )
    .replaceAll(
      "<a",
      '<a class="text-blue-500 hover:border-b pb-1 font-poppins"'
    )
    .replaceAll("<p>", '<p class="mb-0 font-normal font-poppins">');

  const linksRef = useRef();
  const handleLinks = () => {
    if (linksRef.current.classList.contains("hidden")) {
      linksRef.current.classList.add("flex");
      linksRef.current.classList.remove("hidden");
    } else {
      linksRef.current.classList.remove("flex");
      linksRef.current.classList.add("hidden");
    }
  };
  if (post) {
    return (
      <Layout>
        <Smooth
          className={`${
            mode == "light" ? "text-black" : "text-white"
          }h-[100%] bg-no-repeat bg-fixed bg-center pb-32`}
          style={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundImage: `${effect}`,
          }}
        >
          {bookmarkSuccess && (
            <Alert
              security="success"
              className="absolute top-20 left-1/2 -translate-x-1/2"
            >
              <Link href="/bookmark">MY BOOKMARKS</Link>
            </Alert>
          )}
          {post && (
            <article
              className={`${
                mode === "light" ? "text-black" : "text-white"
              } px-4 md:px-10 py-4 md:py-8 flex flex-col lg:flex-row lg:gap-10`}
            >
              <div className=" w-[100%] lg-[70%]">
                <section
                  className={`${
                    mode == "dark" ? "text-[#eb9586]" : "text-black"
                  } flex gap-4 text-xs`}
                >
                  {post?.tags?.map((item, i) => (
                    <Link href={`/search/${item.title}`} key={i}>
                      <p className=" hover:scale-125 transition-all duration-200 cursor-pointer">
                        #{item.title}
                      </p>
                    </Link>
                  ))}
                </section>
                <h1 className=" mt-2 md:mt-8 text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#ff7d69] to-blue-700 text-transparent bg-clip-text">
                  {post.title}
                </h1>
                <div className="flex items-center gap-2">
                  <div
                    className={`${
                      mode === "dark" ? "text-white" : "text-black"
                    } mt-4 flex gap-2 sm:gap-2 text-xs items-center z-50`}
                  >
                    <Avatar src={post?.author?.image} />
                    <figcaption className=" sm:flex gap-6">
                      <p className=" relative w-fit">
                        {post?.author?.name}
                        {post.author?.isVerified ||
                          (post.author?.isAdmin && (
                            <img
                              src="/verified.png"
                              alt="verifie"
                              className="w-4 absolute -top-1 -right-4"
                            />
                          ))}
                      </p>
                      <p>on {moment(post.publishedAt).format("ll")}</p>
                    </figcaption>
                    <BookmarkBtn post={post} setSuccess={setBookmarkSuccess} />
                    <button
                      className={`${
                        mode === "dark" ? "text-white" : "text-black"
                      } p-1 pr-2 h-8 w-8 flex justify-center items-center rounded-full share-button`}
                      onClick={handleLinks}
                    >
                      <ShareIcon />
                    </button>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    ref={linksRef}
                    className={`${
                      mode === "dark"
                        ? "text-white bg-[#f8f8f8]"
                        : "text-black bg-[#262626]"
                    } mt-4 gap-1 text-xs items-center hidden flex-wrap px-2 py-1 rounded-full share-icons`}
                  >
                    <FacebookShareButton
                      url={`https://theblogforeverything.com/post/${post._id}`}
                    >
                      <FacebookIcon
                        size={20}
                        round={true}
                        className={`${
                          mode === "dark" ? "text-black" : "text-white"
                        }`}
                      />
                    </FacebookShareButton>
                    <LinkedinShareButton
                      url={`https://theblogforeverything.com/post/${post._id}`}
                    >
                      <LinkedInIcon
                        size={20}
                        round={true}
                        className={`${
                          mode === "dark" ? "text-black" : "text-white"
                        }`}
                      />
                    </LinkedinShareButton>
                    <RedditShareButton
                      url={`https://theblogforeverything.com/post/${post._id}`}
                    >
                      <RedditIcon
                        size={20}
                        round={true}
                        className={`${
                          mode === "dark" ? "text-black" : "text-white"
                        }`}
                      />
                    </RedditShareButton>
                    <TwitterShareButton
                      url={`https://theblogforeverything.com/post/${post._id}`}
                    >
                      <TwitterIcon
                        size={20}
                        round={true}
                        className={`${
                          mode === "dark" ? "text-black" : "text-white"
                        }`}
                      />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={`https://theblogforeverything.com/post/${post._id}`}
                    >
                      {mode === "dark" ? (
                        <img
                          src="/watsapp-black.png"
                          className="w-6"
                          round={true}
                        />
                      ) : (
                        <img
                          src="/watsapp-white.png"
                          className="w-6"
                          round={true}
                        />
                      )}
                    </WhatsappShareButton>
                  </motion.div>
                </div>
                <main
                  className={`${
                    mode == "dark"
                      ? "bg-[#262626] text-white"
                      : "bg-[#f8f8f8] text-[#262626]"
                  } mt-4 md:mt-10  p-4 sm:p-10 shadow-xl text-xs sm:text-base relative py-4 rounded-2xl`}
                  style={{ fontFamily: "Inter" }}
                >
                  <div
                    className="leading-[1.9] p-4 sm:p-0"
                    dangerouslySetInnerHTML={{
                      __html: postCentent,
                    }}
                  />
                  <div className="flex justify-end gap-3 relative mt-4">
                    <Like post={post} setSuccess={setLikeSuccess} />
                    {likeSuccess && (
                      <Alert
                        security="success"
                        className="absolute bottom-24 right-14 translate-x-1/2"
                      >
                        <Link href="/like">MY LIKES</Link>
                      </Alert>
                    )}
                    {bookmarkSuccess && (
                      <Alert
                        security="success"
                        className="absolute bottom-10 right-14 translate-x-1/2 z-50"
                      >
                        <Link href="/bookmark">MY BOOKMARKS</Link>
                      </Alert>
                    )}
                  </div>
                </main>
                <section
                  className={`${
                    mode == "dark" ? "bg-gray-800" : "bg-gray-100 text-black"
                  }  mt-10
                                    p-4
                                    flex
                                    flex-col
                                    items-center shadow-xl text-xs md:text-base rounded-2xl`}
                >
                  <div className=" pb-1 bg-gradient-to-r from-[#ff7d69] to-blue-700 h-7">
                    <h3
                      className={`${
                        mode == "dark" ? "bg-gray-800" : "bg-gray-100"
                      } font-bold mb-10 text-base`}
                    >
                      COMMENT
                    </h3>
                  </div>
                  {!user ? (
                    <Formik
                      initialValues={initialValues}
                      validateOnBlur={true}
                      validateOnChange={true}
                      validationSchema={validationObject}
                      onSubmit={submitHandler}
                    >
                      {(props) => {
                        {
                        }
                        return (
                          <Form className="flex flex-col justify-center items-center gap-6  w-fit ">
                            <div className="w-[100%] sm:w-fit">
                              <Field
                                as="textarea"
                                name="comment"
                                values={props.values.comment}
                                cols="30"
                                rows="5"
                                className=" bg-[#f8f8f8]  w-[350px] md:w-[500px] text-black p-4 mt-4 border-b-2 shadow-sm rounded-2xl outline-none"
                                placeholder="Write a comment..."
                              ></Field>
                              <ErrorMessage name="comment" component={Error} />
                            </div>
                            <div className="flex flex-col gap-6 w-[100%]">
                              <div className="w-[100%] sm:w-fit relative">
                                <Field
                                  type="text"
                                  value={props.values.name}
                                  name="name"
                                  placeholder="Name"
                                  className=" bg-[#f8f8f8] w-[350px] md:w-[500px] h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                />
                                <ErrorMessage name="name" component={Error} />
                              </div>
                              <div className="w-[100%] sm:w-fit relative">
                                <Field
                                  type="text"
                                  value={props.values.email}
                                  name="email"
                                  placeholder="Email"
                                  className=" bg-[#f8f8f8] w-[350px] md:w-[500px] h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                />
                                <ErrorMessage name="email" component={Error} />
                              </div>
                            </div>
                            <button
                              className={`${
                                mode == "light" ? "text-white" : "text-black"
                              } transition-all duration-200 min-w-[100px] bg-gradient-to-r disabled:opacity-60 disabled:hover:scale-100 disabled:active:scale-100 from-[#ff7d69] to-blue-700 w-fit self-end rounded-2xl p-2 hover:scale-110 active:scale-100 font-semibold`}
                              type="submit"
                              disabled={!props.isValid}
                            >
                              {loading && (
                                <div className="flex gap-1 items-center justify-center">
                                  <CircularProgress
                                    size="1rem"
                                    color="inherit"
                                  />
                                  <p>Posting...</p>
                                </div>
                              )}
                              {success && <p>Posted</p>}
                              {!loading && !success && <p>POST COMMENT</p>}
                            </button>
                          </Form>
                        );
                      }}
                    </Formik>
                  ) : (
                    <form
                      className="flex flex-col justify-center items-center gap-6  w-fit relative"
                      onSubmit={submitUserHandler}
                    >
                      <textarea
                        minLength="5"
                        name=""
                        id=""
                        cols="30"
                        value={comment}
                        className=" bg-[#f8f8f8]  w-[350px] md:w-[500px] text-black p-4 mt-4 border-b-2 shadow-sm rounded-2xl outline-none"
                        rows="10"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        required
                      ></textarea>
                      <button
                        className={`${
                          mode == "light" ? "text-white" : "text-black"
                        } transition-all duration-200 min-w-[120px] bg-gradient-to-r disabled:opacity-60 disabled:hover:scale-100 disabled:active:scale-100 from-[#ff7d69] to-blue-700 w-fit self-end rounded-2xl p-2 hover:scale-110 active:scale-100 font-semibold`}
                        type="submit"
                      >
                        {loading && (
                          <div className="flex gap-1 items-center justify-center">
                            <CircularProgress size="1rem" color="inherit" />
                            <p>Posting...</p>
                          </div>
                        )}
                        {success && <p>Posted</p>}
                        {!loading && !success && <p>POST COMMENT</p>}
                      </button>
                      {success && (
                        <div className=" absolute top-10">
                          <Alert severity="success">
                            Comment Posted Successfully
                          </Alert>
                        </div>
                      )}
                    </form>
                  )}
                </section>
                <section className=" mt-10 text-xs md:text-base">
                  {comments && comments?.comments?.length > 0 && (
                    <article>
                      {comments.comments.slice(0, 3).map((item, i) => (
                        <div
                          className="border-t-[1px] border-white mt-4"
                          key={i}
                        >
                          <div>
                            <h5 className=" text-2xl font-semibold">
                              {item.name}
                            </h5>
                            <p className=" text-xs">
                              # {moment(item.publishedAt).format("ll")}
                            </p>
                          </div>
                          <div className=" mt-2 bg-[#f8f8f8] p-4 pr-20 rounded-2xl text-black">
                            <div className="relative">
                              <p>{item.message}</p>
                              <div className=" absolute -bottom-4 -right-16 flex gap-6">
                                <LikeCommentIcon
                                  comments={comments}
                                  comment={item}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Link
                        href={`/comments/${post._id}`}
                        className={`${
                          mode == "dark" ? "text-white" : "text-black"
                        } flex gap-2 hover:gap-4 justify-center items-center self-end duration-200 transition-all mt-6`}
                      >
                        <p>SEE ALL REVIEWS</p>
                        <EastIcon />
                      </Link>
                    </article>
                  )}
                </section>
              </div>
              <aside className=" lg:w-[30%] mt-8 flex flex-col justify-center items-center md:justify-start md:flex-row lg:flex-col gap-2 lg:gap-8">
                {post.author && (
                  <div
                    className={`${
                      mode === "dark" ? "bg-black" : "bg-[#f8f8f8]"
                    } bg-[#f8f8f8] rounded-2xl overflow-hidden shadow-xl w-fit h-fit`}
                  >
                    <ErrorBoundry>
                      <Author author={post.author} />
                    </ErrorBoundry>
                  </div>
                )}
                <div
                  className={`${
                    mode === "dark" ? "bg-black" : "bg-[#f8f8f8]"
                  } rounded-2xl overflow-hidden sticky top-16 shadow-xl w-fit`}
                >
                  <ErrorBoundry>
                    <RelatedPosts post={post} />
                  </ErrorBoundry>
                </div>
              </aside>
            </article>
          )}
        </Smooth>
      </Layout>
    );
  } else {
    return <div className="min-h-screen"></div>;
  }
};

export default Post;

export async function getServerSideProps(context) {
  const post = await axios.get(
    `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/posts/${context.params.post}`
  );
  return {
    props: {
      post: post.data.data.doc,
      title: post.data.data.doc.title,
      image: post.data.data.doc.image,
      summery: post.data.data.doc.summery,
      keywords: post.data.data.doc.tags.map((tag) => tag.title).toString(),
      type: "website",
      imageAlt: post.data.data.doc.title,
      id: post.data.data.doc._id,
    },
  };
}
