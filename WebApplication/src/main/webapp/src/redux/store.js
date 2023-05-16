import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productModalReducer from "./slice/productModalSlice";
const rootReducer = combineReducers({
  // Add your reducers here
  auth: authReducer,
  productModal: productModalReducer,

});
export const store = configureStore({
  reducer: rootReducer,
});
