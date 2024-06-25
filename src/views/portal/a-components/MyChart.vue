<script>
import * as echarts from 'echarts'

export default {
  mounted() {
    const mychart = echarts.init(this.$refs.mychart)
    const option = {
      title: {
        text: '示例echarts---'
      }
    }
    mychart.setOption(option)
  }
}
</script>

<template>
  <div ref="mychart" class="mychart-box"></div>
</template>

<style scoped>
.mychart-box {
  width: 500px;
  height: 50px;
  border: 1px solid #2c3e50;
}
</style>
