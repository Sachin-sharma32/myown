const { configureStore } = require("@reduxjs/toolkit");
import baseReducer from "./slices";

const cmsStore = configureStore({
  reducer: {
    base: baseReducer,
  },
});

export default cmsStore;
