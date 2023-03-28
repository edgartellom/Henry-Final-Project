import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
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
  setUser: (user) => {
    set({ currentUser: user });
  },
  clearUser: () => {
    set({ currentUser: {} });
  },
}));

export default useStore;
