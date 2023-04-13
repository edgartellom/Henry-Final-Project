import { create } from "zustand";
import axios from "axios";
// import { devtools } from "zustand/middleware";

const useStoreUser = create((set,get) => ({
usuarioSesion:[],


  postUser: async (input) => {
    try {
      const createUser = await axios.post("/users",input,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      });
      console.log(createUser)
    } catch (error) {
      console.log(error);
    }
  },

  getUser: async(id)=>{
    try{
      const responseUser = await axios.get("/users/"+id);
      set({ usuarioSesion: responseUser.data });
    }catch(error){
      console.log(error)
    }
  },


  updateUser: async (input) => {
    try {
      const updateUser = await axios.put("/users",input,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      });
      console.log(updateUser)
    } catch (error) {
      console.log(error);
    }
  },




}));
export default useStoreUser;


