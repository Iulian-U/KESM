import { defineStore } from "pinia";

export const useWeeklyPointsStore = defineStore("storePoints", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        country: "",
        cintID: null,
        projectID: null,
        loi: null,
        lifepoints: null,
        ticket: null,
        date: "",
        description: "",
        alphanumericID: "",
        agentName: "",
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "pointsStore",
        storage: localStorage,
      },
    ],
  },
});
