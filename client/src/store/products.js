import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await axios.get("/products");
      set({ products: response.data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useStore;
