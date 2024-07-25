<script setup>
import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
import AISearch from "@/views/portal/home/components/AISearch.vue";
import Aside from "@/views/portal/home/components/Aside.vue";
import { getHomeDisplayList } from "./api";
import Recommend from "@/views/portal/home/components/Recommend.vue";
import { onMounted, ref } from "vue";
import Header from "@/views/portal/a-components/less/Header.vue";

const bean1 = ref({
  title: "MAAS新应用，玩转AI新技术",
  subTitle: "能交给AI工具的，就别自己埋头苦干！",
  searchTag: "供应链管理",
  data: [],
});

const bean2 = ref({
  title: "羚羊精选，1.5折起！",
  subTitle: "软件/硬件/服务，满足企业数字化多样需求",
  searchTag: "营销管理",
  data: [],
});

const bean3 = ref({
  title: "软件服务包，数字化0元购",
  subTitle: "政府买单，帮助中小企业轻松开启数字化",
  searchTag: "解决方案",
  data: [],
});

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
</script>

<template>
  <el-backtop :right="10" :bottom="10" />
  <Header />
  <div class="full-screen">
    <div id="index" class="index">
      <div class="content">
        <div class="introduce">
          <AISearch />
          <Aside />
        </div>
      </div>
    </div>

    <div id="recommend-offset" class="recommend">
      <div class="content">
        <div class="titles">
          <Recommend :bean="bean1" />
        </div>
      </div>
    </div>
    <div id="recommend-offset" class="recommend new_bg">
      <div class="content">
        <div class="titles">
          <Recommend :bean="bean2" />
        </div>
      </div>
    </div>
    <div id="recommend-offset" class="recommend">
      <div class="content">
        <div class="titles">
          <Recommend :bean="bean3" />
        </div>
      </div>
    </div>

    <div id="contact-offset" class="contact">
      <div class="content">
        <h2 class="title">数字化标杆案例</h2>
        <div class="contact-info-container">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <img src="https://picsum.photos/1000/300" alt="" srcset="" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

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
  .new_bg {
    background: url(@/assets/img/recomm_bg.jpg) no-repeat center top;
  }

  .contact {
    width: 100%;
    background-color: white;
    padding: 10px 8px 10px;
    text-align: center;
    background: url(@/assets/img/more_bg.jpg) no-repeat center top;
    // background-size: auto 616px;
    .content {
      .m-reactive-box;

      .contact-info-container {
        width: 100%;
        padding-bottom: 50px;
        background: url(@/assets/img/more_bg.jpg) no-repeat center top;
        background-size: auto 616px;
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
