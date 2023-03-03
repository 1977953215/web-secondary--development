<template>
  <div>
    <div class="options" v-for="item in optionsRender" :key="item">
      <div class="options-item">
        <el-row :gutter="20">
          <el-col :span="6">
            <div :style="{ display: 'inline-block', height: '40px', lineHeight: '40px' }">{{ item }}</div>
          </el-col>
          <el-col :span="18">
            <el-input v-model="customOptions[item]" @change="changeOptions(customOptions)" />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import configJson from "../../../pluginTemp/config.json";

// Vue.use(Button)
// Vue.use(Row)
// Vue.use(Input)
// Vue.use(Col)
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
}
</style>
