import { defineStore } from "pinia";

export const weekStore = defineStore("storeWeek", {
  state() {
    return {
      week: 0,
    };
  },

  actions: {},

  persist: {
    enabled: true,
    strategies: [
      {
        key: "weekStore",
        storage: localStorage,
      },
    ],
  },
});
