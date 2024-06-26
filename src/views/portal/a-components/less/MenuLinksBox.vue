<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { use_app_state_store } from '@/stores/systemStatus.ts'
import { storeToRefs } from 'pinia'

const props = defineProps({
  bean: {
    type: Object,
    required: false,
    default: {
      showName: '默认名称',
      type: 'RouterLink',
      path: '/demo',
      name: '/demo',
      children: [
        {
          showName: '测试1',
          path: '/1',
          name: '/1',
          type: 'a',
          target: '_blank'
        },
        { showName: '测试2', path: '/2', name: '/2', type: 'RouterLink' }
      ]
    }
  }
})

const router = useRouter()
let appStates = use_app_state_store()

function getLinkProps(item) {
  let props = {}
  props.target = item.target || '_self'
  if (item.type === 'RouterLink') {
    props.to = item.path
  } else if (item.type === 'a') {
    props.href = item.path
  }
  if (item.target === '_blank') {
    props.rel = item.rel || 'noopener'
  }
  return props
}
function getIconProp(icon) {
  let props = {}
  if (!icon) {
    props.theme = 'outline'
    props.fill = '#333'
  } else {
    props.theme = icon.theme || 'outline'
    props.fill = icon.fill || '#333'
  }
  return props
}

function getIconName(icon) {
  if (!icon) {
    return 'icon-' + 'link-one'
  }
  return 'icon-' + icon.name || 'link-one'
}
</script>

<template>
  <ainow-menu-links-box>
    <RouterLink ref="name" class="name" :to="bean.path">
      <!-- van-icon换行会导致name后多出一个空格 -->
      {{ bean.showName }}
    </RouterLink>

    <div class="links" ref="linksBox">
      <component
        v-for="(item, index) in bean.children"
        :key="index"
        :is="item.type"
        v-bind="getLinkProps(item)"
      >
        <el-icon>
          <!--                    <component  theme="outline" fill="gray" :is="getIconName(item)"/>-->
          <!--                    <component fill="gray" :is="'icon-link-one' " v-bind="getIconProp(item.icon)"/>-->
          <!-- is属性不能放在{} -->
          <component
            :is="getIconName(item.icon)"
            v-bind="getIconProp(item.icon)"
          />
        </el-icon>

        {{ item.showName }}
      </component>
    </div>
  </ainow-menu-links-box>
</template>

<style scoped lang="less">
@import '../../assets/main.less';

ainow-menu-links-box {
  white-space: nowrap;
  //word-wrap: break-word;
  //word-break:keep-all;
  font-weight: 500;

  background-color: white;
  padding: 0.5em;
  border-radius: 8px;

  font-size: 1rem;

  display: flex;
  flex-direction: column;

  .name {
    width: fit-content;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0 0 5px;
    color: inherit;

    &:hover {
      color: inherit;
      cursor: default;
      background: transparent;
    }
  }

  .links {
    font-weight: normal;
    display: grid;
    grid-template-columns: repeat(8, minmax(auto, 1fr));
    row-gap: 1em;
    place-content: center;
    place-items: center;
    @media (max-width: 1200px) {
      grid-template-columns: repeat(7, minmax(auto, 1fr));
    }
    @media (max-width: 1000px) {
      grid-template-columns: repeat(6, minmax(auto, 1fr));
    }
    @media (max-width: 700px) {
      grid-template-columns: repeat(5, minmax(auto, 1fr));
    }
    @media (max-width: 500px) {
      grid-template-columns: repeat(4, minmax(auto, 1fr));
    }
    @media (max-width: 400px) {
      grid-template-columns: repeat(3, minmax(auto, 1fr));
    }
    @media (max-width: 300px) {
      grid-template-columns: repeat(2, minmax(auto, 1fr));
    }
    @media (max-width: 240px) {
      grid-template-columns: repeat(1, minmax(auto, 1fr));
    }

    a {
      padding: 0;
      color: inherit;
      display: flex;
      flex-direction: column;
      place-items: center;

      &:hover {
        color: @light-font-hover-color;
        background-color: transparent;
      }
    }

    i {
      font-size: 1.5em;
    }
  }
}
</style>
