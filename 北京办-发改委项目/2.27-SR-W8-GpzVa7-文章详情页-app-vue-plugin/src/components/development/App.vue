<template>
   <div id="development">
      <div class="main" ref="main" :key="mainKey">
         <Main :customConfig="customConfig" />
      </div>
      <!-- <div id="configuration">
         <Options :options="customConfig" :changeOptions="changeCustomConfig" />
         <DesignConfiguration :customConfig="customConfig" :changeCustomConfig="changeCustomConfig" />
      </div> -->
   </div>
</template>

<script>
import { Main, DesignConfiguration } from "@/components";
import Options from "./Options.vue";
import { mockCustomConfig, mockChangeCustomConfig } from "./mockData.js";
import Utils from "@/utils";
import setAttributes from "@/utils/handlePlatform/setAttributes.js";
export default {
   name: "Development",
   components: {
      Main,
      Options,
      DesignConfiguration,
   },
   data() {
      return {
         renderMap: ["Main", "DesignConfiguration"],
         mainKey: "",
         customConfig: mockCustomConfig,
      };
   },
   created() {},
   props: {},
   mounted() {
      setAttributes(this.$refs.main, { customConfig: this.customConfig });
   },
   methods: {
      changeCustomConfig(customConfig) {
         this.customConfig = customConfig;
         this.mainKey = Utils.tools.generateUUID();
         this.$nextTick(() => {
            setAttributes(this.$refs.main, { customConfig: this.customConfig });
         });
         mockChangeCustomConfig(customConfig);
      },
   },
};
</script>

<style lang="less" scoped>
#development {
   height: 100%;
   box-sizing: border-box;
   // overflow: hidden;
   .main {
      width: 100%;
      display: inline-block;
      height: 100%;
      box-sizing: border-box;
   }

   #configuration {
      padding: 20px 10px 0 10px;
      height: 100%;
      background-color: #f0f2f5;
      width: 300px;
      float: right;
      box-sizing: border-box;

      .optionsSubmit {
         background: #0454f2;
         border-color: #0454f2;
         box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
         color: #fff;
         text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
         margin-left: 20px;
      }
   }
}
</style>
