<template>
  <div :id="id" ref="canvas-secondary" class="canvas-secondary">
    <div class="block" @click="goPhone">
      <img src="../../../pluginTemp/images/phone.png" alt="" :width="this.configuration?.form?.iconSize || '36px'" />
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
  },
  computed: {},
  data() {
    return {
      //必需，不可删除
      id: "",
    };
  },
  mounted() {
    console.log(this.value, 29);
    //此方法封装了事件注册，不可删除
    this.mainInit(this);
    this.initData();
  },
  methods: {
    goPhone() {
      window.location.href = "tel:" + this.value;
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
<style lang="less" scoped>
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
