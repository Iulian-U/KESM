import { defineStore } from "pinia";

export const useQualityEscalated = defineStore("qualityEscalatedStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        date: "",
        ticket: "",
        cintID: "",
        psReason: "",
        agent: "",
        notes: "",
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "qualityEscalatedStore",
        storage: localStorage,
      },
    ],
  },
});
