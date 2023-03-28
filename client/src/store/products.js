import { create } from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools((set, get) => ({
    products: [],
    listProducts: [],
    categoryFilter: "",
    categoryFilter2: "",
    brandFilter: "",
    setListProducts: (listFilter) =>
      set((state) => ({ ...state, listProducts: listFilter })),
    setCategoryFilter: (category) =>
      set((state) => ({ ...state, categoryFilter: category })),
    setCategoryFilter2: (category) =>
      set((state) => ({ ...state, categoryFilter2: category })),
    setBrandFilter: (brand) =>
      set((state) => ({ ...state, brandFilter: brand })),
    fetchProducts: async () => {
      try {
        const response = await axios.get("/products");
        set({ products: response.data, listProducts: response.data });
      } catch (error) {
        console.error(error);
      }
    },
  }))
);

export default useStore;
