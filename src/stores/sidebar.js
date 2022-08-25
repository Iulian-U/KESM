import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state() {
    return {
      isOpen: false,
    };
  },

  actions: {
    toggleSidebarCollapse() {
      this.isOpen = !this.isOpen;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "sidebarCollapsedState",
        storage: localStorage,
      },
    ],
  },
});
