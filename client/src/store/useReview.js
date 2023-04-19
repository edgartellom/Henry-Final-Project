import { create } from "zustand";
import axios from "axios";

const useReview = create((set, get) => ({
  review: null,
  createReview: async (productId, userId, reviewText, rating) => {
    try {
      const response = await axios.post("/reviews", {
        productId,
        userId,
        reviewText,
        rating,
      });
      console.log(response);
      if (response.status === "success") {
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
