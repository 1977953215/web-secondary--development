<template>
  <div id="development">
    <el-carousel arrow="always" :autoplay="false">
      <el-carousel-item v-for="item in renderMap" :key="item">
        <div v-if="item == 'Main'" type="主视图">
          <Main :mainInit="mainInit" :key="mainKey" :customConfig="customConfig" />
        </div>
        <div v-else type="配置项">
          <DesignConfiguration :customConfig="customConfig" :changeCustomConfig="changeCustomConfig" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// import { Carousel, CarouselItem } from "element-ui";
// import Vue from "vue";
import { Main, DesignConfiguration } from "@/components";
import { mockCustomConfig, mockChangeCustomConfig } from "./mockData.js";
import Utils from "@/utils";
// Vue.use(Carousel);
// Vue.use(CarouselItem);
export default {
  name: "Development",
  components: {
    Main,
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
  props: {
    mainInit: Function,
  },
  mounted() {
    this.mainInit(this);
  },
  methods: {
    changeCustomConfig(customConfig) {
      customConfig = JSON.parse(customConfig);
      this.customConfig = customConfig;
      this.mainKey = Utils.generateUUID();
      mockChangeCustomConfig(customConfig);
    },
  },
};
</script>

<style lang="less" scoped>
#development {
  height: 100%;

  .el-carousel {
    height: 100%;

    ::v-deep .el-carousel__indicators {
      bottom: 120px;
      transform: scale(1.3);
      transform: translateX(-50%);
      .el-carousel__indicator .el-carousel__button {
        background: gray;
      }

      .is-active .el-carousel__button {
        background: red;
      }
    }
    ::v-deep .el-carousel__container {
      height: 100%;

      .el-carousel__item {
        & > div {
          height: 100%;
          position: relative;

          &:before {
            content: attr(type);
            position: absolute;
            bottom: 50px;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 40px;
            color: rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
  }
}
</style>
