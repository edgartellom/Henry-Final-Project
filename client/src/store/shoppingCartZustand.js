import { create } from "zustand";
import axios from "axios";

const useCartStore = create((set) => ({
  cart: [],
  getProductById: async (productId) => {
    try {
      const response = await axios.get(`/cartDetails/${productId}`);
      //   set((state) => ({ cart: [...state.cart, response.data] }));
      set({ cart: response.data });
    } catch (error) {
      console.error(error);
    }
  },

  createProduct: async (product) => {
    try {
      const response = await axios.post(`/cartDetails`, product);
      set((state) => ({ cart: [...state.cart, response.data] }));
    } catch (error) {
      console.error(error);
    }
  },
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
