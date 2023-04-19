import { create } from "zustand";
import axios from "axios";

const useReview = create((set, get) => ({
  review: null,
  createReview: async (review) => {
    try {
      const response = await axios.post("/reviews", review);
      console.log(response);
      if (response.status === 200) {
        // La reseña se ha guardado exitosamente en la base de datos
        set((state) => ({ ...state, review: response.data }));
      } else {
        // Ha ocurrido un error al guardar la reseña en la base de datos
        console.error("Error al guardar la reseña");
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useReview;
