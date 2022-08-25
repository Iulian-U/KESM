import { defineStore } from "pinia";

export const useIhutVoicemailStore = defineStore("ihutVoicemailStore", {
  state() {
    return {
      rows: [],
      newRow: {
        id: null,
        dateVoicemail: null,
        name: null,
        email: null,
        surveyNumber: null,
        concern: null,
        ticket: null,
        dateResponded: null,
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "ihutVoicemailStore",
        storage: localStorage,
      },
    ],
  },
});
