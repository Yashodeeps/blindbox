import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postText: ["hey there"],
  },
  reducers: {
    addPostText: (state, action) => {
      state.postText.unshift(action.payload);
    },
  },
});

export const { addPostText } = postSlice.actions;

export default postSlice.reducer;
