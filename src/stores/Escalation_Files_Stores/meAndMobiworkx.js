import { defineStore } from "pinia";

export const useMeAndMobiworkxStore = defineStore("meAndMobiworkxStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        panel: null,
        cintID: null,
        email: null,
        mobileNumber: null,
        rewardType: null,
        rewardName: null,
        rewardValue: null,
        redemptionDate: null,
        issue: null,
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "meAndMobiworkxStore",
        storage: localStorage,
      },
    ],
  },
});
