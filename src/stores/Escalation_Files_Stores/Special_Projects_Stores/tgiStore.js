import { defineStore } from "pinia";

export const useTgiStore = defineStore("tgiStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        country: "",
        cintID: "",
        ticket: "",
        projectID: "",
        panelistMessage: "",
        issue: "",
        additionalInfo: "",
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "tgiStore",
        storage: localStorage,
      },
    ],
  },
});
