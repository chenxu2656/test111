const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/notification",
  redirect: "/notification/manage",
  meta: {
    icon: "ri:notification-3-line",
    // showLink: false,
    title: "通知中心",
    rank: 60,
  },
  children: [
    {
      path: "/notification/manage",
      name: "系统通知",
      component: () =>
        import("@/views/admin/notification/index.vue"),
      meta: {
        title: "通知中心",
      },
    }
  ],
} satisfies RouteConfigsTable;
