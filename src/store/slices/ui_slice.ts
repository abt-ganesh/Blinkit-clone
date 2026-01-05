import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  cartOpen: boolean;
};

const initialState: UIState = {
  cartOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCart: (state) => {
      state.cartOpen = true;
    },
    closeCart: (state) => {
      state.cartOpen = false;
    },
  },
});

export const { openCart, closeCart } = uiSlice.actions;
export default uiSlice.reducer;
