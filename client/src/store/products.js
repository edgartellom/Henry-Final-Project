import { create } from "zustand";
import axios from "axios";
import { filterStringByProps } from "../utiles/filters/filters";

const useStore = create((set) => ({
  products: [],
  listProducts: [],
  searchProducts: (keys)=>set((state)=>({
    listProducts: filterStringByProps(state.products,keys,["name","brand", "model", "feature"]) 
  })),
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
