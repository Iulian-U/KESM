import { defineStore } from "pinia";

import getUser from "../composables/getUser";

const { getUserData } = getUser();

export const useUserStore = defineStore({
  id: "userInfo",
  state: () => ({
    firstName: "",
    lastName: "",
    email: "",
    firstNameInitial: "",
    lastNameInitial: "",
    fullName: "",
  }),

  actions: {
    async getInfo() {
      await getUserData().then((userData) => {
        this.firstName = userData[0].firstName;
        this.lastName = userData[0].lastName;
        this.email = userData[0].email;
        this.firstNameInitial = userData[0].firstName.charAt(0);
        this.lastNameInitial = userData[0].lastName.charAt(0);
        this.fullName = `${userData[0].firstName} ${userData[0].lastName}`;
      });
    },
  },
});
