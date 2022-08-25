import { defineStore } from "pinia";

export const useQualityRedeem = defineStore("qualityRedeemStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        date: "",
        cintID: "",
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "qualityRedeemStore",
        storage: localStorage,
      },
    ],
  },
});
