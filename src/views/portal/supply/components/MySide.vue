<script setup>
import { reactive } from 'vue';
import { useSupplyStoreHook } from '@/store/modules/supply';
import city from "@/utils/city";
import companyType from "@/utils/companyType";
const form = reactive({
  categorySelect: '全部',
  typeFlag: '',
  currentCategory:'',
  regionFlag:'',
  provinceFlag:'全部',
  currentProvince:''
})
const categoryChange = (item) => {
  form.categorySelect = item;
  form.typeFlag=''
  useSupplyStoreHook().setCategory(item)
}
const typeChange = (item) => {
  form.typeFlag = item;
  form.categorySelect=form.currentCategory
   useSupplyStoreHook().setType(item)
}
const showType=(item)=>{
  form.currentCategory=item
}
const showCity=(item)=>{
  form.currentProvince=item
}
const regionChange = (item) => {
  form.regionFlag = item.label;
  form.provinceFlag=form.currentProvince
  useSupplyStoreHook().setRegion(item.value)
}
const getAllRegion=()=>{
  form.provinceFlag='全部'
  form.regionFlag=''
  useSupplyStoreHook().setRegion('全部')
}
const reset = () => {
  form.categorySelect = '全部'
  form.provinceFlag=  '全部'
  form.regionFlag = ''
  form.form.typeFlag=''
  useSupplyStoreHook().reset();
}
</script>
<template>
  <div class="full_side">

    <div class="sort">
      <h4>需求类型</h4>
      <el-button type='success' 
      size="small" @click="categoryChange('全部')"
      :plain="form.categorySelect!='全部'">全部</el-button>
      <el-popover placement="bottom" :width="300" trigger="click" v-for="items in companyType" :key="items" >
      <template #reference>
        <el-button  type='success' size="small" @click="showType(items.value)"
      :plain="form.categorySelect!=items.label">{{ items.label }}</el-button>
      </template>
      <el-button type='success' 
      size="small" @click="categoryChange(items.label);form.typeFlag = '全部';"
      :plain="form.typeFlag!='全部'">全部</el-button>
      <el-button v-for="item in items.children" type='success' 
      size="small" @click="typeChange(item.label)" :key="item"
      :plain="form.typeFlag!=item.label">{{ item.label }}</el-button>
    </el-popover>
      <el-divider style="padding-bottom: 0;margin-bottom: 0;"></el-divider>
    </div>

     <div class="sort">
      <h4>需求地区</h4>
      <el-button type='success' 
      size="small" @click="getAllRegion"
      :plain="form.provinceFlag!='全部'">全部</el-button>
      <el-popover placement="bottom" :width="250" trigger="click" v-for="items in city" :key="items" >
      <template #reference>
        <el-button  type='success' size="small" @click="showCity(items.label)"
      :plain="form.provinceFlag!=items.label">{{ items.label }}</el-button>
      </template>
      <el-button v-for="item in items.children" type='success' 
      size="small" @click="regionChange(item)" :key="item"
      :plain="form.regionFlag!=item.label">{{ item.label }}</el-button>
    </el-popover>
      <el-divider style="padding-bottom: 0;margin-bottom: 0;"></el-divider>
    </div>
    <el-button type="success" style="margin: 3vh 2.5vw;width:15vw;" @click="reset">全部重置</el-button>
  </div>
</template>
<style scoped lang="less">
@fontsize1:calc((1rem + 1vw)*0.5);
.full_side{
  background-color: white;
  min-height: auto;
  font-size: @fontsize1;
}
.el-button{
  margin-left: 12px;
  margin-top:5px;
  font-size: @fontsize1;
  border-width: 0;
}
.sort{
  margin:0 1vw;
//  display: flex;
}
.full_side h4{
  padding-top: 3vh;
    margin-left: 12px;
  padding-bottom: 2vh;
  font-size: calc((1rem + 1vw)*0.6);
}
</style>