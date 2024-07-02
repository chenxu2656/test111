const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/digtalServiceservice",
  redirect: "/digtalServiceservice/manage",
  meta: {
    icon: "ri:shopping-bag-2-line",
    // showLink: false,
    title: "数字化服务",
    rank: 30,
  },
  children: [
    {
      path: "/digtalServiceservice/manage",
      name: "服务管理",
      component: () =>
        import("@/views/admin/requirement/requirementManagement.vue"),
      meta: {
        title: "服务管理",
      },
    },{
      path: "/digtalServiceservice/order",
      name: "订单管理",
      component: () =>
        import("@/views/admin/requirement/requirementManagement.vue"),
      meta: {
        title: "订单管理",
      },
    },
  ],
} satisfies RouteConfigsTable;
