import { create } from "zustand";
import axios from "axios";
// import { devtools } from "zustand/middleware";

const useStoreAddress = create((set, get) => ({
  dataAddress: [],

  postAddress: async (input) => {
    try {
      const createAddress = await axios.post("/address", input, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      });
      console.log(createAddress);
    } catch (error) {
      console.log(error);
    }
  },

  getAddress: async () => {
    try {
      const responseAddress = await axios.get("/address");
      set({ dataAddress: responseAddress.data });
    } catch (error) {
      console.log(error);
    }
  },

  updateAddress: async (input) => {
    try {
      const updateAddress = await axios.put("/address", input, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      });
      console.log(updateAddress);
    } catch (error) {
      console.log(error);
    }
  },
}));
export default useStoreAddress;


