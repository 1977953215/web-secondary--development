<template>
  <div ref="app-secondary"></div>
</template>
<script>
import platformMixin from "@/mixin/platform.js";
import { jsSdkConfig } from "../../api/asset";
export default {
  name: "Main",
  props: {
    customConfig: Object,
    info: Object,
    //应用变量和系统变量 2022.7.26 V8R4C50SPC220需求新加 之前版本取不到appVariables和sysVariables
    appVariables: Array,
    sysVariables: Array,
    //2022.8.11 V8R4C60SPC100需求新加，之前版本取不到themeInfo
    themeInfo: Object,
    //2022.10新加，之前取不到国际化方法
    intlGetKey: Function,
    history: Object,
  },
  mixins: [platformMixin],
  computed: {},
  data() {
    return {
      number: 1,
    };
  },
  async mounted() {
    console.log(6666);
    this.initComData();
    await this.getJSSDK();
  },
  methods: {
    async getJSSDK() {
      let message = {
        url: encodeURIComponent(window.location.href.split("#")[0]),
      };
      let res = "";
      let data = await jsSdkConfig(message);
      res = data.data;
      window.sessionStorage.setItem("jssdkconifgData", JSON.stringify(res));
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: ["openLocation", "getLocation"], // 必填，需要使用的 JS 接口列表
      });
    },
    handleClick() {
      this.triggerEvent("click", { value: "123" });
    },
    //action样例
    do_EventCenter_receiveLongLat({ value }) {
      console.log(value);
      window.wx.openLocation({
        latitude: Number(value.latitude),
        longitude: Number(value.longitude),
        success(res) {},
        fail(error) {},
      });
    },
    initComData() {
      const { customConfig } = this;
      customConfig.number && (this.number = customConfig.number);
    },
  },
};
</script>
