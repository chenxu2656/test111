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
