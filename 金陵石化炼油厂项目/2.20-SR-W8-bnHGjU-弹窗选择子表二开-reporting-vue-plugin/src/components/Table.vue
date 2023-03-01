<template>
   <div class="table-root">{{ data }}</div>
</template>

<script>
export default {
   name: "Table",
   props: {
      customConfig: Object,
   },
   data() {
      return {
         data: this.customConfig.data,
      };
   },
};
</script>

<style lang="less" scoped>
.table-root {
   box-sizing: border-box;
   height: 32px;
   line-height: 32px;
   font-size: 13px;
   color: #606266;
}
</style>
