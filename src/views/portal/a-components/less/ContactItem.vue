<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
const props = defineProps({
  bean: {
    type: Object,
    default: () => {
      return {}
    },
    required: true
  }
})
let showCodeBean = ref(false)
</script>

<template>
  <div class="box">
    <div
      class="codeContainer"
      v-if="bean.codeBean"
      @click="showCodeBean = true"
    >
      <component theme="outline" :is="'icon-' + 'two-dimensional-code'" />
    </div>

    <van-dialog
      v-model:show="showCodeBean"
      title="添加"
      show-cancel-button
      class="codeBean"
    >
      <img :src="bean.codeBean.path" />
    </van-dialog>

    <!-- 动态引入图标 -->
    <el-icon>
      <component theme="outline" :is="'icon-' + bean.iconName" />
    </el-icon>
    <h3>{{ bean.name }}</h3>
    <!--                        <p>+123-456-7890</p>-->
    <!--                        <p>+111-222-3333</p>-->
    <p>{{ bean.value }}</p>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/main.less';

.box {
  width: 100%;
  border: 1px solid @light-theme-color;
  border-radius: 6px;
  padding: 10px 3px;
  text-align: center;
  position: relative;

  &:hover i {
    background: @light-theme-color;
    color: #fff;
  }

  .codeBean {
    img {
      width: 100%;
      max-height: 70vh;
    }
  }

  .codeContainer {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 2.5em;

    clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 100%, 0 30%);

    span {
      display: flex;
      place-content: center;
      place-items: center;
    }
  }

  i {
    height: 3em;
    width: 3em;
    border: 0.1rem solid @light-theme-color;
    border-radius: 50%;
    color: @light-theme-color;
    font-size: 2rem;
  }

  h3 {
    font-size: 0.8em;
    text-transform: capitalize;
    color: #222;
    padding: 0.2em 0;
  }

  p {
    padding: 0;
    font-size: 1.2rem;
    color: #666;
  }
}
</style>
