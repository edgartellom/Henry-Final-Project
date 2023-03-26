import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './ShoppingCartRedux'

export const store = configureStore({
  reducer: {
    cart: cartSlice
  },
});

export default store;
