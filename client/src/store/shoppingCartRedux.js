import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchById = createAsyncThunk('cart/fetchById', async (id) => {
  // const response = await axios.get(`http://localhost:3001/cartDetails/${id}`);
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
  //https://jsonplaceholder.typicode.com/todos/1
  return response.data;
});

const initialState = {
  //cartItems: [],
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  dataList:[]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //adicional
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.dataList.findIndex((item) => item.id === action.payload.id);
        if (index === -1) {
          // Add new item to the list if it doesn't already exist
          state.dataList = [...state.dataList, action.payload];
        } else {
          // Replace existing item in the list
          state.dataList[index] = action.payload;
        }
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    }
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart, addItem } =
  cartSlice.actions;

export default cartSlice.reducer;
