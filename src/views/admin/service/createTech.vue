<template>
  <div class="flex gap-8">
    <PlusForm
      v-model="state"
      ref=""
      :group="group"
      :rules="rules"
      style="width: 1000px"
      label-width="100px"
      @submit="handleSubmit"
      label-position="right"
      submit-text="发布"
      class="flex-grow"
      :has-reset="false"
    >
      <template #plus-field-achievement_image>
        <el-upload
          action="/api/v1/uploadfile"
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="state.achievement_image"
            :src="state.achievement_image"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </template>
      <template #plus-field-industry_sector>
        <div v-for="item in companyType" style="width: 100%">
          <div style="font-weight: 600">{{ item.value }}</div>
          <div style="display: flex; flex-wrap: wrap">
            <el-radio-group v-model="state.industry_sector">
              <el-radio
                v-for="items in item.children"
                :value="items.value"
                :label="items.value"
                style="width: 20%"
              />
            </el-radio-group>
          </div>
        </div>
      </template>
      <template #plus-field-achievement_brief_introduction>
        <EditorBase v-model="state.achievement_brief_introduction" />
      </template>
      <template #plus-field-attachments>
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="/api/v1/uploadfile"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          max-size="30"
        >
          <el-button type="primary" plain> 上传附件</el-button>
          <template #tip>
            <div class="el-upload__tip">
              1.上传证明材料有利于提高您技术的可信度，助于技术推广；<br />
              2.材料格式为：jpg、png、doc、.docx .pdf <br />
              3.最多上传10份，每份大小在30M以内；<br />
              4.材料建议：技术检测报告、样品图片、中试报告、合作合同等直接证明技术成熟可行的材料。
            </div>
          </template>
        </el-upload>
      </template>
      <template #footer="{ handleSubmit }">
        <div
          class="footer"
          style="width: 100%; display: flex; justify-content: center"
        >
          <el-button type="primary" style="width: 200px" @click="handleSubmit"
            >发布科技成果</el-button
          >
        </div>
      </template>
    </PlusForm>
    <el-card style="width: 600px">
      <div class="flex justify-between">
        <div class="text-xl font-semibold">智能匹配需求</div>
        <div class="text-lg">更多>></div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import city from "@/utils/city";
import companyType from "@/utils/companyType";
import { http } from "@/utils/http";
import {
  IndustrySectorEnum,
  achievement_attributeList,
} from "@/utils/typeList";
import { CreditCard, Plus } from "@element-plus/icons-vue";
import { cloneDeep } from "@pureadmin/utils";
import type { UploadUserFile } from "element-plus";
import { ElMessage, type FormInstance } from "element-plus";
import {
  PlusForm,
  type FieldValues,
  type PlusFormGroupRow,
} from "plus-pro-components";
import "plus-pro-components/es/components/form/style/css";
import { ref } from "vue";
import EditorBase from "./components/EditorBase.vue";

const ruleFormRef = ref<FormInstance>();
const fileList = ref<UploadUserFile[]>([]);

const state = ref({
  contact_person: "",
  contact_phone: "",
  company_name: "",
  region: "",
  achievement_name: "",
  achievement_year: "",
  achievement_category: "",
  achievement_attribute: "",
  achievement_maturity: "",
  technology_field: "",
  main_application_industry: "",
  industry_sector: "",
  patent_number: "",
  achievement_brief_introduction: "",
  achievement_transfer_method: "",
  achievement_transfer_price: "",
  achievement_image:
    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
  attachments: "",
  createUserId: JSON.parse(localStorage.getItem("userInfo")).id,
});
const handleAvatarSuccess = (resp) => {
  state.value.achievement_image = resp.fileUrl;
};
const rules = {
  contact_person: [
    {
      required: true,
      message: "请输入联系人名字",
    },
  ],
  contact_phone: [
    {
      required: true,
      message: "请输入联系人电话",
    },
  ],
  company_name: [
    {
      required: true,
      message: "请输入企业名称",
    },
  ],
  region: [
    {
      required: true,
      message: "请输入所属区域",
    },
  ],
  achievement_name: [
    {
      required: true,
      message: "请输入科技成果名称",
    },
  ],
  achievement_year: [
    {
      required: true,
      message: "请输入成果年份",
    },
  ],
  achievement_category: [
    {
      required: true,
      message: "请输入成果类别",
    },
  ],
  achievement_attribute: [
    {
      required: true,
      message: "请输入成果属性",
    },
  ],
  achievement_maturity: [
    {
      required: true,
      message: "请输入成果成熟度",
    },
  ],
  technology_field: [
    {
      required: true,
      message: "请输入所属技术领域",
    },
  ],
  main_application_industry: [
    {
      required: true,
      message: "请输入主要应用行业",
    },
  ],
  industry_sector: [
    {
      required: true,
      message: "请输入所属产业",
    },
  ],
  patent_number: [
    {
      required: true,
      message: "请输入专利编号",
    },
  ],
  achievement_brief_introduction: [
    {
      required: true,
      message: "请输入成果简介",
    },
  ],
  achievement_transfer_method: [
    {
      required: true,
      message: "请输入成果转让方式",
    },
  ],
  achievement_transfer_price: [
    {
      required: true,
      message: "请输入成果转让价格",
    },
  ],
  achievement_image: [
    {
      required: true,
      message: "请上传成果图片",
    },
  ],
  attachments: [
    {
      required: true,
      message: "请上传成果附件",
    },
  ],
};
const handlePreview = (file: UploadUserFile) => {
  console.log(fileList.value);
  console.log(file);
};
const handleSuccess = (resp) => {
  state.value.attachments = resp.fileUrl;
};

