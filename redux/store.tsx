import { configureStore } from "@reduxjs/toolkit";
import baseSlice from "./slices";

const store = configureStore({
    reducer: {
        base: baseSlice,
    },
});

export default store;
