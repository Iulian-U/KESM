import { defineStore } from "pinia";

export const useQualitySleeping = defineStore("qualitySleepingStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        ticket: "",
        cintID: "",
        email: "",
        date: "",
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "qualitySleepingStore",
        storage: localStorage,
      },
    ],
  },
});
