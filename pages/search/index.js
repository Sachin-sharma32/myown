import React, { Fragment, useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import Posts from "../../components/Posts";

const Search = () => {
    return (
        <Layout>
            <Posts values={{ title: "ALL POSTS", filter: "", type: "" }} />
        </Layout>
    );
};

export default Search;
