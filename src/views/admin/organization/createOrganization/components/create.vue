<template>
  <div class="flex gap-8">
    <PlusForm
      v-model="state"
      ref="ruleFormRef"
      :group="group"
      :rules="rules"
      style="width: 1000px"
      label-width="100px"
      @submit="handleSubmit"
      label-position="right"
      submit-text="创建组织"
      class="flex-grow"
      :has-reset="false"
    >
      <template #plus-field-business_logo>
        <el-upload
          action="/api/v1/uploadfile"
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="state.business_logo"
            :src="state.business_logo"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </template>
      <template #plus-field-organization_name>
        <el-input v-model="state.organization_name" disabled></el-input>
      </template>
      <template #plus-field-social_credit_code>
        <el-input v-model="state.social_credit_code" disabled></el-input>
      </template>
      <template #plus-field-registration_region>
        <el-input v-model="state.registration_region" disabled></el-input>
      </template>
      <template #plus-field-detailed_address>
        <el-input v-model="state.registration_region" disabled></el-input>
      </template>
      <template #plus-field-establishment_date>
        <el-date-picker
          v-model="state.establishment_date"
          value-format="YYYY-MM-DD"
          disabled
        ></el-date-picker>
      </template>
      <template #plus-field-business_license>
        <el-upload
          action="/api/v1/uploadfile"
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleLicenseSuccess"
        >
          <img
            v-if="state.business_license"
            :src="state.business_license"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </template>

      <template #footer="{ handleSubmit }">
        <div
          class="footer"
          style="width: 100%; display: flex; justify-content: center"
        >
          <el-button type="primary" style="width: 200px" @click="handleSubmit"
            >创建组织</el-button
          >
        </div>
      </template>
    </PlusForm>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { http } from "@/utils/http";
import { company_size, organizationTypeList } from "@/utils/typeList";
import { Plus } from "@element-plus/icons-vue";
import { cloneDeep } from "@pureadmin/utils";
import { type FormInstance } from "element-plus";
import {
  PlusForm,
  type FieldValues,
  type PlusFormGroupRow,
} from "plus-pro-components";
import "plus-pro-components/es/components/form/style/css";
import { ref } from "vue";

const ruleFormRef = ref<FormInstance>();
const state = ref({
  business_logo: "",
  business_license: "",
  organization_type: "其他", // Default value, adjust as needed
  organization_name: "",
  social_credit_code: "",
  establishment_date: "",
  company_size: "",
  contact_phone: "",
  registration_region: "",
  detailed_address: "",
  registered_capital: null,
  company_introduction: "",
  core_abilities: "",
  industry: "",
  create_user_id: JSON.parse(localStorage.getItem("userInfo")).id,
});

