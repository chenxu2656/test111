<script setup lang="ts">
import { useHomeStore } from "@/store/modules/home";
import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
import Header from "@/views/portal/a-components/less/Header.vue";
import SearchItem from "@/views/portal/a-components/less/SearchItem.vue";
import { Search } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

const homeStore = useHomeStore();
const radio1 = ref<string>(""); // 假设初始值为空字符串
const items = ref<string[]>([
  "初始内容1",
  "初始内容2",
  "初始内容3",
  "初始内容4",
]);

// 模拟动态更新内容
const updateItems = () => {
  items.value = [
    "更新后的内容1",
    "更新后的内容2",
    "更新后的内容3",
    "更新后的内容4",
  ];
};

// 模拟每段时间（例如每5秒）更新一次内容
onMounted(() => {
  setInterval(() => {
    updateItems();
  }, 5000);
});

const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);

const handleInputChange = () => {
  if (
    minPrice.value !== null &&
    maxPrice.value !== null &&
    minPrice.value > maxPrice.value
  ) {
    alert("Minimum price should not be greater than maximum price");
  }
};
</script>

<template>
  <el-backtop :right="10" :bottom="10" />
  <Header />
  <div id="index" class="index">
    <div class="content">
      <div class="introduce">
        <el-input class="search_input">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <div class="guess_you_like_box">
          <div class="guess_you_like">
            <div class="text">
              <img class="img" src="@/assets/img/fire.png" alt="" />
              热门搜索
            </div>
            <div class="guess_you_like_list">
              <div
                class="like_item"
                v-for="(item, index) in items"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="search_result_box">
    <div class="filter_box">
      <div class="category">
        <div class="filter_name">商品分类</div>
        <div class="filter_options">
          <el-radio-group v-model="radio1" size="large">
            <el-radio-button label="全部" value="1" />
            <el-radio-button label="供应链管理" value="New York" />
            <el-radio-button label="供应链管理" value="Washington" />
            <el-radio-button label="供应链管理" value="Los Angeles" />
            <el-radio-button label="供应链管理" value="Chicago" />
          </el-radio-group>
        </div>
      </div>
      <div class="category">
        <div class="filter_name">价格范围</div>
        <div class="filter_options">
          <el-radio-group v-model="radio1" size="large">
            <el-radio-button label="全部" value="1" />
            <el-radio-button label="免费" value="New York" />
            <el-radio-button label="0-2000" value="Washington" />
            <el-radio-button label="2000-5000" value="Los Angeles" />
            <el-radio-button label="5000-7000" value="Chicago" />
          </el-radio-group>
          <el-input
            v-model="minPrice"
            placeholder=""
            @change="handleInputChange"
            style="width: 100px; margin-right: 10px"
            :formatter="
              (value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          />
          -
          <el-input
            v-model="maxPrice"
            placeholder=""
            @change="handleInputChange"
            style="width: 100px; margin-left: 10px"
            :formatter="
              (value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          />
        </div>
      </div>
    </div>
    <div class="search_result">
      <SearchItem></SearchItem>
      <SearchItem></SearchItem>
      <SearchItem></SearchItem>
      <SearchItem></SearchItem>

      <SearchItem></SearchItem>
      <SearchItem></SearchItem>
      <SearchItem></SearchItem>
      <SearchItem></SearchItem>
      <SearchItem></SearchItem>
      <SearchItem></SearchItem>

      <SearchItem></SearchItem>
      <SearchItem></SearchItem>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
  </div>
  <CommonFooter id="declare-offset" />
</template>

<style lang="less" scoped>
@import "@/assets/main.less";
.index {
  margin: (@headerHeight+20px) 0 0 0;
  background: url(https://oss-hefei-a2a.openstorage.cn/icon-library/202404221957553360.png)
    no-repeat center top;
  background-color: #f2f7fc;
  background-size: auto 396px;
  width: 100%;
  min-height: 396px;
  display: flex;
  flex-direction: column;

  .content {
    .m-reactive-box;
    color: @dark-font-color;
    flex: 1;
    display: flex;
    flex-direction: column;
    place-items: center center;
    height: 100%;
    .introduce {
      width: calc(100% - 20px);
      height: 100%;

      :deep(.search_input) {
        top: 160px;
        height: 50px;
        width: 50%;
        .el-input__wrapper {
          box-shadow: none !important;
        }
        .el-input-group__append {
          background-color: #fff;
          box-shadow: none !important;
          .el-icon {
            font-size: 20px;
            font-weight: 600;
          }
        }
      }
      .guess_you_like_box {
        width: 100%;
        padding-left: 20px;
        padding-top: 15px;
        font-size: 12px;
        color: rgb(86 93 102);

        position: relative;
        top: 160px;
        height: 50px;

        .guess_you_like {
          display: flex;

          .text {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            .img {
              height: 14px;
              width: 14px;
            }
          }

          .guess_you_like_list {
            width: 80%;
            display: flex;

            .like_item {
              margin: 0 12px;
              padding: 0 5px;
              background-color: #fff;
              border-radius: 10px;
              height: 30px;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
}
.search_result_box {
  padding-left: 20px;
  padding-top: 15px;
  font-size: 12px;
  color: rgb(86 93 102);
  position: relative;
  top: -100px;
  min-height: 200px;
  .m-reactive-box;
  .filter_box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(15, 42, 77, 0.04);
    padding: 10px;
    min-height: 120px;
    :deep(.el-radio-group) {
      height: 40px;
      margin-left: 15px;
      .el-radio-button__inner {
        border: none !important;
        color: #333;
        font-weight: 600;
      }
      .el-radio-button__inner:hover {
        color: #19b96f !important;
      }
      .el-radio-button__original-radio:checked + .el-radio-button__inner {
        --el-radio-button-checked-bg-color: #e9f7f2 !important;
        box-shadow: -1px 0 0 0 #e9f7f2 !important;
        color: #19b96f;

        :hover {
          color: #19b96f !important;
        }
      }
    }
    .category {
      display: inline-flex;
      margin-bottom: 10px;
      .filter_name {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
      .filter_options {
        display: flex;
        align-items: center;
        .el-input {
          margin-left: 15px;
          height: 30px;
        }
      }
    }
  }

  .search_result {
    min-height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .pagination {
    width: 100%;
    text-align: right;
    :deep(.el-pagination) {
      justify-content: flex-end !important;
      margin: 20px;
    }
  }
}
</style>
