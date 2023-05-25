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
    path: "/register",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/RegisterPage.vue") }],
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
    path: "/teacherpage",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/teacher/TeacherPage.vue") },
    ],
  },

  {
    path: "/lectures",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/LecturesPage.vue"),
      },
    ],
  },

  {
    path: "/slides",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/SlidesPage.vue"),
      },
    ],
  },
  {
    path: "/outlines",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/OutlinesPage.vue"),
      },
    ],
  },

  {
    path: "/assignments",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/AssignmentsPage.vue"),
      },
    ],
  },

  {
    path: "/notes",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/NotesPage.vue"),
      },
    ],
  },
  {
    path: "/uploadlecture",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/teacher/UploadLecturePage.vue"),
      },
    ],
  },

  {
    path: "/uploadassignment",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/teacher/UploadAssignmentPage.vue"),
      },
    ],
  },

  {
    path: "/uploadnote",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/teacher/UploadNotePage.vue"),
      },
    ],
  },

  {
    path: "/uploadoutline",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/teacher/UploadOutlinePage.vue"),
      },
    ],
  },

  {
    path: "/uploadslide",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/teacher/UploadSlidePage.vue"),
      },
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
