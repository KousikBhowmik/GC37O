import { create } from "zustand";

export const userLoggedUser = create((set) => ({
  loggedUser: "",
  setLoggedUser: (value) => set(() => ({ loggedUser: value })),
}));