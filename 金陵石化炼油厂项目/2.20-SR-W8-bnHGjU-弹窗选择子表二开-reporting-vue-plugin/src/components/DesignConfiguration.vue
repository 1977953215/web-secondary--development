<template>
   <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="是否禁用">
         <el-switch v-model="form.isDisabled"></el-switch>
      </el-form-item>
   </el-form>
</template>

<script>
export default {
   data() {
      return {
         form: {
            isDisabled: "",
         },
      };
   },

   watch: {
      "form.isDisabled": function (value, oldValue) {
         this.onFormLayoutChange();
      },
   },

   props: {
      customConfig: Object,
   },
   methods: {
      onFormLayoutChange() {
         this.customConfig.changeConfiguration(JSON.stringify(this.form));
      },
   },
   mounted() {
      this.form = JSON.parse(this.customConfig.configuration || "{}");
   },
};
</script>
