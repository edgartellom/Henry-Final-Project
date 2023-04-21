import { create } from "zustand";
import axios from "axios";

const useReview = create((set, get) => ({
  reviewsList: [],
  review: null,
  createReview: async (review) => {
    console.log(review);
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
  getReviewById: async (id) => {
    try {
      console.log(id);
      const response = await axios.get(`/reviews/${id}`);
      set({ reviewsList: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
}));

export default useReview;
