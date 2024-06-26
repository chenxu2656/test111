const { VITE_HIDE_HOME } = import.meta.env
const Layout = () => import('@/layout/index.vue')

export default {
  path: '/requirement',
  redirect: '/requirement/create',
  meta: {
    icon: 'ri:information-line',
    // showLink: false,
    title: '提出需求',
    rank: 110
  },
  children: [
    {
      path: '/requirement/createrequirement',
      name: '发布需求',
      component: () => import('@/views/requirement/createRequirement.vue'),
      meta: {
        title: '发布需求'
      }
    },
    {
      path: '/requirement/requirementManage',
      name: '需求管理',
      component: () => import('@/views/requirement/requirementManagement.vue'),
      meta: {
        title: '需求管理'
      }
    },
    {
      path: '/requirement/innovate',
      name: '创新需求管理',
      component: () =>
        import('@/views/requirement/createInnovateRequirement.vue'),
      meta: {
        title: '创新需求管理'
      }
    }
  ]
} satisfies RouteConfigsTable
