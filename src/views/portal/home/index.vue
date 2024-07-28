<script setup>
import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
import AISearch from "@/views/portal/home/components/AISearch.vue";
import Aside from "@/views/portal/home/components/Aside.vue";
import { getHomeDisplayList } from "./api";
import Recommend from "@/views/portal/home/components/Recommend.vue";
import { ref, onMounted, onUnmounted } from "vue";
import Header from "@/views/portal/a-components/less/Header.vue";
import { useHomeStore } from "@/store/modules/home";
import { storeToRefs } from "pinia";
import arrow from "@/assets/svg/arrow.svg?component";
const homeStore = useHomeStore();
const { bean1, bean2, bean3, searchTags, activeIndex } =
  storeToRefs(useHomeStore());
onMounted(async () => {
  const reap1 = await getHomeDisplayList("供应链管理");
  bean1.value.data = reap1.data;
  console.log(bean1.value);

  const reap2 = await getHomeDisplayList("营销管理");
  bean2.value.data = reap2.data;
  console.log(bean2.value);

  const reap3 = await getHomeDisplayList("解决方案");
  bean3.value.data = reap3.data;
  console.log(bean3.value);
});

const display = ref("none");
const showOriginalNav = ref(false);
function handleScroll() {
  //window.innerHeight为屏幕高度或者 假设导航栏高度是60px，就把window.innerHeight替换成60
  const navHeight = 80;
  if (window.scrollY >= navHeight) {
    display.value = "block"; // 根据需要改变颜色
  } else {
    display.value = "none"; // 根据需要改变颜色
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll1 = () => {
  const scrollPosition = window.scrollY + 80; // Adjust offset as needed

  searchTags.value.forEach((section, index) => {
    const sectionElement = document.getElementById(section.id);
    if (sectionElement) {
      const sectionTop = sectionElement.offsetTop;
      const sectionHeight = sectionElement.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        activeIndex.value = index;
      }
    }
  });
  showOriginalNav.value = scrollPosition > 0;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll1);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll1);
});

const dialogFormVisible = ref(false);
const formLabelWidth = "80px";
const form = reactive({
  name: "",
  org: "",
  position: "",
  phone: "",
  care: "",
  request: "",
});
</script>

<template>
  <el-backtop :right="10" :bottom="10" />
  <Header :onlyShowOriginalNav="showOriginalNav" />

  <div class="full-screen">
    <div id="index" class="index">
      <div class="content">
        <div class="introduce">
          <AISearch />
          <Aside />
        </div>
      </div>
    </div>

    <div id="recommend1" class="recommend">
      <div class="content">
        <div class="titles">
          <Recommend :bean="bean1" />
        </div>
      </div>
    </div>
    <div id="recommend2" class="recommend new_bg">
      <div class="content">
        <div class="titles">
          <Recommend :bean="bean2" />
        </div>
      </div>
    </div>
    <div id="recommend2" class="recommend">
      <div class="content">
        <div class="titles">
          <Recommend :bean="bean3" />
        </div>
      </div>
    </div>

    <div id="contact" class="contact">
      <div class="content">
        <h2 class="title">数字化标杆案例</h2>
        <div class="more">
          <div class="moreBtn" @click="goTo(bean?.searchTag)">查看更多案例</div>
          <span class="green-animate-arrow"></span>
        </div>
        <div class="contact-info-container">
          <el-carousel :interval="4000000" type="card" height="300px">
            <el-carousel-item v-for="item in 6" :key="item">
              <div class="item">
                <img src="https://picsum.photos/352/260" class="img" />
                <div class="info">
                  <div class="title">
                    MES+ERP为“非标”生产提质增效，“点亮”安徽蚌埠这家企业的“暗”数据！
                  </div>
                  <div class="tags">
                    <div
                      class="span"
                      v-for="item in [
                        '#封接器生产',
                        '#生产监控',
                        '#数字化车间',
                      ]"
                    >
                      {{ item }}
                    </div>
                  </div>
                  <div class="relation">
                    相关产品：
                    <span class="product">慧尔云ERP</span>
                  </div>
                  <div class="link">
                    查看详情
                    <arrow />
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="zixun new_bg1">
      <div class="content">
        <div class="title">欢迎咨询</div>
        <div class="desc">羚羊数字化企业管家奥迪法海好看好看</div>
        <div class="link" @click="dialogFormVisible = true">
          立即咨询
          <arrow />
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="添加企业信息" width="500">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            placeholder="请输入姓名"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="公司/单位" :label-width="formLabelWidth">
          <el-input
            v-model="form.org"
            placeholder="请输入公司/单位"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input
            v-model="form.position"
            placeholder="请输入职位"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="我关注的" :label-width="formLabelWidth">
          <el-select v-model="form.care" placeholder="请选择">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="其他诉求" :label-width="formLabelWidth">
          <el-input
            v-model="form.request"
            placeholder="请输入其他诉求"
            autocomplete="off"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
    <CommonFooter id="declare-offset" />
  </div>
</template>

<style scoped lang="less">
@import "@/assets/main.less";

.item {
  width: 100%;
  background-color: white;
}

