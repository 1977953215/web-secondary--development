<template>
   <div style="text-align: center; margin-top: 20px">
      <el-button type="primary" @click="handleClick">配置项与主区域交互样例</el-button>
   </div>
</template>

<script>
export default {
   name: "DesignConfiguration",
   components: {},
   props: ["customConfig", "changeCustomConfig"],
   data() {
      return {};
   },
   mounted() {
      this.customConfig.number = this.customConfig.number || 1;
   },
   methods: {
      handleClick() {
         this.customConfig.number++;
         this.changeCustomConfig(this.customConfig);
      },
   },
};
</script>

<style scoped></style>
