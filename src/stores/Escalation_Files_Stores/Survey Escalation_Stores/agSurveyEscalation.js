import { defineStore } from "pinia";

export const useAgSurveyEscalationStore = defineStore("agSurveyEscalationStore", {
  state() {
    return {
      subject: "",
      agPanel: "",
      surveyNumber: "",
      synopsis: "",
      rows: [],
      newSubject: "",
      newAgPanel: "",
      newSurveyNumber: "",
      newSynopsis: "",
      newRow: {
        id: null,
        ticket: "",
        panelistID: "",
        dateReceived: "",
        panelistWrote: "",
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "agSurveyEscalationStore",
        storage: localStorage,
      },
    ],
  },
});
