<template>
  <el-card class="form_body" style="width: 100%; display: flex; justify-content: left;"> 
    <el-form :model="organization" label-width="200px" label-position="right" style="width: 80vw;">
    <el-form-item label="公司Logo">
      <el-image :src="organization.business_logo"  style="height: 200px;"/>
    </el-form-item>
    <el-form-item label="营业执照">
      <el-image :src="organization.business_license" style="height: 200px;"/>
    </el-form-item>
    <el-form-item label="公司类型">
      <el-input v-model="organization.organization_type" disabled />
    </el-form-item>
    <el-form-item label="公司名">
      <el-input v-model="organization.organization_name" disabled />
    </el-form-item>
    <el-form-item label="社会信用代码">
      <el-input v-model="organization.social_credit_code" disabled />
    </el-form-item>
    <el-form-item label="创建日期">
      <el-date-picker v-model="organization.establishment_date" disabled />
    </el-form-item>
    <el-form-item label="公司规模">
      <el-input v-model="organization.company_size" disabled />
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="organization.contact_phone" disabled />
    </el-form-item>
    <el-form-item label="注册地">
      <el-input v-model="organization.registration_region" disabled />
    </el-form-item>
    <el-form-item label="公司地址">
      <el-input v-model="organization.detailed_address" disabled />
    </el-form-item>
    <el-form-item label="注册基本">
      <el-input v-model="organization.registered_capital" disabled />
    </el-form-item>
    <el-form-item label="经营范围">
      <el-input v-model="organization.company_introduction" type="textarea" disabled />
    </el-form-item>
    <el-form-item label="核心技术">
      <el-input v-model="organization.core_abilities" disabled />
    </el-form-item>
    <el-form-item label="所属行业">
      <el-input v-model="organization.industry" disabled />
    </el-form-item>

  </el-form></el-card>
 
</template>

<script lang="ts" setup>
import { ElDatePicker, ElForm, ElFormItem, ElImage, ElInput } from 'element-plus';
import { ref } from 'vue';

interface Organization {
  id: string;
  business_logo: string;
  business_license: string;
  organization_type: string;
  organization_name: string;
  social_credit_code: string;
  establishment_date: string;
  company_size: string;
  contact_phone: string;
  registration_region: string;
  detailed_address: string;
  registered_capital: string;
  company_introduction: string;
  core_abilities: string;
  industry: string;
  ctime: string;
  mtime: string;
  create_user_id: string;
}

const organization = ref<Organization>({
  id: 'da6a14c7-0bf3-420b-bbb8-ba540fe4b7e3',
  business_logo: 'https://yiliaoqixie-1253997872.cos.ap-nanjing.myqcloud.com/b7cf6e9b-e011-42ce-90db-615201e091e7',
  business_license: 'https://yiliaoqixie-1253997872.cos.ap-nanjing.myqcloud.com/cca04731-2eca-4b04-aa36-a816686d5f24',
  organization_type: '其他',
  organization_name: '合肥任也科技有限公司',
  social_credit_code: '91340100MA8NEH400Q',
  establishment_date: '2021-11-22',
  company_size: '50-500人',
  contact_phone: '18055674399',
  registration_region: '合肥市',
  detailed_address: '安徽省合肥市高新区大学生创业园A1栋A1-813',
  registered_capital: '50.00',
  company_introduction: '一般项目：软件开发；技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；软件销售；计算机软硬件及辅助设备零售；计算机软硬件及外围设备制造；仪器仪表销售；工程和技术研究和试验发展；电子元器件零售；电子产品销售；第一类医疗器械生产；第一类医疗器械销售；第二类医疗器械销售；数据处理服务；网络技术服务；化工产品销售（不含许可类化工产品）；日用化学产品销售；专用化学产品销售（不含危险化学品）（除许可业务外，可自主依法经营法律法规非禁止或限制的项目）',
  core_abilities: '111',
  industry: '信息传输、软件和信息技术服务业',
  ctime: '2024-07-17T15:51:24.895912Z',
  mtime: '2024-07-17T15:51:24.895977Z',
  create_user_id: 'ddc42355-d9ca-4a75-ae2b-5ea4ba344b73',
});
</script>

<style scoped>
/* Add any necessary styles here */
</style>
