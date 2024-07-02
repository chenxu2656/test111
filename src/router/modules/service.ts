const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/service",
  redirect: "/service/technologyAchievementManage",
  meta: {
    icon: "ri:function-add-fill",
    // showLink: false,
    title: "提供服务",
    rank: 20,
  },
  children: [
    {
      path: "/service/technologyAchievementManage",
      name: "科技成果管理",
      component: () =>
        import("@/views/admin/service/technologyAchievementManage.vue"),
      meta: {
        title: "科技成果管理",
      },
    },
    {
      path: "/service/createTech",
      name: "发布科技成果",
      component: () => import("@/views/admin/service/createTech.vue"),
      meta: {
        title: "发布科技成果",
        showLink: false,
      },
    },
    {
      path: "/service/solveRequirement",
      name: "解决企业需求",
      component: () => import("@/views/admin/service/solveRequirement.vue"),
      meta: {
        title: "解决企业需求",
      },
    }
  ],
} satisfies RouteConfigsTable;
