import { create } from "zustand";
import axios from "axios";

const useOrderStatus = create((set) => ({
  hasBoughtProduct: true,
  checkOrder: async (userId) => {
    const response = await fetch(`/orders/${userId}`);
    const data = await response.json();
    if (data.status === "success") {
      set({ hasBoughtProduct: true });
    }
  },
}));

export default useOrderStatus;
