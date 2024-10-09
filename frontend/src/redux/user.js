import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      authenticated: false
    }
  },
  reducers: {
    loginUser: (state, action) => {
      state.value = {
        ...action.payload,
        authenticated: true
      }
    },
    logoutUser: (state) => {
      state.value = {
        authenticated: false
      }
    },
  },
});

export default userSlice.reducer;
export const { loginUser, logoutUser } = userSlice.actions;