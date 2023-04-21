import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import axios from "axios";

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        users: [],
        currentUser: {},

        idCart:[],
        
        updateId: (newId) => set((state) => ({ ...state, idCart: newId })),
        
        getCart: async (userId) => {
          try {
            const response = await axios.get(`/carts/${userId}`);
            set({ idCart: response.data });
            return response.data;
          } catch (error) {
            console.error(error);
            return null;
          }
        },

        createCart: async (userData) => {
          try {
            const response = await axios.post("/carts", userData);
            set({idCart: response.data})
            console.log(response.data);

            return response.data
          } catch (error) {
            console.error(error);
          }
        },


        fetchUsers: async () => {
          try {
            const response = await axios.get("/users");
            set({ users: response.data });
          } catch (error) {
            console.error(error);
          }
        },
        getUserById: async (id) => {
          try {
            const response = await axios.get(`/users/${id}`);
            set({ users: response.data });
            return response.data;
          } catch (error) {
            console.error(error);
            return null;
          }
        },
        registerUser: async (userData) => {
          try {
            const response = await axios.post("/users", userData);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        },
        updateUser: async (userData) => {
          try {
            const response = await axios.put("/users", userData);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        },
        setUser: (user) => set({ currentUser: user }),
        clearUser: () => set({ currentUser: {} }),
      }),
      {
        name: "user-storage", // unique name
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
    // { name: "users" }
  )
);

export default useUserStore;
