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
    searchProducts: (words) =>set((state)=>({
      listProducts: state.products.filter(
        e=>{ return e.brand.toLowerCase().includes(words.toLowerCase()) || e.name.toLowerCase().includes(words.toLowerCase()) || e.model.toLowerCase().includes(words.toLowerCase())}
        )
    })),
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
    filterId: async (id) => {
      try {
        const responseId = await axios.get("products/" + id);
        set({ detailProduct: responseId.data });
      } catch (error) {
        console.log(error);
      }
    },
  }))
);

export default useStore;
