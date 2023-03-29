import { create } from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools((set, get) => ({
    products: [],
    listProducts: [],
    categoryFilter: "",
    brandFilter: "",
    searchProducts: (words) =>set((state)=>({
      listProducts: state.products.filter(
        e=>{ return e.brand.toLowerCase().includes(words.toLowerCase()) || e.name.toLowerCase().includes(words.toLowerCase()) || e.model.toLowerCase().includes(words.toLowerCase())}
        )
    })),
    setListProducts: (listFilter) =>
      set((state) => ({ ...state, listProducts: listFilter })),
    setCategoryFilter: (category) =>
      set((state) => ({ ...state, categoryFilter: category })),
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
