<script setup>
import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
import AISearch from "@/views/portal/home/components/AISearch.vue";
import Aside from "@/views/portal/home/components/Aside.vue";
// import Header from "@/views/portal/home/components/Header.vue";
import Recommend from "@/views/portal/home/components/Recommend.vue";
import { onMounted } from "vue";
import Header from "../a-components/less/Header.vue";
onMounted(() => {});
const recommendItems = [];
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
        <h2 class="title">推荐</h2>
        <div class="titles">
          <Recommend />
        </div>
      </div>
    </div>

    <div id="contact-offset" class="contact">
      <div class="content">
        <h2 class="title">联系/加入我们</h2>
        <div class="contact-info-container" />
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
  min-height: 100vh;
  font-size: 16px;

  .index {
    padding: (@headerHeight+100px) 0 0 0;
    // height: 100vh;
    display: flex;
    flex-direction: column;

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

    .music-player {
      width: 100%;
      height: fit-content;
    }
  }

  .about {
    width: 100%;
    background-color: white;
    padding: 0 8px 15px;

    .content {
      .m-reactive-box;
      min-height: 60vh;
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      place-content: center;
      place-items: center;

      color: @light-font-color;

      @media (max-width: 650px) {
        grid-template-columns: 1fr;
      }

      img {
        width: 60%;
        @media (max-width: 300px) {
          width: 100%;
        }
      }

      .detail {
        width: 100%;
        place-self: center;

        h2 {
          line-height: 100%;
          padding: 0.8em 0;
        }

        P {
          padding: 0;
          font-size: 1em;
          color: #666;
        }

        .more {
          display: inline-block;
          margin: 0px 0px 0;
          font-size: 1em;
          padding: 10px 18px;
          border: @light-theme-color solid 1px;
          color: inherit;

          &:hover {
            background: @light-theme-color;
            color: white;
          }
        }

        .icons {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          gap: 0.5em 1em;

          margin: 20px 0px 15px;

          .icon {
            display: flex;
            flex-direction: column;
            place-items: center;
            background: #eee;
            text-align: center;
            -webkit-box-flex: 1;
            -ms-flex: 1 1 8em;
            flex: 1 1 8em;
            padding: 5px 0;
            border-radius: 15px;

            i {
              font-size: 3rem;
              color: @light-theme-color;

              span {
                display: flex;
                place-items: center;
                place-content: center;
              }
            }

            h3 {
              text-transform: capitalize;
              color: #222;
            }
          }
        }
      }
    }
  }

  .recommend {
    width: 100%;
    background-color: #eee;
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

  .contact {
    width: 100%;
    background-color: white;
    padding: 10px 8px 10px;
    text-align: center;

    .content {
      .m-reactive-box;

      .contact-info-container {
        display: -ms-grid;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1em 2em;
        margin-bottom: 1rem;

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
  }
}
</style>
