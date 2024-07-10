<template>
  <div class="flex gap-8">
    <PlusForm
      v-model="state"
      :group="group"
      :rules="rules"
      @change="handleChange"
      style="width: 1000px"
      label-width="100px"
      label-position="right"
      @submit="handleSubmit"
      @submit-error="handleSubmitError"
      @reset="handleReset"
    >
      <template #plus-field-images>
        <el-upload  action="/api/v1/uploadfile" class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="state.cover_image" :src="state.cover_image" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </template>
      <template #plus-field-type>
        <div v-for="item in companyType" style="width: 100%">
          <div style="font-weight: 600">{{ item.value }}</div>
          <div style="display: flex; flex-wrap: wrap">
           <el-radio-group v-model="state.type" @change="() => state.category = item.value">
            <el-radio
              v-for="items in item.children"
              :key="items.value"
              :label="items.value"
              style="width: 20%"
            />
            </el-radio-group>
          </div>
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
import { CreditCard, Plus } from "@element-plus/icons-vue";
import {
  PlusForm,
  type FieldValues,
  type PlusColumn,
  type PlusFormGroupRow,
} from "plus-pro-components";
import "plus-pro-components/es/components/form/style/css";
import { ref } from "vue";
const imageUrl = ref("");
const state = ref({
  name: "", // 需求名称
  type: "", // 需求类型
  category: "", // 需求分类
  region: "", //需求地区
  timeSpace: '', // 需求时间
  start_date: "", // 开始时间
  end_date: "", // 结束时间
  content: "", // 需求内容
  cover_image: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
  company_name: "", // 公司名字
  company_location: "", // 公司location
  company_type: "", // 公司类型
  contactName: "", // 联系人名字
  contactPhone: "", // 联系人电话
  createUserId: ""

});
const handleAvatarSuccess = (resp) => {
  state.value.cover_image = resp.fileUrl
  
}
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
        valueType: 'select',
        options: companyhangye
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
      }
    ],
  },
];

const handleChange = (values: FieldValues, prop: PlusColumn) => {
  console.log(values, prop, "change");
};
const handleSubmit = (values: FieldValues) => {
  console.log(values, "Submit");
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
