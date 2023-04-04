import { create } from "zustand";

const useStore = create((set) => ({
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  cartItemsUser: [],

  addToCart: (action) => {
    set((state) => {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
      } else {
        let tempProductItem = { ...action, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      return state;
    });
  },

  getTotals: () => {
    set((state) => {
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
      return {
        cartTotalQuantity: quantity,
        cartTotalAmount: total,
      };
    });
  },
  //   addToCart: (action) => {
  //     set(state => {
  //       const existingIndex = state.cartItems.findIndex(
  //         (item) => item.id === action.id
  //       );
  //       if (existingIndex >= 0) {
  //         state.cartItems[existingIndex] = {
  //           ...state.cartItems[existingIndex],
  //           cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
  //           itemPrice : state.cartItems[existingIndex].itemPrice
  //         };
  //       } else {
  //         let tempProductItem = {
  //           ...action,
  //           cartQuantity: 1,
  //           itemPrice: action.price
  //         };
  //         state.cartItems = [...state.cartItems, tempProductItem];
  //       }
  //       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  //       return state;
  //     });

  //   },
  clearCart: () => {
    set({ cartItems: [] });
    localStorage.setItem("cartItems", JSON.stringify([]));
  },

  //Redux ToolKit

  // addToCart: (payload) => {
  //   set((state) => {
  //     const existingIndex = state.cartItems.findIndex(
  //       (item) => item.id === payload.id
  //     );

  //     if (existingIndex >= 0) {
  //       state.cartItems[existingIndex] = {
  //         ...state.cartItems[existingIndex],
  //         cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
  //         itemPrice: state.cartItems[existingIndex].itemPrice,
  //       };
  //     } else {
  //       let tempProductItem = {
  //         ...payload,
  //         cartQuantity: 1,
  //         itemPrice: state.cartItems.price, // change this(possibly error)

  //       };
  //       state.cartItems.push(tempProductItem);
  //     }
  //     localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // move around if not working
  //     return { cartItems: state.cartItems };
  //   });
  // },
}));
export default useStore;
