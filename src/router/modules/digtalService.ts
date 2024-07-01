const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/service",
  redirect: "/service/digtalService",
  meta: {
    icon: "ri:function-add-fill",
    // showLink: false,
    title: "数字化服务",
    rank: 15,
  },
  children: [
    {
      path: "/service/digtalService",
      name: "数字化服务",
      component: () =>
        import("@/views/admin/requirement/requirementManagement.vue"),
      meta: {
        title: "数字化服务",
      },
    },
  ],
} satisfies RouteConfigsTable;
