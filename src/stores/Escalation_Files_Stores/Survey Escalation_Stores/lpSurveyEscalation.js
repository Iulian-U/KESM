import { defineStore } from "pinia";

export const useLpSurveyEscalationStore = defineStore("lpSurveyEscalationStore", {
  state() {
    return {
      subject: "",
      ticketsReceived: "",
      countriesAffected: "",
      pointsIssues: "",
      technicalIssues: "",
      whatWeNeed: "",
      rows: [],
      newSubject: "",
      newTicketsReceived: "",
      newCountriesAffected: "",
      newPointsIssues: "",
      newTechnicalIssues: "",
      newWhatWeNeed: "",
      newRow: {
        id: null,
        ticket: "",
        cintID: "",
        dateReceived: "",
        panelistWrote: "",
      },
    };
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "lpSurveyEscalationStore",
        storage: localStorage,
      },
    ],
  },
});
