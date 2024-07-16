const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/requirement",
  redirect: "/requirement/requirementManage",
  meta: {
    icon: "ri:git-close-pull-request-line",
    // showLink: false,
    title: "提出需求",
    rank: 10,
  },
  children: [
  {
      path: "/requirement/requirementManage",
      name: "需求管理",
      component: () =>
        import("@/views/admin/requirement/requirementManagement.vue"),
      meta: {
        title: "需求管理",
      },
    },
    {
      path: "/requirement/createrequirement",
      name: "发布需求",
      component: () =>
        import("@/views/admin/requirement/createRequirement.vue"),
      meta: {
        title: "发布需求",
        // showLink: false,
      },
    },
    {
      path: "/requirement/createInnovateRequirement",
      name: "发布创新需求",
      component: () =>
        import("@/views/admin/requirement/createInnovateRequirement.vue"),
      meta: {
        title: "发布创新需求",
        showLink: false,
      },
    },
    
    {
      path: "/requirement/innovate",
      name: "创新需求管理",
      component: () =>
        import("@/views/admin/requirement/innovateRequirementManagement.vue"),
      meta: {
        title: "创新需求管理",
        showLink: false,
      },
    },
  ],
} satisfies RouteConfigsTable;
