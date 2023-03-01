<template>
   <component :is="componentType" :customConfig="customConfig" />
</template>

<script>
import Set from "./components/Set.vue";
import Add from "./components/Add.vue";
import AddMultiple from "./components/AddMultiple.vue";
import Child from "./components/Child.vue";
import Preview from "./components/Preview.vue";
import Table from "./components/Table.vue";
import DesignConfiguration from "./components/DesignConfiguration.vue";

export default {
   name: "App",
   props: {
      type: String,
      customConfig: Object,
   },
   components: {
      Set,
      Add,
      AddMultiple,
      Child,
      Preview,
      Table,
      DesignConfiguration,
   },
   computed: {
      componentType: function () {
         return this.type.slice(0, 1).toUpperCase() + this.type.slice(1);
      },
   },
};
</script>
