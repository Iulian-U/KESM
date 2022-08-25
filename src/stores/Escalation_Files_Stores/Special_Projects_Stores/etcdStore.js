import { defineStore } from "pinia";

export const useEtcdStore = defineStore("etcdStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        ticket: "",
        country: "",
        projectID: "",
        cintID: "",
        dummyID: "",
        date: "",
        pointsIssue: "",
        techIssue: "",
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "etcdStore",
        storage: localStorage,
      },
    ],
  },
});
