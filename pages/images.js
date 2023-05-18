import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { useSelector } from "react-redux";
import { imageBuilder } from "../sanity";
import { saveAs } from "file-saver";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useState } from "react";
import { useMemo } from "react";
import ErrorBoundry from "../utils/ErrorBoundry";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function BasicMasonry() {
    const posts = useSelector((state) => state.base.posts);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const images = useMemo(() => {
        return posts.map((post) => {
            return post?.image;
        });
    }, [posts]);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const mode = useSelector((state) => state.base.mode);
    return (
        <Layout className="p-4">
            <div className=" mt-2 max-h-screen overflow-y-scroll image-scrollbar min-h-screen">
                <motion.div
                    layout
                    className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2"
                >
                    {images.map((image, index) => (
                        <ErrorBoundry key={index}>
                            <Item
                                sx={{
                                    width: "100%",
                                    marginBottom: "10px",
                                }}
                                className="rounded-2xl"
                            >
                                <img
                                    src={image}
                                    alt="post image"
                                    className=" h-full w-full rounded-2xl"
                                    onClick={() => {
                                        setSelectedImage(image);
                                        handleToggle();
                                    }}
                                />
                            </Item>
                        </ErrorBoundry>
                    ))}
                </motion.div>
                {images.length > 0 && selectedImage && (
                    <div>
                        <Backdrop
                            sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={open}
                            onClick={handleClose}
                            className=""
                        >
                            <div className="w-[100%] h-[100%] flex justify-center items-center">
                                <div className=" w-[90%] lg:w-[50%] relative bg-[#f8f8f8] border-8 rounded-3xl border-white">
                                    <img
                                        src={selectedImage}
                                        alt=""
                                        className=" w-[100%] h-96 rounded-3xl"
                                    />
                                    <CloseIcon
                                        className=" absolute top-2 right-2 cursor-pointer"
                                        onClick={() => {
                                            handleClose();
                                            setSelectedImage(null);
                                        }}
                                    />
                                    <CloudDownloadIcon
                                        className=" absolute bottom-2 right-2 text-5xl cursor-pointer text-white"
                                        onClick={() => {
                                            saveAs(selectedImage, "image.jpg");
                                        }}
                                    />
                                </div>
                            </div>
                        </Backdrop>
                    </div>
                )}
            </div>
        </Layout>
    );
}

BasicMasonry.getInitialProps = async (context) => {
    return {
        title: "Image Gallery | The Blog For Everything",
        image: "/site-light-chopped.jpg",
        summery:
            "Image Gallery | The Blog For Everything. This is the image gallery of the blog for everything. You can see all the images of the posts here.",
        keywords:
            "image gallery, images, gallery, the blog for everything, theblogforeverything, the blog for everything image gallery, theblogforeverything image gallery, the blog for everything images, theblogforeverything images, the blog for everything gallery, theblogforeverything gallery",
        type: "website",
        imageAlt: "The Blog For Everything log",
        parameter: "images",
    };
};
