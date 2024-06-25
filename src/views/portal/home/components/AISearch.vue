<script setup lang="ts">
import { Mic, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const input = ref('')
</script>

<template>
  <div class="ai_search">
    <div class="bcg">
      <div class="title">AI企业服务营销产品节</div>
      <div class="input_box">
        <div class="input_wrapper">
          <el-input
            v-model="input"
            class="input"
            type="textarea"
            placeholder="职场办公如何用AI新技术"
            :autosize="{ minRows: 4, maxRows: 4 }"
          />
          <div class="input_footer">
            <div class="mic">
              <el-icon :size="30"><Mic /></el-icon>
            </div>
            <div class="flex-grow" />
            <div class="switch"><el-switch />切换</div>
            <div class="btn">
              <el-button :icon="Search" type="primary">搜索</el-button>
            </div>
          </div>
        </div>

        <div class="guess_you_like_box">
          <div class="guess_you_like">
            <div class="text">猜你想要：</div>
            <div class="guess_you_like_list">
              <div class="like_item">XXXXXXX</div>
              <div class="like_item">XXXXXXX</div>
              <div class="like_item">XXXXXXX</div>
              <div class="like_item">XXXXXXX</div>
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
  height: 400px;

  .bcg {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      height: 100px;
      line-height: 100px;
      font-family: 800;
      font-size: 40px;
      font-family: Arial, Helvetica, sans-serif;
    }
    .input_box {
      width: 80%;
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
          }
          .switch {
            margin-right: 20px;
          }
          .btn {
          }
        }
      }
    }
    .guess_you_like_box {
      width: 100%;
      padding-left: 20px;
      padding-top: 20px;
      .guess_you_like {
        display: flex;
        .text {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color: #414141;
        }
        .guess_you_like_list {
          width: 80%;
          display: flex;
          .like_item {
            margin: 0 12px;
            padding: 3px 5px;
            background-color: #fff;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
