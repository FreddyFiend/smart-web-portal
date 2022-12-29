import { defineStore } from "pinia";

export const useSwpStore = defineStore("swp", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    token: "Bearer " + localStorage.getItem("token"),
  }),
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
  },
});
