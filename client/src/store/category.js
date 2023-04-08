import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  category: [],
  isLoading: false,
  isError: false,
  fetchData: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get("http://localhost:3001/categories");
      set({ category: response.data, isLoading: false });
    } catch (error) {
      set({ isError: true, isLoading: false });
      console.error(error);
    }
  },
}));

export default useStore;
