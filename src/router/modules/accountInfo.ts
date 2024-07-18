const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/account",
  redirect: "/account/manage",
  meta: {
    icon: "ri:team-line",
    showLink: false,
    title: "账户信息",
    rank: 50,
  },
  children: [
    {
      path: "/account/manage",
      name: "基本信息",
      component: () => import("@/views/admin/account/AccountManage.vue"),
      meta: {
        title: "基本信息",
      },
    },
    {
      path: "/account/expert",
      name: "专家认证",
      component: () => import("@/views/admin/account/expertManage.vue"),
      meta: {
        title: "专家认证",
      },
    },
  ],
} satisfies RouteConfigsTable;
