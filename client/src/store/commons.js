import {create} from "zustand";

const useCommonStore = create((set)=>({
    theme: false,
    title: "Page",
    changeTheme: () =>set({theme: !state.theme}),
    changeTitle: (title) =>set({title: title}),
}))

export default useCommonStore;