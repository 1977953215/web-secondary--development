<template>
  <div :id="id" ref="app-secondary" class="app-secondary">-----------------------------</div>
</template>
<script>
// import { this.appVariables, mockChangeCustomConfig } from "../development/mockData";
import { requeryAddressByCoordinate, jsSdkConfig } from "../../api/asset";
import qs from "qs";
export default {
  name: "Main",
  props: {
    customConfig: Object,
    info: Object,
    //应用变量和系统变量 2022.7.26 V8R4C50SPC220需求新加 之前版本取不到appVariables和sysVariables
    sysVariables: Array,
    //2022.8.11 V8R4C60SPC100需求新加，之前版本取不到themeInfo
    themeInfo: Object,
    //2022.10新加，之前取不到国际化方法
    intlGetKey: Function,
    history: Object,
    mainInit: Function,
    changeAppVariables: Function,
  },
  computed: {},
  data() {
    return {
      //必需，不可删除
      id: "",
      // changeAppVariables:
      //   window.location.pathname.indexOf("/app/edit") > -1 || window.location.pathname.indexOf("/app/new") > -1
      //     ? window["APP_SDK_FUNCTION"][qs.parse(window?.location.search)?.appid].changeAppVariables
      //     : "",
      // appVariables: window.APP_SDK_DATA.store.appVariables || [],
    };
  },
  async mounted() {
    this.getJSSDK();
    //此方法封装了事件注册，不可删除
    this.mainInit(this);
  },
  methods: {
    async getJSSDK() {
      let message = {
        url: encodeURIComponent(window.location.href.split("#")[0]),
      };
      let { data: res } = await jsSdkConfig(message);
      window.sessionStorage.setItem("jssdkconifgData", JSON.stringify(res));
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: ["openLocation", "getLocation"], // 必填，需要使用的 JS 接口列表
      });
      window.wx.ready(() => {
        window.wx.getLocation({
          type: "gcj02",
          success: (resp) => {
            const latitude = resp.latitude;
            const longitude = resp.longitude;
            const speed = resp.speed;
            const accuracy = resp.accuracy;
            let info = {
              coordinate: `${latitude},${longitude}`,
            };
            requeryAddressByCoordinate(info).then((res) => {
              // alert(
              //   JSON.stringify({
              //     citycode: res.data.address_reference.town.id,
              //     latitude,
              //     longitude,
              //   })
              // );
              this.triggerEvent("nowCitycodeChange", {
                citycode: res.data.address_reference.town.id,
                latitude,
                longitude,
              });
            });
          },
          fail(error) {},
        });
      });
    },
    /**
     * 封装的触发事件方法 必需，不可删除
     * @param {String} eventName 事件名
     * @param {Object} payload 事件传参
     *
     */
    triggerEvent(type, payload) {
      window.eventCenter?.triggerEvent &&
        window.eventCenter.triggerEvent(this.customConfig.componentId, type, {
          value: payload,
        });
    },
    //必需，不可删除
    Event_Center_getName() {
      return this.id;
    },
  },
  beforeDestroy() {
    window.componentCenter?.removeInstance(this.customConfig?.componentId);
  },
};
</script>
