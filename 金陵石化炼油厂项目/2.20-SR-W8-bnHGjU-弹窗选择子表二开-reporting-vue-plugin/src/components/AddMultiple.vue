<template>
   <el-input placeholder="请输入内容" v-model="data[1]" class="input-with-select" @input="inputChange" size="small">
      <el-select v-model="data[0]" @change="selectChange" slot="prepend" placeholder="请选择">
         <el-option label="餐厅名" value="1" />
         <el-option label="订单号" value="2" />
         <el-option label="用户电话" value="3" />
      </el-select>
   </el-input>
</template>

<script>
export default {
   name: "AddMultiple",
   props: {
      customConfig: Object,
   },
   data() {
      return {
         data: this.customConfig.data.split(""),
      };
   },
   methods: {
      inputChange(e) {
         this.data = [this.data[0], e];
      },
      selectChange(e) {
         this.data = [e, this.data[1]];
      },
   },
   watch: {
      data(newVal) {
         this.customConfig.onChange(newVal);
      },
   },
};
</script>

<style lang="less">
.input-with-select {
   .el-input-group__prepend {
      background-color: #fff;
      .el-select .el-input {
         width: 130px;
      }
   }
}
</style>
