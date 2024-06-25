import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

interface HeaderState {
  showBehavior: string
  title: string
  position: string
  bgc: string
  color: string
  boxShadow: string
  transform: string
}

interface NavIcon {
  name: string
  theme?: string
  fill?: string
}

interface NavItem {
  showName: string
  type: 'RouterLink' | 'a'
  path: string
  target?: string
  icon?: NavIcon
  children?: NavItem[]
}

interface AudioItem {
  name: string
  url: string
}

interface ContactCodeBean {
  path: string
}

interface ContactItem {
  name: string
  value: string
  iconName: string
  codeBean?: ContactCodeBean
}

interface RecommendItem {
  imgPath: string
  title: string
  summary: string
  detailPath: string
  date: string
  author: string
}

export const use_app_state_store = defineStore(
  'app_state_store',
  () => {
    let headerState: Ref<HeaderState> = ref({
      showBehavior: 'autoHide,titleMode,transparentMode,',
      title: 'welcome to',
      position: 'fixed',
      bgc: 'grey' || 'transparent',
      color: '#dfdfdf',
      boxShadow: '0 0 30px rgba(0, 0, 0, .2)',
      transform: 'translateY(0)'
    })

    let musicPlayerState = ref({
      offset: computed(() => {
        return headerState.value.transform === 'translateY(0)' ? 50 : 0
      })
    })

    const navs: Ref<NavItem[]> = ref([
      {
        showName: '产品',
        type: 'RouterLink',
        path: '/product',
        children: [
          {
            showName: '官网模板(开源)',
            path: 'https://gitee.com/ainowr/official-website-template',
            icon: {
              name: 'page-template'
            },
            type: 'a',
            target: '_blank'
          },
          {
            showName: '免签支付',
            path: 'https://juejin.cn/post/7338214297572835380',
            icon: {
              name: 'pay-code-one'
            },
            type: 'a',
            target: '_blank'
          },
          {
            showName: '首页模板(free)',
            path: '/pages/example/index/',
            icon: {
              name: 'page-template'
            },
            type: 'a'
          }
        ]
      },
      {
        showName: '小案例',
        type: 'RouterLink',
        path: '/demo',
        children: [
          {
            showName: 'noteOptionsApi',
            path: '/noteOptionsApi',
            type: 'RouterLink'
          },
          {
            showName: 'notebook',
            icon: {
              name: 'notebook'
            },
            path: '/notebook',
            type: 'RouterLink'
          },
          { showName: 'demoZJ', path: '/demoZJ', type: 'RouterLink' },
          { showName: 'cart', path: '/cart', type: 'RouterLink' },
          { showName: 'vuex', path: '/vuex', type: 'RouterLink' },
          {
            showName: 'vuex2',
            path: '/vuex2',
            type: 'RouterLink',
            target: '_self'
          },
          {
            showName: 'news',
            icon: {
              name: 'newspaper-folding'
            },
            path: '/news',
            type: 'RouterLink'
          },
          {
            showName: 'table-slot',
            icon: {
              name: 'insert-table'
            },
            path: '/table',
            type: 'RouterLink'
          },
          { showName: 'Note-传参', path: '/note/3?key=4', type: 'RouterLink' }
        ]
      },
      {
        showName: '推荐',
        type: 'RouterLink',
        path: '/#recommend',
        icon: {
          name: 'good-two',
          theme: 'filled',
          fill: '#1880aeff'
        }
      },
      {
        showName: '赠杯咖啡',
        type: 'a',
        target: '_blank',
        path: 'http://ainowr.com:8100/donate/index.html',
        icon: {
          name: 'like',
          theme: 'filled',
          fill: 'red'
        }
      }
    ])

    const audios: Ref<AudioItem[]> = ref([
      {
        name: '卡农',
        url: '/src/assets/audio/kano.mp3'
      },
      {
        name: '总有一天你会出现在我身边',
        url: '/src/assets/audio/总有一天你会出现在我身边.mp3'
      },
      {
        name: 'shed a light',
        url: '/src/assets/audio/ShedALight.mp3'
      },
      {
        name: '下雨天',
        url: '/src/assets/audio/下雨天.mp3'
      },
      {
        name: 'song for a king',
        url: '/src/assets/audio/SongForAKing.mp3'
      },
      {
        name: '最后一页',
        url: '/src/assets/audio/最后一页.mp3'
      }
    ])

    const contacts: Ref<ContactItem[]> = ref([
      {
        name: '微信号1',
        value: 'ainow',
        iconName: 'wechat',
        codeBean: {
          path: '/src/assets/img/contacts/ainow.jpg'
        }
      },
      {
        name: '微信号2',
        value: '_valnow',
        iconName: 'wechat',
        codeBean: {
          path: '/src/assets/img/contacts/_valnow.jpg'
        }
      },
      {
        name: 'QQ交流群',
        value: '709852732',
        iconName: 'tencent-qq',
        codeBean: {
          path: '/src/assets/img/contacts/qqGroup.jpg'
        }
      },
      { name: '邮箱', value: '1613882077@qq.com', iconName: 'mail-open' },
      { name: '电话', value: '+86-none', iconName: 'phone-telephone' },
      { name: '地址', value: 'china, gd - xxxxxx', iconName: 'local' }
    ])

    const recommendItems: Ref<RecommendItem[]> = ref([
      {
        imgPath: '/src/assets/img/recommend/official.jpg',
        title: '官网模板(开源)',
        summary: '基于vue3,vite开发的通用型官网模板',
        detailPath: 'https://gitee.com/ainowr/official-website-template',
        date: ' 21st oct., 2023 ',
        author: 'ainow'
      },
      {
        imgPath: '/src/assets/img/recommend/qMqPay.jpg',
        title: 'Q免签支付',
        summary: '微信支付宝个人免签约，免营业执照，0手续收款方案',
        detailPath: 'https://juejin.cn/post/7338214297572835380',
        date: ' 21st oct., 2023 ',
        author: 'ainow'
      },
      {
        imgPath: '/src/assets/img/recommend/index.jpg',
        title: '首页模板(free)',
        summary: '主要使用html,css,js编写的简单前端首页模板',
        detailPath: '/pages/example/index/',
        date: ' 03 may, 2023',
        author: 'ainow'
      }
    ])

    return {
      headerState,
      musicPlayerState,
      navs,
      audios,
      contacts,
      recommendItems
    }
  },
  {
    persist: false
  }
)
