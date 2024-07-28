<script setup>
import { Search, CaretRight, Location, Right } from "@element-plus/icons-vue";
import { getAddressByCode } from "@/utils/address";
import { useSupplyStoreHook } from "@/store/modules/supply";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const keyWord = ref("");
var currentPage = ref(1);
var total = computed(() => {
  return useSupplyStoreHook().supplyLength;
});
var supplyInfos = computed(() => {
  return useSupplyStoreHook().supplyList;
});
const handleCurrentChange = () => {
  useSupplyStoreHook().current_page = currentPage.value;
  useSupplyStoreHook().searchSupply2();
};
onMounted(() => {
  handleCurrentChange();
});
const searchKeyword = () => {
  useSupplyStoreHook().keyWord = keyWord.value;
  useSupplyStoreHook().searchSupply();
};
const goToDetail = (id) => {
  useSupplyStoreHook().supplyId = id;
  router.push("/supply_detail");
};
const goToLogin = () => {
  router.push("/login");
};
</script>
<template>
  <div>
    <div class="picture">
      <div class="search">
        <h2>需求大厅</h2>
        <el-input
          v-model="keyWord"
          placeholder="请输入关键词"
          class="input-with-select"
        >
          <template #append>
            <el-button :icon="Search" @click="searchKeyword"></el-button>
          </template>
        </el-input>
        <el-button type="success" @click="goToLogin" class="offerBt"
          >需求发布 <el-icon :size="20"><CaretRight /></el-icon
        ></el-button>
      </div>
    </div>
    <div class="allCard">
      <el-card
        class="myCard"
        v-for="(supplyInfo, index) in supplyInfos"
        shadow="none"
        :key="index"
        @click="goToDetail(supplyInfo.id)"
      >
        <el-row>
          <el-col :span="22"
            ><div class="titleName">{{ supplyInfo.name }}</div></el-col
          >
          <el-col :span="2"
            ><el-icon class="myIcon"> <Right /> </el-icon
          ></el-col>
        </el-row>

        <el-text line-clamp="2" class="cardText">
          {{ supplyInfo.content }}
        </el-text>

        <el-row class="bottomD">
          <el-col :span="11">
            <el-tag type="info"
              ><span class="tagText">{{ supplyInfo.type }}</span></el-tag
            ></el-col
          >
          <el-col :span="13">
            <el-text
              ><el-icon> <Location /> </el-icon
              >{{ getAddressByCode(supplyInfo.region) }}</el-text
            >
            <span class="bottomDate">{{ supplyInfo.start_date }}</span></el-col
          >
        </el-row>
      </el-card>
    </div>
    <el-pagination
    class="pageSet"
      v-model:current-page="currentPage"
      default-page-size
      :disabled="disabled"
      layout="prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<style scoped lang="less">
@big:calc ((1rem + 1vw)*0.7);
@middle:calc ((1rem + 1vw)*0.5);
@small:calc ((1rem + 1vw)*0.4);
.picture {
  background-image: url("https://preprod.lingyangplat.com/antelope-static-resource/website/images/second-page-banners/banner-demand-EDF2FA.jpg");
  background-size: 100% 100%;
  width: 60vw;
  height: 40vh;
}
.picture h2 {
  font-size: calc(1rem + 1vw);
  padding-top: 10vh;
  padding-bottom: 8vh;
}
.search {
  margin-left: 5vw;
}
.pageSet {
  margin: 5vh 0 5vh 25vw;
  font-size: @middle;
}
.input-with-select {
  max-width: 30vw;
  height: 6vh;
  font-size: @middle;
}
.offerBt {
  margin-left: 3vw;
  height: 6vh;
  font-size: @middle;
}
.titleName {
  font-size: @big;
  font-weight: 600;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.myIcon {
  font-size: @big;
  font-weight: 600;
  margin-top: 1vh;
}
.tagText {
  font-size: @middle;
}
.allCard {
  width: 60vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.myCard {
  width: 25vw;
  margin-left: 5vw;
  margin-top: 4vh;
  height: 26vh;
  cursor: pointer;
  border-width: 0.5px;
  --el-card-padding: 15px;
}
.myCard .el-text {
  padding-top: 0vh;
}
.myCard span {
  color: black;
}
.myCard:hover {
  color: rgb(103, 194, 58);
  border-color: rgb(103, 194, 58);
}
.cardText {
  font-size: @middle;
  margin-top: 1vh;
  min-height: 8vh;
  line-height: 4vh;
}
.bottomD {
  margin-top: 1vh;
}

.bottomD .el-text {
  font-size: @small;
  line-height: 4vh;
  vertical-align: middle;
}
.bottomDate {
  margin-left: 1vw;
  font-size: @small;
  line-height: 4vh;
  vertical-align: middle;
}
.pageSet{
  margin: 5vh 0 5vh 25vw;
  font-size:@middle;
}

</style>