.full-screen {
  .m-bg;
  width: 100%;
  // min-height: 100vh;
  font-size: 16px;

  .index {
    padding: (@headerHeight+50px) 0 0 0;
    height: 700px;
    display: flex;
    flex-direction: column;
    background: url("@/assets/img/bg.png") no-repeat center top;
    margin-bottom: 200px;

    .content {
      .m-reactive-box;
      color: @dark-font-color;
      flex: 1;
      display: flex;
      flex-direction: column;
      place-items: center center;

      .introduce {
        width: calc(100% - 20px);
        display: flex;

        flex-direction: column;
        place-items: center center;
        place-content: center;

        img {
          width: 600px;
          max-width: 100%;
          max-height: 240px;
        }
      }

      .links {
        font-size: 1.2em;
        padding: 20px 0;

        display: flex;
        gap: 0 12px;
        place-items: center;
        flex-wrap: wrap;

        a {
          .m-a-1();
          color: @light-link-color;
        }
      }
    }
  }

  .recommend {
    width: 100%;
    background-color: #fafbfc;
    padding: 10px 24px 20px;

    .content {
      .m-reactive-box;

      .title {
        letter-spacing: 0.3em;
        text-align: center;
      }

      .titles {
        gap: 2rem;

        @media (max-width: 1300px) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          grid-template-columns: repeat(2, 1fr);
          gap: 1em 1em;
        }
        @media (max-width: 500px) {
          grid-template-columns: 1fr;
        }
      }
    }
  }
  .zixun {
    height: 284px;

    width: 100%;
    background-color: #fafbfc;
    padding: 10px 24px 20px;

    .content {
      .m-reactive-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        margin-top: 50px;
        text-align: center;
        width: auto;
        color: #333;
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .desc {
        color: #333;
        font-size: 16px;
        margin-bottom: 20px;
        text-align: center;
        line-height: 28px;
      }
      .link {
        height: 40px;
        margin-top: 10px;
        line-height: 40px;
        color: #fff;
        text-align: left;
        font-weight: 600;
        font-size: 14px;
        padding-left: 15px;
        width: 200px;
        background-color: #13ae68;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 15px;
      }
    }
  }
  .new_bg {
    background: url(@/assets/img/recomm_bg.jpg) no-repeat center top;
    background-position: center top;
  }
  .new_bg1 {
    background: url(@/assets/img/zixun.jpeg) no-repeat center top;
    background-color: #f4fcfc;
    background-size: auto 284px;
  }

  .contact {
    width: 100%;
    background-color: white;
    padding: 10px 8px 10px;
    text-align: center;
    background: url(@/assets/img/more_bg.jpg) no-repeat center top;
    padding: 80px 0;
    // background-size: auto 616px;
    .content {
      .m-reactive-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .more {
        width: 150px;
        cursor: pointer;
        align-items: center;
        display: flex;
        .moreBtn {
          font-weight: 600;
          color: #fff;
        }
        .green-animate-arrow {
          display: inline-block;
          margin-left: 10px;
          right: 0;
          width: 16px;
          height: 16px;
          transition: all ease-in-out 0.3s;
          border-radius: 8px;
          background-color: #fff;
          background-image: url(@/assets/svg/arrow-left-green.svg);
          background-repeat: no-repeat;
          background-position: center;
          vertical-align: middle;
        }
      }
      .more:hover {
        .moreBtn {
          font-weight: 800;
        }
        .green-animate-arrow {
          width: 32px;
        }
      }
      .contact-info-container {
        width: 100%;
        padding-bottom: 50px;
        background: url(@/assets/img/more_bg.jpg) no-repeat center top;
        background-size: auto 616px;

        .item {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-direction: row;
          height: 100%;
          .img {
            width: 352px;
            height: 260px;
            background-color: #333;
            margin: 0 20px;
            border-radius: 10px;
          }
          .info {
            display: flex;
            flex-direction: column;
            width: 50%;
            height: 80%;
            margin: 0 20px 0 0;

            .title {
              font-size: 16px;
              font-weight: 600;
              text-align: left;
              width: 100%;
              color: #333;
            }
            .tags {
              font-size: 12px;
              font-weight: 400;
              width: 100%;
              color: #333;
              display: flex;
              margin-top: 10px;
              .span {
                margin-right: 10px;
                width: fit-content;
                background-color: #f7f8fa;
                border-radius: 8px;
                padding: 3px 5px;
              }
            }
            .relation {
              font-size: 14px;
              width: 100%;
              text-align: left;
              margin-top: 28%;
              color: #475669;
              .product {
                color: #13ae68;
                margin-left: 10px;
              }
            }
            .link {
              height: 40px;
              margin-top: 10px;
              line-height: 40px;
              color: #fff;
              text-align: left;
              font-weight: 600;
              font-size: 14px;
              padding-left: 15px;
              width: 60%;
              background-color: #13ae68;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-right: 15px;
            }
          }
        }
        @media (max-width: 1000px) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 600px) {
          grid-template-columns: repeat(2, 1fr);
          gap: 1em 1em;
        }
        @media (max-width: 340px) {
          grid-template-columns: 1fr;
        }
      }

      iframe {
        width: 100%;
        max-height: 50vh;
      }
    }
    .title {
      color: #fff;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
