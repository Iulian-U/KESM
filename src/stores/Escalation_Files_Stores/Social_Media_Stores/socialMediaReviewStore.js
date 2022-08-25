import { defineStore } from "pinia";

export const useSocialReviewStore = defineStore("socialReviewStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        ticket: null,
        dateReceived: null,
        website: null,
        issue: null,
        resolution: null,
        pointsAwarded: null,
        initialRating: null,
        finalRating: null,
        dateResolved: null,
        resolvedBy: null,
        notes: null,
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "socialReviewStore",
        storage: localStorage,
      },
    ],
  },
});
