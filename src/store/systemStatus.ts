import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

interface HeaderState {
  showBehavior: string;
  title: string;
  position: string;
  bgc: string;
  color: string;
  boxShadow: string;
  transform: string;
}

interface NavIcon {
  name: string;
  theme?: string;
  fill?: string;
}

interface NavItem {
  showName: string;
  type: "RouterLink" | "a";
  path: string;
  target?: string;
  icon?: NavIcon;
  children?: NavItem[];
}

interface RecommendItem {
  imgPath: string;
  title: string;
  summary: string;
  detailPath: string;
  date: string;
  author: string;
}

export const use_app_state_store = defineStore("app_state_store", () => {
  let headerState: Ref<HeaderState> = ref({
    showBehavior: "autoHide,titleMode,transparentMode,",
    title: "welcome to",
    position: "fixed",
    bgc: "#fff" || "transparent",
    color: "#333",
    boxShadow: "0 0 30px rgba(0, 0, 0, .2)",
    transform: "translateY(0)",
  });

  let musicPlayerState = ref({
    offset: computed(() => {
      return headerState.value.transform === "translateY(0)" ? 50 : 0;
    }),
  });

  const navs: Ref<NavItem[]> = ref([
    {
      showName: "供需服务",
      type: "RouterLink",
      path: "/supply",
      children: [
        {
          showName: "企业需求大厅",
          path: "https://gitee.com/ainowr/official-website-template",
          icon: {
            name: "page-template",
          },
          type: "a",
          target: "_blank",
        },
        {
          showName: "解决方案大厅",
          path: "https://juejin.cn/post/7338214297572835380",
          icon: {
            name: "pay-code-one",
          },
          type: "a",
          target: "_blank",
        },
        {
          showName: "科技创新需求",
          path: "/pages/example/index/",
          icon: {
            name: "page-template",
          },
          type: "a",
          target: "_blank",
        },
      ],
    },
    {
      showName: "生态合作",
      type: "RouterLink",
      path: "/demo",
      children: [
        {
          showName: "ISV生态伙伴",
          path: "/pages/example/index/",
          icon: {
            name: "page-template",
          },
          type: "a",
          target: "_blank",
        },
        {
          showName: "营销渠道伙伴",
          path: "/pages/example/index/",
          icon: {
            name: "page-template",
          },
          type: "a",
          target: "_blank",
        },
        {
          showName: "数字化软甲服务包供应商伙伴",
          path: "/pages/example/index/",
          icon: {
            name: "page-template",
          },
          type: "a",
          target: "_blank",
        },
      ],
    },
  ]);

  const recommendItems: Ref<RecommendItem[]> = ref([
    {
      imgPath: "/src/assets/img/recommend/official.jpg",
      title: "官网模板(开源)",
      summary: "基于vue3,vite开发的通用型官网模板",
      detailPath: "https://gitee.com/ainowr/official-website-template",
      date: " 21st oct., 2023 ",
      author: "ainow",
    },
    {
      imgPath: "/src/assets/img/recommend/qMqPay.jpg",
      title: "Q免签支付",
      summary: "微信支付宝个人免签约，免营业执照，0手续收款方案",
      detailPath: "https://juejin.cn/post/7338214297572835380",
      date: " 21st oct., 2023 ",
      author: "ainow",
    },
    {
      imgPath: "/src/assets/img/recommend/index.jpg",
      title: "首页模板(free)",
      summary: "主要使用html,css,js编写的简单前端首页模板",
      detailPath: "/pages/example/index/",
      date: " 03 may, 2023",
      author: "ainow",
    },
  ]);

  return {
    headerState,
    musicPlayerState,
    navs,

    recommendItems,
  };
});
