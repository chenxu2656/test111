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
        <el-upload class="avatar-uploader" :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </template>
      <template #plus-field-type>
        <div v-for="item in companyType" style="width: 100%">
          <div style="font-weight: 600">{{ item.value }}</div>
          <div style="display: flex; flex-wrap: wrap">
            <el-checkbox
              v-for="items in item.children"
              :label="items.value"
              style="width: 20%"
            />
          </div>
        </div>
      </template>
    </PlusForm>
    <el-card class="flex-grow">您可能关注的解决方案 </el-card>
  </div>
</template>

<script lang="ts" setup>
import city from '@/utils/city'
import companyType from '@/utils/companyType'
import { CreditCard, Plus } from '@element-plus/icons-vue'
import {
  PlusForm,
  type FieldValues,
  type PlusColumn,
  type PlusFormGroupRow
} from 'plus-pro-components'
import 'plus-pro-components/es/components/form/style/css'
import { ref } from 'vue'
const imageUrl = ref('')
const state = ref({
  status: '0',
  name: '',
  rate: 4,
  progress: 100,
  switch: true,
  time: new Date().toString(),
  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
})

const rules = {
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ],
  tag: [
    {
      required: true,
      message: '请输入标签'
    }
  ]
}

const group: PlusFormGroupRow[] = [
  {
    title: '需求信息',
    icon: CreditCard,
    columns: [
      {
        label: '需求名称',
        width: '900px',
        prop: 'name',
        valueType: 'copy'
      },
      {
        label: '需求类型',
        prop: 'type'
      },
      {
        label: '需求城市',
        prop: 'city',
        valueType: 'cascader',
        options: city
      },
      {
        label: '需求时间范围',
        prop: 'endTime',
        valueType: 'date-picker',
        fieldProps: {
          type: 'datetimerange',
          startPlaceholder: '请选择开始时间',
          endPlaceholder: '请选择结束时间'
        }
      },
      {
        label: '需求内容',
        prop: 'content',
        valueType: 'textarea',
        fieldProps: {
          maxlength: 10,
          showWordLimit: true,
          autosize: { minRows: 2, maxRows: 4 }
        }
      },
      {
        label: '封面图',
        prop: 'images'
      }
    ]
  },
  {
    title: '企业基础信息',
    icon: CreditCard,
    columns: [
      {
        label: '企业名称',
        width: 220,
        prop: 'company_name',
        valueType: 'copy'
      },
      {
        label: '企业所在地',
        prop: 'company_location',
        valueType: 'cascader',
        options: city
      },
      {
        label: '所属行业',
        prop: 'company_type'
      }
    ]
  },
  {
    title: '联系人信息',
    icon: CreditCard,
    columns: [
      {
        label: '姓名',
        width: 220,
        prop: 'contactName',
        valueType: 'input'
      },
      {
        label: '联系电话',
        prop: 'contactPhone',
        valueType: 'input'
      },
      {
        label: '联系邮箱',
        prop: 'contactEmail'
      }
    ]
  }
]

const handleChange = (values: FieldValues, prop: PlusColumn) => {
  console.log(values, prop, 'change')
}
const handleSubmit = (values: FieldValues) => {
  console.log(values, 'Submit')
}
const handleSubmitError = (err: any) => {
  console.log(err, 'err')
}
const handleReset = () => {
  console.log('handleReset')
}
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
