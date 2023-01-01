import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useSwpStore = defineStore("swp", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    token: "Bearer " + localStorage.getItem("token"),
    title: "Homepage",
    department: localStorage.getItem("department") || "",
    semester: localStorage.getItem("semester") || 0,
  }),
  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getTitle: (state) => state.title,
    getDepartment: (state) => state.department,
    getSemester: (state) => state.semester,
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUser(user) {
      this.user = user;
    },
    setTitle(title) {
      this.title = title;
    },

    setDepartment(department) {
      this.department = department;
    },
    setSemester(semester) {
      this.semester = semester;
    },
  },
});