const rules = {
  organization_name: [{ required: true, message: "请输入组织名称" }],
  social_credit_code: [{ required: true, message: "请输入社会信用代码" }],
  establishment_date: [{ required: true, message: "请输入成立时间" }],
  company_size: [{ required: true, message: "请输入公司规模" }],
  contact_phone: [{ required: true, message: "请输入联系电话" }],
  registration_region: [{ required: true, message: "请输入注册地址" }],
  detailed_address: [{ required: true, message: "请输入详细地址" }],
  registered_capital: [{ required: true, message: "请输入注册资金" }],
  company_introduction: [{ required: true, message: "请输入公司介绍" }],
  industry: [{ required: true, message: "请输入所属行业" }],

  // Add other validation rules as needed
};
if (localStorage.getItem("companyInfo")) {
  // {"data":{"CityCode":"340100","RealCapital":"50.000000万人民币","LegalPersonType":"自然人","Authority":"合肥市高新开发区市场监督管理局","CompanyAddress":"安徽省合肥市高新区大学生创业园A1栋A1-813","Industry":{"Industry":"信息传输、软件和信息技术服务业","SubIndustryCode":"65","IndustryCode":"I","MiddleCategory":"软件开发","SmallCategoryCode":"6513","SmallCategory":"应用软件开发","SubIndustry":"软件和信息技术服务业","MiddleCategoryCode":"651"},"CompanyName":"合肥任也科技有限公司","DistrictCode":"340104","CompanyStatus":"存续（在营、开业、在册）","BusinessScope":"一般项目：软件开发；技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；软件销售；计算机软硬件及辅助设备零售；计算机软硬件及外围设备制造；仪器仪表销售；工程和技术研究和试验发展；电子元器件零售；电子产品销售；第一类医疗器械生产；第一类医疗器械销售；第二类医疗器械销售；数据处理服务；网络技术服务；化工产品销售（不含许可类化工产品）；日用化学产品销售；专用化学产品销售（不含危险化学品）（除许可业务外，可自主依法经营法律法规非禁止或限制的项目）","LastUpdatedTime":"2024-07-15 06:05:28","IssueDate":"2024-03-13 00:00:00","City":"合肥市","Capital":"50.000000万人民币","CompanyType":"有限责任公司(自然人投资或控股)","LegalPerson":"蒋庆彤","Province":"安徽省","EstablishDate":"2021-11-22 00:00:00","OrgCode":"MA8NEH400","Contacts":{"Email":[{"Note":"2023年报","Value":"2470070997@qq.com"}],"Address":[{"Note":"2022年报","Value":"中国(安徽)自由贸易试验区合肥市高新区望江西路860号科创中心B座4层A006"},{"Note":"2023年报","Value":"安徽省合肥市高新区大学生创业园A1栋A1-813"}],"PhoneNumber":[{"Note":"","Value":"18055674399"},{"Note":"","Value":"18355185526"}]},"ProvinceCode":"340000","CreditNo":"91340100MA8NEH400Q","OperationStartDate":"2021-11-22 00:00:00","District":"蜀山区","CompanyCode":"340171000425406"},"msg":"成功","success":true,"code":200,"taskNo":"946363097146080854919713","charge":true}
  const companyInfo = JSON.parse(localStorage.getItem("companyInfo"));
  state.value.organization_name = companyInfo.data.CompanyName;
  state.value.social_credit_code = companyInfo.data.CreditNo;
  state.value.establishment_date =
    companyInfo.data.OperationStartDate.split(" ")[0];
  state.value.contact_phone = companyInfo.data.Contacts.PhoneNumber[0].Value;
  state.value.registration_region = companyInfo.data.City;
  state.value.detailed_address = companyInfo.data.CompanyAddress;
  state.value.registered_capital = companyInfo.data.RealCapital.split("万")[0];
  state.value.company_introduction = companyInfo.data.BusinessScope;
  state.value.industry = companyInfo.data.Industry.Industry;
}
const handleAvatarSuccess = (resp) => {
  state.value.business_logo = resp.fileUrl;
};

const handleLicenseSuccess = (resp) => {
  state.value.business_license = resp.fileUrl;
};

const group: PlusFormGroupRow[] = [
  {
    title: "组织信息",
    icon: Plus,
    columns: [
      { label: "企业logo", prop: "business_logo" },
      { label: "营业执照", prop: "business_license" },
      {
        label: "组织名称",
        prop: "organization_name",
      },
      {
        label: "组织类型",
        prop: "organization_type",
        valueType: "select",
        options: organizationTypeList,
      },
      { label: "社会信用代码", prop: "social_credit_code" },
      {
        label: "成立时间",
        prop: "establishment_date",
      },
      {
        label: "企业规模",
        prop: "company_size",
        valueType: "select",
        options: company_size,
      },
      { label: "联系电话", prop: "contact_phone", valueType: "input" },
      { label: "注册地址", prop: "registration_region" },
      { label: "详细地址", prop: "detailed_address" },
      {
        label: "注册资本(万元)",
        prop: "registered_capital",
        valueType: "input-number",
      },
      {
        label: "企业简介",
        prop: "company_introduction",
        valueType: "textarea",
      },
      {
        label: "核心能力",
        prop: "core_abilities",
        valueType: "textarea",
      },
      { label: "行业", prop: "industry", valueType: "input" },
    ],
  },
];

const handleSubmit = async (values: FieldValues) => {
  let submitValue = cloneDeep(values);
  console.log("submitValue", submitValue);
  const resp = await http.request<any>("post", "/api/v1/organizations", {
    data: submitValue,
  });
  if (resp.id) {
    localStorage.setItem('orgId', resp.id)
    // 把自己添加到组织
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const memberResp = await http.request<any>("post", "/api/v1/organizationMembers", {
      data: {
      "name": userInfo.username,
      "contact_phone": userInfo.phoneNumber,
      "role": "1", // 1 管理员
      "organization_id": resp.id,
      "user_id":userInfo.id
      }
  });
     router.push('/organization/manage')
  }
  // Assume here we call the API to submit data
};
</script>

<style lang="scss">
.avatar-uploader {
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    &:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      text-align: center;
    }
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }
  }
}
</style>
