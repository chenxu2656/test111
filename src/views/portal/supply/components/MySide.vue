<script setup>
import { reactive } from 'vue'
const form = reactive({
  categorySelect: '全部',
  typeFlag: '全部',
  regionFlag:'全部',
  category: ['全部', '企业需求', '科研需求'],
  type: ['全部', '研发', '生产', '供应链', '采购', '销售', '管理', '服务', '其他'],
  region:['全部','合肥市','芜湖市','蚌埠市','淮南市','马鞍山市','淮北市','铜陵市','安庆市','黄山市','滁州市','阜阳市','宿州市','六安市','亳州市','池州市','宣城市','其他']
})
const categoryChange = (item) => {
  form.categorySelect = item;
}
const typeChange = (item) => {
  form.typeFlag = item;
}
const regionChange = (item) => {
  form.regionFlag = item;
}
const reset = () => {
  form.categorySelect = '全部'
  form.typeFlag=  '全部'
  form.regionFlag=  '全部'
}
</script>
<template>
  <div class="full_side">
    <div class="sort">
      <h4>需求分类</h4>
      <el-button v-for="item in form.category" type='primary' 
      size="small" @click="categoryChange(item)"
      :plain="form.categorySelect!=item">{{ item }}</el-button>
      <el-divider style="padding-bottom: 0;margin-bottom: 0;"></el-divider>
    </div>
    <div class="sort">
      <h4>需求类型</h4>
      <el-button v-for="item in form.type" type='success' 
      size="small" @click="typeChange(item)"
      :plain="form.typeFlag!=item">{{ item }}</el-button>
      <el-divider style="padding-bottom: 0;margin-bottom: 0;"></el-divider>
    </div>
     <div class="sort">
      <h4>所属地区</h4>
      <el-button v-for="item in form.region" type='warning' 
      size="small" @click="regionChange(item)"
      :plain="form.regionFlag!=item">{{ item }}</el-button>
      <el-divider style="padding-bottom: 0;margin-bottom: 0;"></el-divider>
    </div>
    <el-button type="primary" style="margin-top: 3vh;width:15vw;margin-left:2.5vw" @click="reset">全部重置</el-button>
  </div>
</template>
<style scoped lang="less">
.full_side{
  background-color: white;
  min-height: 95vh;
}
.el-button{
  margin-left: 12px;
  margin-top:5px
}
.sort{
  margin:0 1vw;
}
.full_side h4{
  padding-top: 3vh;
    margin-left: 12px;
  padding-bottom: 2vh;
}
</style>