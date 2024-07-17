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
      submit-text="发布"
      class="flex-grow"
      :has-reset="false"
    >
      <template #plus-field-product_image>
        <el-upload
          action="/api/v1/uploadfile"
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="state.product_image"
            :src="state.product_image"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </template>
      <template #plus-field-product_images>
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          list-type="picture-card"
          action="/api/v1/uploadfile"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          multiple
        >
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
          <template #tip>
            <div class="el-upload__tip">
              1. 上传证明材料有利于提高产品的可信度；<br />
              2. 支持 jpg、png 格式，每张图片大小在 30M 以内；<br />
              3. 最多上传 10 张图片。
            </div>
          </template>
        </el-upload>
      </template>
      <template #plus-field-product_scene>
        <EditorBase v-model="state.product_scene" />
      </template>
      <template #footer="{ handleSubmit }">
        <div
          class="footer"
          style="width: 100%; display: flex; justify-content: center"
        >
          <el-button type="primary" style="width: 200px" @click="handleSubmit"
            >发布产品信息</el-button
          >
        </div>
      </template>
    </PlusForm>
    <el-card style="width: 600px">
      <div class="flex justify-between">
        <div class="text-xl font-semibold">智能匹配客户</div>
        <div class="text-lg">更多>></div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {
  productCategory,
  productStatusList,
  productTypeList,
} from "@/utils/typeList";
import { Plus } from "@element-plus/icons-vue";
import { cloneDeep } from "@pureadmin/utils";
import type { UploadUserFile } from "element-plus";
import { type FormInstance } from "element-plus";
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
  product_category: "",
  product_type: "",
  product_image: "",
  product_images: [],
  product_name: "",
  price: 0,
  discount_price: 0,
  product_description: "",
  product_spec: "",
  sku: "",
  validity_period: "",
  product_status: "在售",
  delivery_method: "不限",
  payment_method: "不限",
  sale_region: "不限制区域",
  service_phone: "",
  creator_id: JSON.parse(localStorage.getItem("userInfo")).id,
  org_id: "",
  product_value: "default",
  product_scene: "",
});

const handleAvatarSuccess = (resp) => {
  state.value.product_image = resp.fileUrl;
};

const rules = {
  product_category: [{ required: true, message: "请输入产品类别" }],
  product_type: [{ required: true, message: "请输入产品类型" }],
  product_image: [{ required: true, message: "请上传产品图片" }],
  product_name: [{ required: true, message: "请输入产品名称" }],
  price: [{ required: true, message: "请输入产品价格" }],
  product_description: [{ required: true, message: "请输入产品描述" }],
  product_spec: [{ required: true, message: "请输入产品规格" }],
  sku: [{ required: true, message: "请输入库存单位" }],
  validity_period: [{ required: true, message: "请输入有效期" }],
  product_status: [{ required: true, message: "请选择产品状态" }],
  delivery_method: [{ required: true, message: "请输入交付方式" }],
  payment_method: [{ required: true, message: "请输入支付方式" }],
  sale_region: [{ required: true, message: "请输入销售区域" }],
  service_phone: [{ required: true, message: "请输入服务电话" }],
  product_value: [{ required: true, message: "请输入产品价值" }],
  product_scene: [{ required: true, message: "请输入应用场景" }],
};

const handlePreview = (file: UploadUserFile) => {
  console.log(fileList.value);
  console.log(file);
};

const handleSuccess = (resp) => {
  state.value.product_images.push(resp.fileUrl);
  console.log(state.value.product_images);
};

const group: PlusFormGroupRow[] = [
  {
    title: "产品信息",
    icon: Plus,
    columns: [
      { label: "产品首图", prop: "product_image" },
      { label: "轮播图片", prop: "product_images" },
      { label: "产品名称", prop: "product_name", valueType: "input" },
      { label: "产品描述", prop: "product_description", valueType: "textarea" },
      {
        label: "产品类别",
        prop: "product_category",
        valueType: "select",
        options: productCategory,
      },
      {
        label: "产品类型",
        prop: "product_type",
        valueType: "select",
        options: productTypeList,
      },
      {
        label: "产品价格",
        prop: "price",
        valueType: "input-number",
        fieldProps: { precision: 2, step: 2 },
      },
      {
        label: "折扣价格",
        prop: "discount_price",
        valueType: "input-number",
        fieldProps: { precision: 2, step: 2 },
      },

      { label: "产品规格", prop: "product_spec", valueType: "input" },
      { label: "库存单位", prop: "sku", valueType: "input" },
      { label: "有效期", prop: "validity_period", valueType: "input" },
      {
        label: "产品状态",
        prop: "product_status",
        valueType: "select",
        options: productStatusList,
      },
      // { label: "交付方式", prop: "delivery_method", valueType: "input" },
      // { label: "支付方式", prop: "payment_method", valueType: "input" },
      // {
      //   label: "销售区域",
      //   prop: "sale_region",
      //   valueType: "cascader",
      //   options: city,
      // },
      { label: "服务电话", prop: "service_phone", valueType: "input" },

      // { label: "产品价值", prop: "product_value", valueType: "input" },
      { label: "产品详情", prop: "product_scene" },
    ],
  },
];

const handleSubmit = async (values: FieldValues) => {
  let submitValue = cloneDeep(values);
  console.log("submitValue", submitValue);
  // const resp = await http.request<any>("post", "/api/v1/products", {
  //   data: submitValue,
  // });
  // if (resp.id) {
  //   router.push("/products/manage");
  // } else {
  //   ElMessage.error("提交失败，请重试");
  // }
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
