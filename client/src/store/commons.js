import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useCommonStore = create(
  devtools(
    (set) => ({
      theme: false,
      title: "Page",
      changeTheme: () => set((state) => ({ theme: !state.theme })),
      changeTitle: (title) => set({ title: title }),
    }),
    { serialize: { options: true } }
  )
);

export default useCommonStore;
