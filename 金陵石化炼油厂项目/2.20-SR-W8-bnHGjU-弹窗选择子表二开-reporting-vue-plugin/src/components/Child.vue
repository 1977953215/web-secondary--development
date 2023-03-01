<template>
   <el-input v-model="data" @input="inputChange" size="small" />
</template>

<script>
import eventActionDefine from "./msgCompConfig";
export default {
   name: "Add",
   props: {
      customConfig: Object,
   },
   data() {
      return {
         data: this.customConfig.data,
      };
   },
   mounted() {
      let { component, child_id = "", index } = this.customConfig;
      let initId = `${component?.id}__childId__${child_id.substr(0, 10)}`;
      initId = `${initId}__index__${index}`;
      window?.componentCenter?.register(initId, "comp", this, eventActionDefine);
   },
   methods: {
      async inputChange(e) {
         this.data = e;
         let { formConfig, component, child_id = "", index, onChange } = this.customConfig;
         let initId = `${component?.id}__childId__${child_id.substr(0, 10)}`;
         await window.eventCenter.triggerEventNew({
            objectId: formConfig?.id,
            componentId: initId,
            type: "report",
            event: "change",
            payload: {
               value: e,
               childIndex: index,
            },
         });
         onChange(e);
      },
      Event_Center_getName() {
         let { formConfig, component } = this.customConfig;
         return `${formConfig?.form_name}-${component.columnStyle.title}`;
      },
      do_EventCenter_setValue({ value }) {
         this.data = value;
      },
      Event_Center_getName() {
         return this.data;
      },
   },
   destroyed() {
      let { component, child_id = "", index } = this.customConfig;
      let initId = `${component?.id}__childId__${child_id.substr(0, 10)}`;
      initId = `${initId}__index__${index}`;
      window?.componentCenter?.removeInstance(initId);
   },
};
</script>

<style></style>
