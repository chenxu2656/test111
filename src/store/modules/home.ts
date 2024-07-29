import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { id } from "element-plus/es/locale";

export const useHomeStore = defineStore(
  "homeStore",
  () => {
    const clickedTag = ref("");
    const clickedService = ref("");
    const activeIndex = ref(null);
    const bean1 = ref({
      title: "AI赋能，万事轻松！",
      subTitle: "能交给AI工具的，就别自己埋头苦干！",
      searchTag: "AI新技术",
      data: [],
    });

    const bean2 = ref({
      title: "软硬件技术赋能，1.5折起！",
      subTitle: "软件/硬件/服务，满足企业数字化多样需求",
      searchTag: "生产制造",
      data: [],
    });

    const bean3 = ref({
      title: "数字化服务0元购",
      subTitle: "政府买单，帮助中小企业轻松开启数字化",
      searchTag: "解决方案",
      data: [],
    });

    const bean4 = ref({
      title: "数字化标杆案例",
      subTitle: "政府买单，帮助中小企业轻松开启数字化",
      searchTag: "数字化案例",
      data: [],
    });

    const searchTags = reactive<any>([
      { id: "recommend1", tag: "供应链管理" },
      { id: "recommend2", tag: "营销管理" },
      { id: "recommend3", tag: "解决方案" },
      { id: "contact", tag: "数字化案例" },
    ]);

    const setclickedTag = (value: string) => {
      clickedTag.value = value;
    };
    const setClickedService = (value: string) => {
      clickedService.value = value;
    };
    return {
      clickedTag,
      clickedService,
      bean1,
      bean2,
      bean3,
      bean4,
      searchTags,
      activeIndex,
      setclickedTag,
      setClickedService,
    };
  },
  {
    persist: true,
  },
);
