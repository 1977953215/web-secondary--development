<template>
   <div>
      <div class="options" v-for="item in optionsRender" :key="item">
         <div class="options-item">
            <div :style="{ display: 'inline-block', width: '200px' }">{{ item }}</div>
            <el-input v-model="customOptions[item]"></el-input>
         </div>
      </div>
      <el-button class="optionsSubmit" @click="changeOptions(customOptions)">执行</el-button>
   </div>
</template>

<script>
// import { Button, Input } from "element-ui";
// import Vue from "vue";
import configJson from "../../../pluginTemp/config.json";

// Vue.use(Button);
// Vue.use(Input);
export default {
   name: "Options",
   components: {},
   data() {
      return {
         optionsRender: [],
         customOptions: this.options,
      };
   },
   props: ["options", "changeOptions"],
   mounted() {
      this.optionsRender = configJson.props.customconf || [];
   },
   methods: {},
};
</script>

<style scoped lang="less">
.options-item {
   margin: 5px 0 0 5px;

   .el-input {
      width: 300px;
   }
}

.optionsSubmit {
   background: #0454f2;
   border-color: #0454f2;
   box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
   color: #fff;
   text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
}
</style>
