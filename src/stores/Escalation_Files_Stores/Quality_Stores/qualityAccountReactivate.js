import { defineStore } from "pinia";

export const useQualityReactivate = defineStore("qualityReactivateStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        dateSubmitted: "",
        ticket: "",
        cintID: "",
        psReason: "",
        dateReactivated: "",
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "qualityReactivateStore",
        storage: localStorage,
      },
    ],
  },
});
