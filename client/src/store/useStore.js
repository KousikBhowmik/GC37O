import { create } from "zustand";
import { tempEvent, tempTasks } from "./tempData.js";

export const userLoggedUser = create((set) => ({
  loggedUser: "",
  setLoggedUser: (value) => set(() => ({ loggedUser: value })),
}));

export const useDarkMode = create((set) => ({
  isDarkMode: localStorage.getItem("theme") === "dark" ? true : false,
  // isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export const useTasks = create((set) => ({
  userTasks: tempTasks || [],
  setUserTasks: (value) => set(() => ({ userTasks: value })),
}));

export const useEvents = create((set) => ({
  userEvents: tempEvent || [],
  setUserEvents: (value) => set(() => ({ userEvents: value })),
}));

export const useTaskPageState = create((set) => ({
  addPageState: false,
  setAddPageState: (value) => set(() => ({ addPageState: value })),
}));

export const useAccountSettingsPage = create((set) => ({
  isAccountSettingsPage: false,
  setIsAccountSettingsPage: (value) =>
    set(() => ({ isAccountSettingsPage: value })),
}));

export const useSettingPage = create((set) => ({
  settingPageState: false,
  setSettingPageState: (value) => set(() => ({ addPageState: value })),
}));

export const useTaskState = create((set) => ({
  taskEdit: {},
  setTastEdit: (value) => set(() => ({ taskEdit: value })),
}));

export const useEventState = create((set) => ({
  eventEdit: {},
  setEventEdit: (value) => set(() => ({ taskEdit: value })),
}));
