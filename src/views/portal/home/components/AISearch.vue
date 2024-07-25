<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import Mic from "@/assets/svg/mic.svg";

import { ref, onMounted, onUnmounted } from "vue";

const input = ref("");
const placeholders = ref([
  "职场办公如何用AI新技术",
  "如何提升工作效率",
  "AI在办公中的应用",
  "未来的智能办公趋势",
]);
const currentPlaceholder = ref(placeholders.value[0]);
let placeholderIndex = 0;

const changePlaceholder = () => {
  placeholderIndex = (placeholderIndex + 1) % placeholders.value.length;
  currentPlaceholder.value = placeholders.value[placeholderIndex];
};

let intervalId: number;
onMounted(() => {
  intervalId = window.setInterval(changePlaceholder, 3000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const items = ref<string[]>([
  "初始内容1",
  "初始内容2",
  "初始内容3",
  "初始内容4",
]);

// 模拟动态更新内容
const updateItems = () => {
  items.value = [
    "更新后的内容1",
    "更新后的内容2",
    "更新后的内容3",
    "更新后的内容4",
  ];
};

// 模拟每段时间（例如每5秒）更新一次内容
onMounted(() => {
  setInterval(() => {
    updateItems();
  }, 5000);
});
</script>

<template>
  <div class="ai_search">
    <div class="bcg">
      <div class="title">AI企业服务营销产品节</div>
      <div class="input_box">
        <div class="input_wrapper">
          <transition name="fade" mode="out-in">
            <el-input
              v-model="input"
              class="input"
              type="textarea"
              :placeholder="currentPlaceholder"
              resize="none"
              :autosize="{ minRows: 4, maxRows: 4 }"
              key="input"
            />
          </transition>
          <div class="input_footer">
            <div class="mic">
              <el-button type="primary">
                <el-icon :size="20">
                  <Mic />
                </el-icon>
              </el-button>
            </div>
            <div class="flex-grow" />

            <div class="btn">
              <el-button :icon="Search" type="primary">搜索</el-button>
            </div>
          </div>
        </div>

        <div class="guess_you_like_box">
          <div class="guess_you_like">
            <div class="text">猜你想要：</div>
            <div class="guess_you_like_list">
              <div
                class="like_item"
                v-for="(item, index) in items"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ai_search {
  width: 100%;
  height: 350px;

  .bcg {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      height: 100px;
      line-height: 100px;
      font-weight: 800;
      font-size: 30px;
      color: #333;
    }

    .input_box {
      width: 80%;

      .input textarea {
        resize: none;
      }

      .input_wrapper {
        height: 150px;
        box-shadow:
          rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
          rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
        &:hover {
          box-shadow:
            #13ae68 0px 0px 5px 0px,
            #13ae68 0px 0px 1px 0px;
        }

        :deep().el-textarea {
          width: 98%;
          margin: 5px auto;
          height: 40px;
          border: none !important;

          .el-textarea__inner {
            box-shadow: none;
          }
        }

        .input_footer {
          width: 95%;
          margin: 0 auto;
          display: flex;

          .mic {
            .el-button {
              width: 35px;
              height: 35px;
              background-color: #f7f8fa;
              border: none;
              margin-bottom: 10px;
            }
          }

          .switch {
            margin-right: 20px;
          }

          .btn {
            .el-button {
              background-color: #13ae68;
            }
          }
        }
      }
    }

    .guess_you_like_box {
      width: 100%;
      padding-left: 20px;
      padding-top: 15px;
      font-size: 12px;
      color: rgb(86 93 102);

      .guess_you_like {
        display: flex;

        .text {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
        }

        .guess_you_like_list {
          width: 80%;
          display: flex;

          .like_item {
            margin: 0 12px;
            padding: 0 5px;
            background-color: #fff;
            border-radius: 10px;
            line-height: 30px;
            height: 30px;
            width: fit-content;
          }
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
