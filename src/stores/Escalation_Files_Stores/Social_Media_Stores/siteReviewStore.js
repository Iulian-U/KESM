import { defineStore } from "pinia";

export const useSiteReviewStore = defineStore("siteReviewStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        ticket: null,
        dateReceived: null,
        cintID: null,
        email: null,
        website: null,
        detailedIssue: null,
        issue: null,
        cintStatus: null,
        psReason1: null,
        psReason2: null,
        psReason3: null,
        resolution: null,
        reactivated: null,
        pointsAwarded: null,
        dateResolved: null,
        resolvedBy: null,
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "siteReviewStore",
        storage: localStorage,
      },
    ],
  },
});
