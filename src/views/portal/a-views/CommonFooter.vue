<script setup></script>

<template>
  <div class="footer">
    <div class="content">
      <div class="official-footer-container">
        <div class="pt-[56px]">
          <img src="@/assets/images/logo_with_title.png" width="255" />
        </div>
        <div class="mt-[24px] text-[#1B1E22] flex justify-between h-[176px]">
          <div
            class="official-footer-container-top-left flex flex-col justify-between"
          >
            <div class="">
              <h2 class="leading-[32px] custom-font-bold text-[16px]">
                咨询热线
              </h2>
              <div class="official-footer-container-phone custom-font-bold">
                4000 - 199 - 199
              </div>
            </div>
            <div
              class="leading-[24px] text-[14px] text-[#565D66] flex space-y-[4px] flex-col"
            >
              <div class="line-clamp-1">
                电子邮箱：industry_plat@iflytek.com
              </div>
              <div class="line-clamp-1">
                合肥地址：安徽省合肥市香蒲路668号B2栋
              </div>
              <div class="line-clamp-1">
                杭州地址：浙江省杭州市萧山区金二路617号信息港6期8号楼
              </div>
            </div>
          </div>
          <div
            class="official-footer-container-top-right flex space-x-[40px]"
            style="width: 580px"
          >
            <div
              class="flex flex-col text-[14px] text-[#565D66] leading-[24px] gap-y-[12px] flex-1"
            >
              <div
                class="custom-font-bold text-[#1B1E22] text-[16px] leading-[32px]"
              >
                支持与服务
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">反馈建议</div>
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">用户协议</div>
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">隐私协议</div>
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">服务商协议</div>
              </div>
            </div>
            <div
              class="flex flex-col text-[14px] text-[#565D66] leading-[24px] gap-y-[12px] flex-1"
            >
              <div
                class="custom-font-bold text-[#1B1E22] text-[16px] leading-[32px]"
              >
                账户管理
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">工作台</div>
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">账号信息</div>
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">组织信息</div>
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">我的消息</div>
              </div>
            </div>
            <div
              class="flex flex-col text-[14px] text-[#565D66] leading-[24px] gap-y-[12px] flex-1"
            >
              <div
                class="custom-font-bold text-[#1B1E22] text-[16px] leading-[32px]"
              >
                快速入口
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">数字化应用商城</div>
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">企业需求大厅</div>
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">解决方案大厅</div>
              </div>
              <div>
                <div class="cursor-pointer text-[#565D66]">ISV生态伙伴</div>
              </div>
            </div>
          </div>
          <div
            class="official-footer-qr mb-0 text-[14px] flex flex-col justify-between"
          >
            <div class="leading-[32px] text-[16px] custom-font-bold">
              关注我们
            </div>
            <div class="flex justify-between space-x-[26px]">
              <div class="flex-clo-center">
                <div class="qr-bg-white">
                  <img class="w-[80px] h-[80px]" />
                </div>
                <div>客服微信</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="h-[68px] text-[14px] leading-[20px] border-1px border-[#E6E8EB] border-t-solid flex items-center mt-[72px] justify-between"
        >
          <div>
            <span>运营管理: 合肥任也科技有限公司</span
            ><span class="ml-[24px]">指导单位: 安徽省</span>
          </div>
          <div class="center flex">
            <img class="w-[20px] h-[20px] mr-[6px]" /><a
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34019202001715"
              target="_blank"
              >皖公网安备 asdohuiashio</a
            ><a
              href="http://beian.miit.gov.cn/"
              target="_blank"
              class="pl-[24px]"
              >皖ICP备adjghbhbj号-1</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/main.less";

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
  }
}
</style>
