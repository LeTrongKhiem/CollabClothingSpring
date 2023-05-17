import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
  value: items,
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const duplicate = state.value.filter(
        (e) =>
          e.id === newItem.id &&
          e.color === newItem.color &&
          e.size === newItem.size
      );

      if (duplicate.length > 0) {
        state.value = state.value.filter(
          (e) =>
            e.id !== newItem.id ||
            e.color !== newItem.color ||
            e.size !== newItem.size
        );
        state.value = [
          ...state.value,
          {
            id: newItem.id,
            color: newItem.color,
            size: newItem.size,
            price: newItem.price,
            quantity: newItem.quantity + duplicate[0].quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...action.payload,
          },
        ];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.value));
    },
    updateItem: (state, action) => {
      const newItem = action.payload;
      const item = state.value.filter(
        (e) =>
          e.id === newItem.id &&
          e.color === newItem.color &&
          e.size === newItem.size
      );

      if (item.length > 0) {
        state.value = state.value.filter(
          (e) =>
            e.id !== newItem.id ||
            e.color !== newItem.color ||
            e.size !== newItem.size
        );

        state.value = [
          ...state.value,
          {
            id: newItem.id,
            color: newItem.color,
            size: newItem.size,
            price: newItem.price,
            quantity: newItem.quantity,
          },
        ];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.value));
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.value = state.value.filter(
        (e) =>
          e.id !== item.id || e.color !== item.color || e.size !== item.size
      );
      localStorage.setItem("cartItems", JSON.stringify(state.value));
    },
    clearCart: (state) => {
      state.value = [];
      localStorage.setItem("cartItems", JSON.stringify(state.value));
    },
    save_url: (state, action) => {
      state.previousURL = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem, clearCart, save_url } =
  cartItemsSlice.actions;
export const selectCartItems = (state) => state.cartItems.value;
export default cartItemsSlice.reducer;
