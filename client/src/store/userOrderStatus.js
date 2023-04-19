import { create } from "zustand";
import axios from "axios";

const useOrderStatus = create((set) => ({
  hasBoughtProduct: false,
  order: {},
  checkOrder: async (userId) => {
    try {
      const response = await axios.get(`/orders/${userId}`);
      if (response.data.status === "success") {
        set({ hasBoughtProduct: true });
      }
    } catch (error) {
      console.log(error);
    }
  },
  createOrder: async (order) => {
    try {
      const response = await axios.post("/orders", order);
      console.log(response);
      if (response.status === 200) {
        // La reseña se ha guardado exitosamente en la base de datos
        set((state) => ({ ...state, order: response.data }));
      } else {
        // Ha ocurrido un error al guardar la reseña en la base de datos
        console.error("Error al guardar la orden");
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useOrderStatus;
