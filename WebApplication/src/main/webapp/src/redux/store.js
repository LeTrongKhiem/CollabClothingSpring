import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
const rootReducer = combineReducers({
  // Add your reducers here
  auth: authReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
