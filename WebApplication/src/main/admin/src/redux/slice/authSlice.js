import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      const user = { email: action.payload.email };
      state.isLoggedIn = true;
      state.user = user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export default authSlice.reducer;
