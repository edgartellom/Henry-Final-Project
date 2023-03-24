import { create } from "zustand";
import axios from "axios";

const useStore = create((set,get) => ({
  products: [],
  detailProduct:[],
  fetchProducts: async () => {
    try {
      const response = await axios.get("/products");
      set({ products: response.data });
    } catch (error) {
      console.error(error);
    }
  },

  filterId: async(id)=>{
    try{
      const responseId=await axios.get("products/"+id);
      set({detailProduct:responseId.data})
    }catch(error){
      console.log(error)
    }
  },


  
}));








export default useStore;
