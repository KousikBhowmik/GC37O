import { create } from "zustand";

export const userLoggedUser = create((set) => ({
  loggedUser: "",
  setLoggedUser: (value) => set(() => ({ loggedUser: value })),
}));

export const useDarkMode = create((set) => ({
  isDarkMode: localStorage.getItem("theme") === "dark" ? true : false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
