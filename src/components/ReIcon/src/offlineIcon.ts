// 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
import { addIcon } from "@iconify/vue/dist/offline";

// 本地菜单图标，后端在路由的 icon 中返回对应的图标字符串并且前端在此处使用 addIcon 添加即可渲染菜单图标
// @iconify-icons/ep
import HomeFilled from "@iconify-icons/ep/home-filled";
import Lollipop from "@iconify-icons/ep/lollipop";
addIcon("ep:lollipop", Lollipop);
addIcon("ep:home-filled", HomeFilled);
// @iconify-icons/ri
import Menu from "@iconify-icons/ri/function-line";
import GiTClosepull from "@iconify-icons/ri/git-close-pull-request-line";
import InformationLine from "@iconify-icons/ri/information-line";
import Notification from "@iconify-icons/ri/notification-3-line";
import Organization from "@iconify-icons/ri/organization-chart";
import Search from "@iconify-icons/ri/search-line";
import Digtal from "@iconify-icons/ri/shopping-bag-2-line";
import Team from "@iconify-icons/ri/team-line";
addIcon("ri:search-line", Search);
addIcon("ri:information-line", InformationLine);
addIcon("ri:git-close-pull-request-line", GiTClosepull);
addIcon("ri:function-add-fill", Menu);
addIcon("ri:notification-3-line", Notification);
addIcon("ri:shopping-bag-2-line", Digtal);
addIcon("ri:team-line", Team);
addIcon("ri:organization-chart", Organization);