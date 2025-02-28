import { create } from "zustand";

export const useCurrentPage = create((set) => {
  currPage: "Dashboard";
  setCurrPage: (value) => set((state) => ({ currPage: value }));
});