const group: PlusFormGroupRow[] = [
  {
    title: "成果联系信息",
    icon: CreditCard,
    columns: [
      {
        label: "联系人",
        width: "900px",
        prop: "contact_person",
        valueType: "input",
        message: "请输入需求名称",
      },
      {
        label: "联系电话",
        width: "900px",
        prop: "contact_phone",
        valueType: "input",
        message: "请输入需求名称",
      },
      {
        label: "企业名称",
        width: "900px",
        prop: "company_name",
        valueType: "input",
        message: "请输入需求名称",
      },
      {
        label: "所属区域",
        prop: "region",
        valueType: "cascader",
        options: city,
      },
    ],
  },
  {
    title: "科技成果信息",
    icon: CreditCard,
    columns: [
      {
        label: "成果名称",
        width: 220,
        prop: "achievement_name",
        valueType: "copy",
      },
      {
        label: "成果年份",
        slot: "achievement_year",
        prop: "achievement_year",
      },
      {
        label: "成果类别",
        prop: "achievement_category",
        valueType: "select",
        options: IndustrySectorEnum,
      },
      {
        label: "成果属性",
        prop: "achievement_attribute",
        valueType: "select",
        options: achievement_attributeList,
      },
      {
        label: "成果成熟度",
        prop: "achievement_maturity",
        valueType: "select",
        options: achievement_attributeList,
      },
      {
        label: "技术领域",
        prop: "technology_field",
        valueType: "select",
        options: achievement_attributeList,
      },
      {
        label: "应用行业",
        prop: "main_application_industry",
        valueType: "select",
        options: achievement_attributeList,
      },
      {
        label: "所属产业",
        prop: "industry_sector",
      },
      {
        label: "专利编号",
        width: "900px",
        prop: "patent_number",
        valueType: "input",
        message: "请输入需求名称",
      },
      {
        label: "成果简介",
        width: "900px",
        prop: "achievement_brief_introduction",
      },
      {
        label: "转让方式",
        prop: "achievement_transfer_method",
        valueType: "select",
        options: achievement_attributeList,
      },
      {
        label: "转让价格",
        prop: "achievement_transfer_price",
        valueType: "input",
      },
      {
        label: "成果封面",
        prop: "achievement_image",
      },
      {
        label: "成果附件",
        prop: "attachments",
      },
    ],
  },
];

const handleSubmit = async (values: FieldValues) => {
  let submitValue = cloneDeep(values);
  submitValue.region = submitValue.region[submitValue.region.length - 1];
  console.log("submitValue", submitValue);
  const resp = await http.request<any>(
    "post",
    "/api/v1/technologyAchievements",
    {
      data: submitValue,
    },
  );
  console.log("resp", resp);
  if (resp.id) {
    router.push("/service/technologyAchievementManage");
  } else {
    ElMessage.error("提交失败,请重试");
  }
};
const handleSubmitError = (err: any) => {
  console.log(err, "err");
};
const handleReset = () => {
  console.log("handleReset");
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
.el-card {
  .recommend {
    height: 200px;
    width: 100%;
  }
}
</style>
