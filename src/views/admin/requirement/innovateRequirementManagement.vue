<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import PureTable from "@pureadmin/table";
import { ref } from "vue";
import { useRouter } from "vue-router";
const searchField = ref("");
const router = useRouter();
defineOptions({
  name: "403",
});

const createRequirement = () => {
  router.push("/requirement/createInnovateRequirement");
};
const columns = [
  {
    label: "需求名称",
    prop: "name.data.call.name",
    align: "center",
  },
  {
    label: "需求类型",
    prop: "name.data.name",
    align: "center",
  },
  {
    label: "需求区域",
    slot: "date",
    align: "center",
  },
  {
    label: "需求时间范围",
    slot: "duration",
    align: "center",
  },
  {
    label: "需求内容",
    slot: "duration",
    align: "center",
  },
  {
    label: "需求状态",
    slot: "duration",
    align: "center",
  },
  {
    label: "操作",
    slot: "duration",
    align: "center",
  },
];
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form class="flex gap-5">
            <el-form-item label="需求名称" class="flex-grow">
              <el-input
                label="需求名称"
                clearable
                v-model="searchField"
              ></el-input>
            </el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form>
        </el-card>
        <el-card class="box-card my-5">
          <el-button type="primary" :icon="Plus" @click="createRequirement"
            >发布创新需求</el-button
          >
          <PureTable
            adaptive
            stripe
            row-key="id"
            class="my-5 box-table"
            alignWhole="center"
            showOverflowTooltip
            :columns="columns"
          ></PureTable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
