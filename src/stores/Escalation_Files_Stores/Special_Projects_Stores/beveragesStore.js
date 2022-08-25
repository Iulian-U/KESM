import { defineStore } from "pinia";

export const useBeveragesStore = defineStore("beveragesDiaryStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        ticket: null,
        country: null,
        projectID: null,
        cintID: null,
        dummyID: null,
        date: null,
        pointsIssue: null,
        techIssue: null,
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "beveragesDiaryStore",
        storage: localStorage,
      },
    ],
  },
});
