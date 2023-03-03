<template>
  <div :id="id" ref="canvas-secondary" class="canvas-secondary">
    <div class="block" @click="goMap">
      <img src="../../../pluginTemp/images/position.png" alt="" :width="this.configuration?.form?.iconSize || '36px'" />
    </div>
  </div>
</template>
<script>
import { jsSdkConfig } from "../../api/asset";
export default {
  name: "Main",
  props: {
    formListModelVariableList: Object,
    customConfig: Object,
    configuration: Object,
    componentId: String,
    record: Object,
    value: String,
    mainInit: Function,
    allComponentList: Array,
  },
  computed: {},
  data() {
    return {
      //必需，不可删除
      id: "",
      valuePosition: "",
    };
  },
  async mounted() {
    let lat = "";
    let long = "";
    this.allComponentList.forEach((item, index) => {
      if (item.title == "latitude") {
        for (const k in this.record) {
          if (k == item.id) {
            lat = this.record[k];
          }
        }
      }
      if (item.title == "longitude") {
        for (const k in this.record) {
          if (k == item.id) {
            long = this.record[k];
          }
        }
      }
    });
    this.valuePosition = lat + "," + long;
    console.log(this.valuePosition,49);
    await this.getJSSDK();
    //此方法封装了事件注册，不可删除
    this.mainInit(this);
    this.initData();
  },
  methods: {
    async getJSSDK() {
      let message = {
        url: encodeURIComponent(window.location.href.split("#")[0]),
      };
      let res = "";
      if (window.sessionStorage.getItem("jssdkconifgData")) {
        res = JSON.parse(window.sessionStorage.getItem("jssdkconifgData"));
      } else {
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
      }
      window.wx.ready(() => {});
      window.wx.error((res) => {});
    },
    goMap() {
      window.wx.openLocation({
        latitude: Number(this.valuePosition?.split(",")[0]),
        longitude: Number(this.valuePosition?.split(",")[1]),
        success(res) {},
        fail(error) {},
      });
    },
    /**
     * 封装的触发事件方法 必需，不可删除
     * @param {String} eventName 事件名
     * @param {Object} payload 事件传参
     *
     */
    triggerEvent(eventName, payload) {
      let { componentId, appId } = this.customConfig || {};
      componentId && appId && window.eventCenter?.triggerEvent(componentId, eventName, payload);
    },
    initData() {
      this.number = this.customConfig.number || 1;
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
<style lang="less" :scoped="true">
.imgTitle {
  font-size: 14px;
}
.block {
  width: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
