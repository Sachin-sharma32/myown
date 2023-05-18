import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Smooth from "../utils/Smooth";
import * as yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import Error from "../utils/Error";
import { client } from "../sanity";
import { useUpdateAccount } from "../hooks/content";
import { Alert, Checkbox } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import { useUploadImage } from "../routers/useImage";
import { useUpdateUser, useUserPosts } from "../routers/useUser";
import { setErrorPopup, setMessage, setSuccessPopup } from "../redux/slices";
import Select from "react-select";
import Post from "../components/Post";
import { PodcastsRounded } from "@mui/icons-material";
import Layout from "../components/Layout";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const Account = () => {
  const mode = useSelector((state) => state.base.mode);
  const user = useSelector((state) => state.base.user);
  const { data: posts, isLoading } = useUserPosts(user?._id);
  const success = useSelector((state) => state.base.success);
  const categories = useSelector((state) => state.base.categories);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [image, setImage] = useState("");
  const URL_REGEX =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const validationObject = yup.object({
    name: yup.string().required("This field is required").min(3),
    bio: yup.string().min(50, "Bio should be atleast 50 characters long"),
    websiteURL: yup.string().matches(URL_REGEX, "Please provide a valid URL"),
    location: yup
      .string()
      .min(3, "Location should be atleast 5 characters long"),
    work: yup.string().min(3, "Work should be atleast 5 characters long"),
    education: yup
      .string()
      .min(3, "Education should be atleast 5 characters long"),
    newsletter: yup.boolean(),
  });
  const onImageSuccess = (data) => {
    setImage(data.data);
    setLoading(false);
  };
  const { mutate: upload } = useUploadImage(onImageSuccess);
  const uploadImage = (e) => {
    const file = e.target.files[0];
    setLoading(true);
    upload(file);
  };
  let img = "";
  if (image) {
    img = image;
  } else if (user?.image) {
    img = user.image;
  } else {
    img = "/person.webp";
  }

  const [preferences, setPreferences] = useState(null);

  const dispatch = useDispatch();
  const onSuccess = () => {
    setBtnLoading(false);
    dispatch(setSuccessPopup(true));
    dispatch(setMessage("Account Updated Successfully"));
  };
  const onError = (err) => {
    dispatch(setErrorPopup(true));
    dispatch(setMessage(err.response.data.message));
  };
  const { mutate: updateUser } = useUpdateUser(onSuccess, onError);
  const submitHandler = async (values) => {
    setBtnLoading(true);
    const data = {
      name: values.name,
      email: values.email,
      websiteURL: values.websiteURL,
      location: values.location,
      education: values.education,
      preferences: preferences?.map((preference) => preference.value),
      newsletter: values.newsletter,
      work: values.work,
      bio: values.bio,
      bookmarks: values.bookmarks,
      image,
    };
    updateUser({ data, userId: user._id });
  };
  user;
  const initialValues = {
    name: user?.name,
    email: user?.email,
    websiteURL: user?.websiteURL,
    location: user?.location,
    education: user?.education,
    work: user?.work,
    bio: user?.bio,
    bookmarks: user.bookmarks,
    newsletter: user?.newsletter ? user.newsletter : false,
  };
  if (user) {
    return (
      <Layout>
        <Head>
          <title>TBFE - {user?.name}</title>
          <link rel="icon" type="image/png" href="/site-light-chopped.jpg" />
        </Head>
        <Smooth
          className={`${
            mode == "dark" ? "text-white" : "text-black bg-[#f8f8f8]"
          }  p-10 flex flex-col items-center text-xs min-h-screen`}
        >
          <div
            className={`${
              mode == "dark" ? "bg-[#262626] shadow-black" : "bg-[#f8f8f8]"
            } shadow-lg  w-[90vw] md:w-fit h-fit rounded-sm p-4 sm:p-10 relative mt-10`}
          >
            <div className=" flex items-center justify-center w-20 h-20 overflow-hidden rounded-full absolute -top-10 shadow-md shadow-black left-1/2 -translate-x-1/2">
              <img src={img} alt="user profile image" />
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={submitHandler}
              validateOnBlur={true}
              validateOnChange={true}
              validationSchema={validationObject}
            >
              {(props) => {
                return (
                  <Form className=" grid grid-col-1 md:grid-cols-2 gap-10 mt-10 w-[100%]">
                    <div className="flex flex-col gap-8 w-[100%] items-center sm:items-stretch">
                      <div className="flex gap-4 items-center">
                        <p className=" w-[100px] hidden sm:flex">User Name</p>
                        <div className="w-[300px] md:w-[500px] relative">
                          <Field
                            type="text"
                            name="name"
                            value={props.values.name}
                            placeholder="User Name"
                            className=" border-b bg-[#f8f8f8] w-full  h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                          />
                          <ErrorMessage name="name" component={Error} />
                        </div>
                      </div>
                      <div className="flex gap-4 items-center relative">
                        <p className=" w-[100px] hidden sm:flex">Email</p>
                        <input
                          readOnly
                          type="text"
                          name="email"
                          value={props.values.email}
                          placeholder="Email"
                          className=" bg-gray-200 w-[300px] md:w-[500px] h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                        />
                      </div>
                      <div className="flex gap-4 items-center relative">
                        <p className=" w-[100px] hidden sm:flex">Bio</p>
                        <div className="w-[300px] md:w-[500px]">
                          <Field
                            as="textarea"
                            name="bio"
                            cols="30"
                            rows="5"
                            className=" bg-[#f8f8f8] w-full text-black p-4 mt-4 border-b-2 shadow-sm rounded-2xl outline-none"
                            placeholder="Tell us about yourself"
                          ></Field>
                          <ErrorMessage name="bio" component={Error} />
                        </div>
                      </div>
                      <div className="flex gap-4 items-center relative">
                        <p className=" w-[100px] hidden sm:flex">Website URL</p>
                        <div className="w-[300px] md:w-[500px]">
                          <Field
                            type="text"
                            name="websiteURL"
                            placeholder="https://www.google.com"
                            className=" bg-[#f8f8f8] w-full h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                          />
                          <ErrorMessage name="websiteURL" component={Error} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-8 items-center sm:items-stretch">
                      <div className="flex items-center relative">
                        <p className=" w-[100px] hidden sm:flex">Image</p>
                        <div className="relative w-fit">
                          <input
                            type="file"
                            onChange={uploadImage}
                            className=" absolute opacity-0 w-10 h-12 cursor-pointer"
                          />
                          {loading ? (
                            <CircularProgress color="inherit" size="46px" />
                          ) : mode == "dark" ? (
                            <Image
                              src="/upload.png"
                              width="50"
                              height="50"
                              alt="Image Upload Icon"
                            />
                          ) : (
                            <Image
                              src="/upload-dark.png"
                              width="50"
                              height="50"
                              alt="Image Upload Icon"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 items-center relative">
                        <p className=" w-[100px] hidden sm:flex">Location</p>
                        <div className="w-[300px] md:w-[500px]">
                          <Field
                            type="text"
                            name="location"
                            placeholder="London,England"
                            className=" bg-[#f8f8f8] w-full h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                          />
                          <ErrorMessage name="location" component={Error} />
                        </div>
                      </div>
                      <div className="flex gap-4 items-center relative">
                        <p className=" w-[100px] hidden sm:flex">Work</p>
                        <div className="w-[300px] md:w-[500px]">
                          <Field
                            type="text"
                            name="work"
                            placeholder="Senior Software Developer @Google"
                            className=" bg-[#f8f8f8] w-full h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                          />
                          <ErrorMessage name="work" component={Error} />
                        </div>
                      </div>
                      <div className="flex gap-4 items-center relative">
                        <p className="w-[100px] hidden sm:flex">Education</p>
                        <div className="w-[300px]  md:w-[500px]">
                          <Field
                            type="text"
                            name="education"
                            placeholder="Bachlors In Computer Science"
                            className=" bg-[#f8f8f8] w-full h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                          />
                          <ErrorMessage name="education" component={Error} />
                        </div>
                      </div>
                      <div className="flex gap-4 items-center relative">
                        <p className="w-[100px] hidden sm:flex">Preferences</p>
                        <Select
                          className="text-black"
                          onChange={setPreferences}
                          defaultValue={user?.preferences?.map((preference) => {
                            return {
                              value: preference,
                              label: preference.title,
                            };
                          })}
                          // className="w-[415px] h-10 px-4 text-black shadow-md outline-none"
                          placeholder="Preferences"
                          isMulti
                          options={categories.map((category, i) => {
                            return {
                              value: category,
                              label: category.title,
                            };
                          })}
                        ></Select>
                        <ErrorMessage name="education" component={Error} />
                      </div>
                      <div className="flex gap-4 items-center relative">
                        <p className="w-[100px] ">Newsletter</p>
                        <Checkbox
                          name="newsletter"
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxIcon />}
                          checked={props.values.newsletter}
                          value={props.values.newsletter}
                          onClick={props.handleChange}
                          sx={{
                            width: "fit-content",
                          }}
                        />
                      </div>
                      <button
                        className={`${
                          mode == "light" ? "text-white" : "text-black"
                        } transition-all duration-200 min-w-[100px] bg-gradient-to-r disabled:opacity-60 disabled:hover:scale-100 disabled:active:scale-100 from-[#ff7d69] to-blue-700 w-fit self-end rounded-2xl p-2 hover:scale-110 active:scale-100 font-semibold`}
                        type="submit"
                        disabled={!props.isValid && !loading}
                      >
                        {btnLoading && (
                          <div className="flex gap-1 items-center justify-center">
                            <CircularProgress size="1rem" color="inherit" />
                            <p>Saving...</p>
                          </div>
                        )}
                        {success && <p>Saved</p>}
                        {!btnLoading && !success && <p>Save Changes</p>}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <section className=" p-10 md:w-[100%] flex flex-col justify-center items-center gap-2 md:gap-10">
            <div>
              <h3 className=" text-3xl text-center mb-10 bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent font-bold">
                MY POSTS
              </h3>
            </div>
            {isLoading ? (
              <CircularProgress color="inherit" size="46px" />
            ) : posts?.length > 0 ? (
              <div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
              >
                {posts?.map((post, i) => (
                  <Post post={post} key={i} />
                ))}
              </div>
            ) : (
              <div>You have not created any posts yet</div>
            )}
          </section>
        </Smooth>
      </Layout>
    );
  } else {
    return <div className="min-h-screen"></div>;
  }
};

export default Account;
