import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productModalReducer from "./slice/productModalSlice";
import cartItemsReducer from "./slice/cartItemsSlice"
const rootReducer = combineReducers({
  // Add your reducers here
  auth: authReducer,
  productModal: productModalReducer,
  cartItems: cartItemsReducer

});
export const store = configureStore({
  reducer: rootReducer,
});
