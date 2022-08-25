import { defineStore } from "pinia";

export const useNavbarStore = defineStore({
  id: "navbar",
  state: () => ({
    isMenuOpen: false,
  }),

  actions: {
    toggleNavbarMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
});
