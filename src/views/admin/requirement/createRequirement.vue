<template>
  <div class="flex gap-8">
    <PlusForm
      v-model="state"
      :group="group"
      :rules="rules"
      style="width: 1000px"
      label-width="100px"
      label-position="right"
      submit-text="发布"
      :has-reset="false"
    >
      <template #plus-field-images>
        <el-upload
          action="/api/v1/uploadfile"
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="state.cover_image"
            :src="state.cover_image"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </template>
      <template #plus-field-type>
        <div v-for="item in companyType" style="width: 100%">
          <div style="font-weight: 600">{{ item.value }}</div>
          <div style="display: flex; flex-wrap: wrap">
            <el-radio-group
              v-model="state.type"
              @change="() => (state.category = item.value)"
            >
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
      <template #footer>
        <div
          class="footer"
          style="width: 100%; display: flex; justify-content: center"
        >
          <el-button
            type="primary"
            style="width: 200px"
            @click="handleSubmit(state)"
            >发布需求</el-button
          >
        </div>
      </template>
    </PlusForm>
    <el-card class="flex-grow">
      <div class="flex justify-between">
        <div class="text-xl font-semibold">您可能关注的解决方案</div>
        <div class="text-lg">更多>></div>
      </div>
      <div class="recommend">1</div>
      <div class="flex justify-between">
        <div class="text-xl font-semibold">您可能关注的行业专家</div>
        <div class="text-lg">更多>></div>
      </div>
      <div class="recommend">1</div>
      <div class="flex justify-between">
        <div class="text-xl font-semibold">您可能关注的创新成果</div>
        <div class="text-lg">更多>></div>
      </div>
      <div class="recommend">1</div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import city from "@/utils/city";
import companyType from "@/utils/companyType";
import companyhangye from "@/utils/companyhangye";
import { http } from "@/utils/http";
import { CreditCard, Plus } from "@element-plus/icons-vue";
import { cloneDeep } from "@pureadmin/utils";
import dayjs from "dayjs";
import {
  PlusForm,
  type FieldValues,
  type PlusColumn,
  type PlusFormGroupRow,
} from "plus-pro-components";
import "plus-pro-components/es/components/form/style/css";
import { ref } from "vue";
const state = ref({
  name: "", // 需求名称
  type: "", // 需求类型
  category: "", // 需求分类
  region: "", //需求地区
  timeSpace: "", // 需求时间
  start_date: "", // 开始时间
  end_date: "", // 结束时间
  content: "", // 需求内容
  cover_image: "",
  company_name: "", // 公司名字
  company_location: "", // 公司location
  company_type: "", // 公司类型
  contactName: "", // 联系人名字
  contactPhone: "", // 联系人电话
  createUserId: JSON.parse(localStorage.getItem("userInfo")).id,
});
const handleAvatarSuccess = (resp) => {
  state.value.cover_image = resp.fileUrl;
};
const rules = {
  name: [
    {
      required: true,
      message: "请输入名称",
    },
  ],
  tag: [
    {
      required: true,
      message: "请输入标签",
    },
  ],
};

const group: PlusFormGroupRow[] = [
  {
    title: "需求信息",
    icon: CreditCard,

    columns: [
      {
        label: "需求名称",
        width: "900px",
        prop: "name",
        valueType: "input",
        message: "请输入需求名称",
        pleaseEnter: "111",
      },
      {
        label: "需求类型",
        prop: "type",
      },
      {
        label: "需求城市",
        prop: "region",
        valueType: "cascader",
        options: city,
      },
      {
        label: "需求时间范围",
        prop: "timeSpace",
        valueType: "date-picker",
        startProps: "start_date",
        endProps: "end_date",
        fieldProps: {
          type: "datetimerange",
          startPlaceholder: "请选择开始时间",
          endPlaceholder: "请选择结束时间",
        },
      },
      {
        label: "需求内容",
        prop: "content",
        valueType: "textarea",
        fieldProps: {
          maxlength: 10,
          showWordLimit: true,
          autosize: { minRows: 2, maxRows: 4 },
        },
      },
      {
        label: "封面图",
        prop: "images",
      },
    ],
  },
  {
    title: "企业基础信息",
    icon: CreditCard,
    columns: [
      {
        label: "企业名称",
        width: 220,
        prop: "company_name",
        valueType: "copy",
      },
      {
        label: "企业所在地",
        prop: "company_location",
        valueType: "cascader",
        options: city,
      },
      {
        label: "所属行业",
        prop: "company_type",
        valueType: "select",
        options: companyhangye,
      },
    ],
  },
  {
    title: "联系人信息",
    icon: CreditCard,
    columns: [
      {
        label: "姓名",
        width: 220,
        prop: "contactName",
        valueType: "input",
      },
      {
        label: "联系电话",
        prop: "contactPhone",
        valueType: "input",
      },
    ],
  },
];

const handleChange = (values: FieldValues, prop: PlusColumn) => {
  console.log(values, prop, "change");
};
const handleSubmit = (values: FieldValues) => {
  // 处理数据
  // 处理开始日期 和 结束日期
  let submitValue = cloneDeep(values);
  // 日期格式转换成 YYYY-MM-DD

  submitValue.start_date = dayjs(submitValue.timeSpace[0]).format("YYYY-MM-DD");
  submitValue.end_date = dayjs(submitValue.timeSpace[1]).format("YYYY-MM-DD");
  delete submitValue.timeSpace;
  // submitValue.company_location =  数组最后一项
  submitValue.company_location =
    submitValue.company_location[submitValue.company_location.length - 1];
  submitValue.region = submitValue.region[submitValue.region.length - 1];
  submitValue = {
    name: "111111",
    type: "软件开发",
    category: "研发",
    region: "120103",
    start_date: "2024-07-09",
    end_date: "2024-08-29",
    content: "123",
    cover_image:
      "https://yiliaoqixie-1253997872.cos.ap-nanjing.myqcloud.com/5783de21-d604-4815-96e7-1a1a36e791e9",
    company_name: "123",
    company_location: "120102",
    company_type: "医疗器械销售",
    contactName: "123",
    contactPhone: "123",
    createUserId: "ddc42355-d9ca-4a75-ae2b-5ea4ba344b73",
  };
  console.log("submitValue", submitValue);
  http.request<any>("post", "/api/v1/requirements", { data: submitValue });
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
