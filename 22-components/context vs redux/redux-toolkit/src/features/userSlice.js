// src/features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userName: "John Doe" },
  reducers: {
    changeName: (state) => {
      state.userName = "Jane Smith";
    },
  },
});

export const { changeName } = userSlice.actions;
export default userSlice.reducer;
