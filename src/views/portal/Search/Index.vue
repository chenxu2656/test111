<script setup lang="ts">
import { useHomeStore } from "@/store/modules/home";
import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
import Header from "@/views/portal/a-components/less/Header.vue";
import SearchItem from "@/views/portal/a-components/less/SearchItem.vue";
import { Search } from "@element-plus/icons-vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { getSearchList, getSearchListByKeyword } from "./api";

const homeStore = useHomeStore();
const radioCategory = ref<string>("");
const radioPrice = ref<string>("");
const searchInput = ref<string>("");
const items = ref<string[]>([
  "初始内容1",
  "初始内容2",
  "初始内容3",
  "初始内容4",
]);

// Function to fetch search results
const fetchSearchResults = async (searchParam: string, skip: number) => {
  try {
    const response = await getSearchList(searchParam, skip);

    searchList.value = response.data;
    pagination.value = {
      ...pagination.value,
      total: response.length,
    };
    setTimeout(() => {
      dataLoading.value = false;
    }, 500);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};
const fetchSearchResultsByKeyword = async (
  searchParam: string,
  skip: number,
) => {
  try {
    const response = await getSearchListByKeyword(searchParam, skip);

    searchList.value = response.data;
    pagination.value = {
      ...pagination.value,
      total: response.length,
    };
    setTimeout(() => {
      dataLoading.value = false;
    }, 500);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

// Update items dynamically every 5 seconds
const updateItems = () => {
  items.value = [
    "更新后的内容1",
    "更新后的内容2",
    "更新后的内容3",
    "更新后的内容4",
  ];
};

const searchList = ref([]);
const dataLoading = ref(true);
const pagination = ref({ current: 1, pageSize: 12, total: 0 });

onMounted(async () => {
  if (homeStore.clickedTag) {
    searchInput.value = homeStore.clickedTag;
    searchList.value = await fetchSearchResults(
      homeStore.clickedTag,
      pagination.value.current,
    );
  } else {
    searchList.value = await fetchSearchResults("", pagination.value.current); // Default search
  }

  setInterval(() => {
    updateItems();
  }, 5000);
});

onUnmounted(() => {
  homeStore.resetClickedTag();
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

const handleSearch = async () => {
  searchList.value = await fetchSearchResultsByKeyword(searchInput.value, 1);
};

watch(radioCategory, async (newValue) => {
  searchList.value = await fetchSearchResults(newValue, 0);
});

const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.current = 1;
};
const onCurrentChange = (current: number) => {
  pagination.value.current = current;
  fetchSearchResults(homeStore.clickedTag, current);
};
</script>
<template>
  <el-backtop :right="10" :bottom="10" />
  <Header :onlyShowOriginalNav="false" />
  <div id="index" class="index">
    <div class="content">
      <div class="introduce">
        <el-input
          class="search_input"
          v-model="searchInput"
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button :icon="Search" @click="handleSearch" />
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
          <el-radio-group v-model="radioCategory" size="large" @change="">
            <el-radio-button label="全部" value="" />
            <el-radio-button label="供应链管理" value="供应链管理" />
            <el-radio-button label="解决方案" value="解决方案" />
            <el-radio-button label="经营管理" value="经营管理" />
            <el-radio-button label="商务服务" value="商务服务" />
            <el-radio-button label="生产制造" value="生产制造" />
            <el-radio-button label="营销管理" value="营销管理" />
          </el-radio-group>
        </div>
      </div>
      <div class="category">
        <div class="filter_name">价格范围</div>
        <div class="filter_options">
          <el-radio-group v-model="radioPrice" size="large" @change="">
            <el-radio-button label="全部" value="" />
            <el-radio-button label="免费" value="免费" />
            <el-radio-button label="0-2000" value="0-2000" />
            <el-radio-button label="2000-5000" value="2000-5000" />
            <el-radio-button label="5000-7000" value="5000-7000" />
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
    <div class="search_result" v-loading="dataLoading">
      <SearchItem v-for="(item, index) in searchList" :data="item" />
    </div>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="pagination.current"
        class="float-right"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onPageSizeChange"
        @current-change="onCurrentChange"
      />
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
