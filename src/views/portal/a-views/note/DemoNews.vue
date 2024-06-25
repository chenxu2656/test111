<script>
import axios from 'axios'
import FormInput from '@/views/portal/a-components/FormInput.vue'

export default {
  name: 'NewsView',
  components: { FormInput },
  data() {
    return {
      list: [],
      isLoading: true,
      fileName: 'DemoNews.vue'
    }
  },
  async created() {
    const res = await axios.get('http://hmajax.itheima.net/api/news')

    // this.list = res.data.data
    // this.isLoading = false

    setTimeout(() => {
      this.list = res.data.data
      this.isLoading = false
    }, 2000)
  },
  activated() {},
  deactivated() {}
}
</script>

<template>
  <!--    <keep-alive>-->
  <ainow-news>
    <div class="box">
      <div>news</div>
      <div v-loading="isLoading" class="news-box">
        <!--  <div class="news-box loading">-->
        <ul>
          <li v-for="item in list" :key="item.id" class="news">
            <div class="left">
              <div class="title">{{ item.title }}</div>
              <div class="info">
                <span>{{ item.source }}</span>
                <span>{{ item.time }}</span>
              </div>
            </div>
            <div class="right">
              <img :src="item.img" alt="" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </ainow-news>
  <!--    </keep-alive>-->
</template>

<style scoped lang="less">
@import '@/assets/main.less';

.box {
  color: black;
  font-size: 20px;
  padding-top: @headerHeight;
}
.news-box {
  min-height: 400px;
  background: beige;
  position: relative;
}
</style>
