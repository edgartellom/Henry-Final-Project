import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import axios from "axios";

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        users: [],
        currentUser: {},
        fetchUsers: async () => {
          try {
            const response = await axios.get("/users");
            set({ users: response.data });
          } catch (error) {
            console.error(error);
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
