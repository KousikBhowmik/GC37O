import { create } from "zustand";

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
  userTasks: [],
  setUserTasks: (value) => set(() => ({ userTasks: value })),
}));

export const useEvents = create((set) => ({
  userEvents: [],
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

export const useFeedbackPage = create((set) => ({
  feedbackPageState: false,
  setFeedbackPageState: (value) => set(() => ({ feedbackPageState: value })),
}));

export const useFormType = create((set) => ({
  formType: "task",
  setFormType: (value) => set(() => ({ formType: value })),
}));
