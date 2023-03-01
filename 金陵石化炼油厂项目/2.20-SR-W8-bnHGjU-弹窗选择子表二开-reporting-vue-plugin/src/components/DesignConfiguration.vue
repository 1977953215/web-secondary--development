<template>
   <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="占位符">
         <el-input v-model="form.placeholder"></el-input>
      </el-form-item>
   </el-form>
</template>

<script>
export default {
   data() {
      return {
         form: {
            placeholder: "",
         },
      };
   },

   watch: {
      "form.size": function (value, oldValue) {
         this.onFormLayoutChange();
      },
      "form.placeholder": function (value, oldValue) {
         this.onFormLayoutChange();
      },
      "form.allowClear": function (value, oldValue) {
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
