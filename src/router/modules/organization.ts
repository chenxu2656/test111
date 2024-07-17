const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/organization",
  redirect: "/organization/manage",
  meta: {
    icon: "ri:organization-chart",
    // showLink: false,
    title: "组织信息",
    rank: 40,
  },
  children: [
    {
      path: "/organization/manage",
      name: "组织管理",
      component: () =>
        import("@/views/admin/organization/organizationManage/index.vue"),
      meta: {
        title: "基本信息",
      },
    },
    {
      path: "/organization/create",
      name: "创建组织",
      component: () =>
        import("@/views/admin/organization/createOrganization/index.vue"),
      meta: {
        title: "创建组织",
        showLink: false,
      },
    },
    {
      path: "/organization/member",
      name: "成员管理",
      component: () => import("@/views/admin/organization/MemberManage.vue"),
      meta: {
        title: "成员管理",
      },
    },
  ],
} satisfies RouteConfigsTable;
