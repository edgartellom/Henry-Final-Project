// import { configureStore } from "@reduxjs/toolkit";
// import cartSlice from "./shoppingCartRedux"

// export const store = configureStore({
//   reducer: {
//     cart: cartSlice,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shoppingCartRedux.js";


export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
