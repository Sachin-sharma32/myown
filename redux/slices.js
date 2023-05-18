import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    posts: [],
    session: "",
    user: "",
    bookmarks: [],
    likes: [],
    categories: [],
    tags: [],
    message: "",
    error: false,
    success: false,
};

const baseSlice = createSlice({
    name: "base",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
            localStorage.setItem("mode", state.mode);
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setSession: (state, action) => {
            state.session = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.user;
        },
        setBookmarks: (state, action) => {
            state.bookmarks = action.payload;
        },
        setLiked: (state, action) => {
            state.likes = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setTags: (state, action) => {
            state.tags = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setErrorPopup: (state, action) => {
            state.error = action.payload;
        },
        setSuccessPopup: (state, action) => {
            state.success = action.payload;
        },
    },
});

export const {
    setMode,
    setPosts,
    setSession,
    setUser,
    setBookmarks,
    setLiked,
    setCategories,
    setTags,
    setMessage,
    setErrorPopup,
    setSuccessPopup,
} = baseSlice.actions;
export default baseSlice.reducer;
