<script setup lang="ts">
import ReCol from "@/components/ReCol";
import { ReNormalCountTo } from "@/components/ReCountTo";
import { useRenderFlicker } from "@/components/ReFlicker";
import { type OptionsType } from "@/components/ReSegmented";
import { markRaw, ref, onMounted } from "vue";
import { ChartLine, ChartRound } from "./components/charts";
import WelcomeTable from "./components/table/index.vue";
import { latestNewsData } from "./data";
import { randomGradient, useDark } from "./utils";
import CheckLine from "@iconify-icons/ri/chat-check-line";
import GroupLine from "@iconify-icons/ri/group-line";
import Question from "@iconify-icons/ri/question-answer-line";
import { http } from "@/utils/http";
import router from "@/router";
defineOptions({
  name: "Welcome",
});
const requireList = ref({
  data: [],
  length: 0,
});
const userInfo = ref(JSON.parse(localStorage.getItem("userInfo")));
console.log("userInfo,", userInfo.value);
const { isDark } = useDark();

const chartData = ref([
  {
    icon: GroupLine,
    bgColor: "#effaff",
    color: "#41b6ff",
    duration: 2200,
    name: "需求数量",
    value: 0,
    // percent: "+88%",
    data: [2101, 5288, 4239, 4962, 6752, 5208, 7450], // 平滑折线图数据
  },
  {
    icon: Question,
    bgColor: "#fff5f4",
    color: "#e85f33",
    duration: 1600,
    name: "科技成果",
    value: 0,
    // percent: "+70%",
    data: [2216, 1148, 1255, 788, 4821, 1973, 4379],
  },
  {
    icon: CheckLine,
    bgColor: "#eff8f4",
    color: "#26ce83",
    duration: 1500,
    name: "数字化服务",
    value: 0,
    // percent: "+99%",
    data: [861, 1002, 3195, 1715, 3666, 2415, 3645],
  },
]);
// {"requirements_count":6,"technologyAchievements_count":0,"products_count":7}
onMounted(async () => {
  await http
    .request<any>("get", "/api/v1/dashboardNum", {
      params: {
        uid: userInfo.value.id,
        org_id: JSON.parse(localStorage.getItem("orgInfo")).id,
      },
    })
    .then((resp) => {
      chartData.value[0].value = resp.requirements_count;
      chartData.value[1].value = resp.technologyAchievements_count;
      chartData.value[2].value = resp.products_count;
    });
  await http
    .request<any>("get", "/api/v1/requirements/list", {
      params: {
        limit: 7,
      },
    })
    .then((resp) => {
      requireList.value = resp;
    });
});
// 获取各个数据的数量
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around">
      <re-col
        v-for="(item, index) in chartData"
        :key="index"
        v-motion
        class="mb-[18px]"
        :value="6"
        :md="12"
        :sm="12"
        :xs="24"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 80 * (index + 1),
          },
        }"
      >
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">
              {{ item.name }}
            </span>
            <div
              class="w-8 h-8 flex justify-center items-center rounded-md"
              :style="{
                backgroundColor: isDark ? 'transparent' : item.bgColor,
              }"
            >
              <IconifyIconOffline
                :icon="item.icon"
                :color="item.color"
                width="18"
              />
            </div>
          </div>
          <div class="flex justify-between items-start mt-3">
            <div class="w-1/2">
              <ReNormalCountTo
                :duration="item.duration"
                :fontSize="'1.6em'"
                :startVal="100"
                :endVal="item.value"
              />
            </div>
            <ChartLine
              v-if="item.data.length > 1"
              class="!w-1/2"
              :color="item.color"
              :data="item.data"
            />
            <ChartRound v-else class="!w-1/2" />
          </div>
        </el-card>
      </re-col>
      <re-col
        v-motion
        class="mb-[18px]"
        :value="6"
        :xs="24"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 640,
          },
        }"
      >
        <el-card shadow="never">
          <div class="userInfo flex justify-center" style="flex-wrap: wrap">
            <div class="flex items-center">
              <img
                src="@/assets/images/logo.png"
                alt=""
                srcset=""
                style="width: 80px"
              />
              <div class="user">{{ userInfo.username }}</div>
            </div>

            <el-button style="width: 80%" type="primary">专家认证</el-button>
          </div>
        </el-card>
      </re-col>
      <re-col
        v-motion
        class="mb-[18px]"
        :value="18"
        :xs="24"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 560,
          },
        }"
      >
        <el-card shadow="never" class="h-[580px]">
          <div class="flex justify-between">
            <span class="text-md font-medium">订单管理</span>
          </div>
          <WelcomeTable class="mt-3" />
        </el-card>
      </re-col>

      <re-col
        v-motion
        class="mb-[18px]"
        :value="6"
        :xs="24"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 640,
          },
        }"
      >
        <el-card shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium"
              >全网需求,共{{ requireList.length }}条<span
                class="text-sky-500 ml-5 underline cursor-pointer"
                @click="router.push('/service/solveRequirement')"
                >查看全部</span
              ></span
            >
          </div>
          <el-scrollbar max-height="504" class="mt-3">
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in requireList.data"
                :key="index"
                center
                placement="top"
                :icon="
                  markRaw(
                    useRenderFlicker({
                      background: randomGradient({
                        randomizeHue: true,
                      }),
                    }),
                  )
                "
                :timestamp="`${item.ctime.slice(0, 10)} ${item.ctime.slice(11, 19)}`"
              >
                <p class="text-text_color_regular text-sm">
                  {{ `新增 ${item.name} 需求` }}
                </p>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </el-card>
      </re-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
  --el-card-border-color: none;

  /* 解决概率进度条宽度 */
  .el-progress--line {
    width: 85%;
  }

  /* 解决概率进度条字体大小 */
  .el-progress-bar__innerText {
    font-size: 15px;
  }

  /* 隐藏 el-scrollbar 滚动条 */
  .el-scrollbar__bar {
    display: none;
  }

  /* el-timeline 每一项上下、左右边距 */
  .el-timeline-item {
    margin: 0 6px;
  }
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>
