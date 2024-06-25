const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      showLink: false,
      rank: 101
    }
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      title: '加载中...',
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/layout/redirect.vue')
      }
    ]
  },
  {
    path: '/portal',
    name: 'Portal',
    component: () => import('@/views/portal/home/index.vue'),
    meta: {
      title: 'Med',
      showLink: false,
      rank: 103
    }
  }
] satisfies Array<RouteConfigsTable>
