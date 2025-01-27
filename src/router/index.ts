import { getConfig } from "@/config";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { usePermissionStoreHook } from "@/store/modules/permission";
import {
  isUserLoggedIn,
  removeToken,
  userKey,
  type DataInfo,
} from "@/utils/auth";
import NProgress from "@/utils/progress";
import { buildHierarchyTree } from "@/utils/tree";
import { isAllEmpty, isUrl, openLink, storageLocal } from "@pureadmin/utils";
import {
  createRouter,
  type RouteComponent,
  type RouteRecordRaw,
  type Router,
} from "vue-router";
import remainingRouter from "./modules/remaining";
import {
  ascending,
  findRouteByPath,
  formatFlatteningRoutes,
  formatTwoStageRoutes,
  getHistoryMode,
  getTopMenu,
  handleAliveRoute,
  initRouter,
  isOneOfArray,
} from "./utils";

/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件 */
const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true,
  },
);

/** 原始静态路由（未做任何处理） */
const routes = [];

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

/** 导出处理后的静态路由（三级及以上的路由全部拍成二级） */
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes.flat(Infinity)))),
);

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = ascending(
  routes.flat(Infinity),
).concat(...remainingRouter);

/** 不参与菜单的路由 */
export const remainingPaths = Object.keys(remainingRouter).map((v) => {
  return remainingRouter[v].path;
});

console.log(remainingPaths);
/** 创建路由实例 */
export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes: constantRoutes.concat(...(remainingRouter as any)),
  strict: true,

  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        resolve(savedPosition);
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  },
});

console.log(
  "%c router",
  "padding-right:10px;padding-left:10px;background-color:Teal;color: #fff; font-size: 20px",
  router,
);

/** 重置路由 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name, meta } = route;
    if (name && router.hasRoute(name) && meta?.backstage) {
      router.removeRoute(name);
      router.options.routes = formatTwoStageRoutes(
        formatFlatteningRoutes(
          buildHierarchyTree(ascending(routes.flat(Infinity))),
        ),
      );
    }
  });
  usePermissionStoreHook().clearAllCachePage();
}

/** 路由白名单 */
const whiteList = remainingPaths;

const { VITE_HIDE_HOME } = import.meta.env;

router.beforeEach((to, from, next) => {
  if (to.meta?.keepAlive) {
    handleAliveRoute(to, "add");
    if (from.name === undefined || from.name === "Redirect") {
      handleAliveRoute(to);
    }
  }

  NProgress.start();

  const jwt = localStorage.getItem("jwt");
  const isUserLoggedInFlag = !!jwt;

  if (!isUserLoggedInFlag && !whiteList.includes(to.path)) {
    localStorage.setItem("redirectPath", to.fullPath);
    next("/portal");
  } else {
    initRouter().then((router: Router) => {
      if (!useMultiTagsStoreHook().getMultiTagsCache) {
        const { path } = to;
        const route = findRouteByPath(path, router.options.routes[0].children);
        getTopMenu(true);
        // query、params模式路由传参数的标签页不在此处处理
        if (route && route.meta?.title) {
          if (isAllEmpty(route.parentId) && route.meta?.backstage) {
            // 此处为动态顶级路由（目录）
            const { path, name, meta } = route.children[0];
            useMultiTagsStoreHook().handleTags("push", {
              path,
              name,
              meta,
            });
          } else {
            const { path, name, meta } = route;
            useMultiTagsStoreHook().handleTags("push", {
              path,
              name,
              meta,
            });
          }
        }
      }
      // 确保动态路由完全加入路由列表并且不影响静态路由（注意：动态路由刷新时router.beforeEach可能会触发两次，第一次触发动态路由还未完全添加，第二次动态路由才完全添加到路由列表，如果需要在router.beforeEach做一些判断可以在to.name存在的条件下去判断，这样就只会触发一次）
      if (isAllEmpty(to.name)) router.push(to.fullPath);
    });
    next();
  }

  const externalLink = isUrl(to?.name as string);
  if (!externalLink) {
    to.matched.some((item) => {
      if (!item.meta.title) return "";
      const Title = getConfig().Title;
      if (Title) document.title = `${item.meta.title} | ${Title}`;
      else document.title = item.meta.title as string;
    });
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
