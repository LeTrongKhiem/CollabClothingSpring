import {createSlice} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";

export const authSlice = createSlice({
    name: "auth", initialState: {
        isLoggedIn: false, user: null,
    }, reducers: {
        login: (state) => {
            state.isLoggedIn = true;
            localStorage.setItem("isLoginAdmin", "true");
        }, logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem("isLoginAdmin")
            localStorage.removeItem("adminToken");
        },
    },
});

export const {login, logout} = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export default authSlice.reducer;
