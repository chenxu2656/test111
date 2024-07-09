import { useEcharts } from "@/plugins/echarts";
import { useElementPlus } from "@/plugins/elementPlus";
import { setupStore } from "@/store";
import { injectResponsiveStorage } from "@/utils/responsive";
import Table from "@pureadmin/table";
import { MotionPlugin } from "@vueuse/motion";
import { createApp, type Directive } from "vue";
import App from "./App.vue";
import { getPlatformConfig } from "./config";
import router from "./router";
// import PureDescriptions from "@pureadmin/descriptions";

// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "element-plus/dist/index.css";
import "./style/tailwind.css";
// 导入字体图标
import "./assets/base.less";
import "./assets/iconfont/iconfont.css";
import "./assets/iconfont/iconfont.js";
import "./assets/main.less";

// 自定义指令
import * as directives from "@/directives";
const app = createApp(App);
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局注册@iconify/vue图标库
import {
  FontIcon,
  IconifyIconOffline,
  IconifyIconOnline,
} from "./components/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

// 全局注册按钮级别权限组件
import { Auth } from "@/components/ReAuth";
app.component("Auth", Auth);

// 全局注册vue-tippy
import { createPinia } from "pinia";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import VueTippy from "vue-tippy";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const pinia = createPinia();
app.use(VueTippy);

getPlatformConfig(app).then(async (config) => {
  setupStore(app);
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  // app
  //   .use(MotionPlugin)
  //   .use(useElementPlus)
  //   .use(Table)
  //   // .use(PureDescriptions)
  //   .use(useEcharts)
  app
    .use(MotionPlugin)
    .use(useElementPlus)
    .use(Table)

    .use(useEcharts);
  app.mount("#app");
});
