import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import ThemeReducer from "./slice/ThemeSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    theme: ThemeReducer,
});
const store = configureStore({
    reducer: rootReducer,
});

export default store;
