const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },

  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/MyProfilePage.vue") },
    ],
  },
  {
    path: "/adminpage",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/admin/AdminPage.vue") },
    ],
  },
  {
    path: "/admindepartment",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/admin/DepartmentAdminPage.vue"),
      },
    ],
  },
  {
    path: "/adminsubject",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/admin/SubjectAdminPage.vue") },
    ],
  },
  {
    path: "/adminusers",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/admin/UsersAdminPage.vue") },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
