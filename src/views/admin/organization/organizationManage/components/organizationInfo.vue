<template>
  <el-card
    class="form_body"
    style="width: 100%; display: flex; justify-content: left"
  >
    <el-form
      :model="organization"
      label-width="200px"
      label-position="right"
      style="width: 80vw"
    >
      <el-form-item label="公司Logo">
        <el-image :src="organization.business_logo" style="height: 200px" />
      </el-form-item>
      <el-form-item label="营业执照">
        <el-image :src="organization.business_license" style="height: 200px" />
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
        <el-input
          v-model="organization.company_introduction"
          type="textarea"
          disabled
        />
      </el-form-item>
      <el-form-item label="核心技术">
        <el-input v-model="organization.core_abilities" disabled />
      </el-form-item>
      <el-form-item label="所属行业">
        <el-input v-model="organization.industry" disabled />
      </el-form-item> </el-form
  ></el-card>
</template>

<script lang="ts" setup>
import {
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElImage,
  ElInput,
} from "element-plus";
import { ref } from "vue";
const props = defineProps<{
  orgInfo: any;
}>();
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

const organization = ref<Organization>(props.orgInfo);
</script>

<style scoped>
/* Add any necessary styles here */
</style>
