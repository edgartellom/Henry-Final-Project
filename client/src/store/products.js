import {create} from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  products: [],
  listProducts: [],
  fetchProducts: async () => {
    try {
      const response = await axios.get(
        "https://64123f366e3ca317530a7aba.mockapi.io/api/products"
      );
      set({ products: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  searchProducts: (words)=>set((state) => ({
    listProducts: [...state.products.filter(product =>words.includes(product.name, product.brand, product.model, product.feature))]
  }))
}));

export default useStore;
