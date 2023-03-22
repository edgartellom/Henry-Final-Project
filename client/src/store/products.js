import { create } from "zustand";
import axios from "axios";

const useStore = create((set, get) => ({
  products: [],
  listProducts: [],
  categoryFilter: "",
  brandFilter: "",
  fetchProducts: async () => {
    try {
      const response = await axios.get("/products");
      set({ products: response.data, listProducts: response.data });
    } catch (error) {
      console.error(error);
    }
  },

  setBrandFilter: (brand) => set({ brandFilter: brand }),
  getFilteredByBrand: () => {
    const { listProducts, brandFilter } = get();
    if (brandFilter !== "") {
      const filteredByBand = listProducts.filter(
        (product) => product.brand.toLowerCase() == brandFilter.toLowerCase()
      );
      return filteredByBand;
    } else {
      return listProducts;
    }
  },

  setCategoryFilter: (category) => set({ categoryFilter: category }),
  getFilteredProducts: () => {
    const { listProducts, categoryFilter } = get();
    if (categoryFilter !== "") {
      const productsFiltered = listProducts.filter((product) =>
        product.categories.some((cat) => cat.name === categoryFilter)
      );
      return productsFiltered;
    } else {
      return listProducts;
    }
  },
}));

export default useStore;
