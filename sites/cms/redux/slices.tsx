import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  success: false,
  message: "",
  error: false,
  filter: "",
  user: null,
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setName, setSuccess, setError, setMessage, setFilter, setUser } =
  baseSlice.actions;
export default baseSlice.reducer;
