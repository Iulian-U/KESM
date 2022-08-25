import { defineStore } from "pinia";

export const useBrightlabsStore = defineStore("brightlabsStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        country: null,
        ticket: null,
        cintID: null,
        points: null,
        notes: null,
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "brightlabsStore",
        storage: localStorage,
      },
    ],
  },
});
