<script setup>
import Divider from "@/views/portal/a-components/less/Divider.vue";
import { ref } from "vue";

let footerLinks = ref({
  tips: [
    {
      showName: "法律声明及隐私权政策",
      path: "#contact",
      type: "RouterLink",
      target: "_blank",
    },
    {
      showName: "Cookies政策",
      path: "#contact",
      type: "RouterLink",
      target: "_blank",
    },
    {
      showName: "举报",
      path: "#contact",
      type: "RouterLink",
      target: "_blank",
    },
    {
      showName: "联系/加入我们",
      path: "#contact",
      type: "RouterLink",
      target: "_blank",
    },
  ],
  friendship: [
    {
      showName: "vue.js",
      path: "https://cn.vuejs.org/",
      type: "a",
      target: "_blank",
    },
    {
      showName: "vant",
      path: "https://vant-contrib.gitee.io/vant/#/zh-CN",
      type: "a",
      target: "_blank",
    },
    {
      showName: "element",
      path: "https://element-plus.org/zh-CN/",
      type: "a",
      target: "_blank",
    },
  ],
  copyright: [
    {
      showName: "© 2023-2030 ainowr.com 版权所有 (made by ainow)",
      type: "div",
    },
    // {showName: '经营许可证:浙B2-xxx-x', path: '#', type: 'a',},
    { showName: "经营许可证:申请中", path: "#", type: "RouterLink" },
  ],
  pnsp: [
    // {showName: '备案中', path: '#', type: 'RouterLink',},
    {
      showName: "桂公网安备45032302000124号",
      path: "https://beian.mps.gov.cn/#/query/webSearch",
      type: "a",
      target: "_blank",
    },
    {
      showName: "蜀ICP备2024060727号",
      path: "http://beian.miit.gov.cn/",
      type: "a",
      target: "_blank",
    },
    // {showName: '浙B2-xxx-x', path: '#', type: 'a',},
  ],
});

function getLinkProps(item) {
  let props = {};
  props.target = item.target || "_self";
  if (item.type === "RouterLink") {
    props.to = item.path;
  } else if (item.type === "a") {
    props.href = item.path;
  } else if (item.type === "img") {
    props.src = item.path;
  }
  if (item.target === "_blank") {
    props.rel = item.rel || "noopener";
  }
  return props;
}
</script>

<template>
  <!-- common-footer -->
  <div class="footer">
    <div class="content">
      <Divider />
      <div class="first">
        <div class="codes">
          <div class="code">
            <el-icon size="100" fill="#6c7778">
              <component
                theme="outline"
                fill="#333"
                :is="'icon-' + 'two-dimensional-code-two'"
              />
            </el-icon>
            <p>扫一扫，关注公众号</p>
          </div>
        </div>
      </div>
      <div class="tips">
        <h5>本站相关:</h5>
        <component
          v-for="(item, index) in footerLinks.tips"
          :key="index"
          :is="item.type"
          v-bind="getLinkProps(item)"
        >
          {{ item.showName }}
        </component>
      </div>

      <div class="friendshipLinks">
        <h5>友情链接:</h5>
        <component
          v-for="(item, index) in footerLinks.friendship"
          :key="index"
          :is="item.type"
          v-bind="getLinkProps(item)"
        >
          {{ item.showName }}
        </component>
      </div>
      <div class="copyright">
        <h5>版权所有:</h5>
        <component
          v-for="(item, index) in footerLinks.copyright"
          :key="index"
          :is="item.type"
          v-bind="getLinkProps(item)"
        >
          {{ item.showName }}
        </component>
      </div>
      <div class="pnsp">
        <h5>备案相关:</h5>
        <a href="http://beian.mps.gov.cn" target="_blank">
          <img src="@/assets/img/logo-pnsp.png" />
        </a>
        <component
          v-for="(item, index) in footerLinks.pnsp"
          :key="index"
          :is="item.type"
          v-bind="getLinkProps(item)"
        >
          {{ item.showName }}
        </component>
      </div>
      <div>
        建议您使用Edge、Chrome 80+、FireFox
        86+、360极速模式等主流浏览器浏览本网站
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/main.less";

a {
  .m-a-1;
  padding: 2px 0;
  line-height: 1.1em;
}

.links {
  display: flex;
  gap: 0px 12px;
  place-items: center;
  flex-wrap: wrap;

  margin: 0 0 10px 0;
}

.footer {
  width: 100%;
  height: fit-content;
  background: #eee;
  color: @light-font-color;

  .content {
    .m-reactive-box;
    font-size: 14px;

    padding: 0 8px 12px;

    display: flex;
    flex-direction: column;

    .logo {
      height: 40px;
      font-size: 1.2em;
      place-self: center;
    }

    .first {
      margin-bottom: 10px;

      .description {
        padding: 0 0 5px;
      }

      img {
        width: 100px;
      }

      .codes {
        display: flex;
        gap: 5px 10px;
        flex-wrap: wrap;

        span {
          display: flex;
        }

        .code {
          display: flex;
          flex-direction: column;
          place-items: center;

          p {
            font-size: 0.8em;
            padding: 0;
            color: #6c7778;
          }
        }
      }
    }

    .tips,
    .friendshipLinks,
    .copyright,
    .pnsp {
      .links;
    }

    .tips {
      a {
        color: @light-font-color;

        &:hover {
          color: @light-link-color;
        }
      }
    }

    .copyright {
      div {
        color: #6c7778;
      }
    }

    .pnsp {
      img {
        display: flex;
        width: 16px;
      }
    }
  }
}
</style>
