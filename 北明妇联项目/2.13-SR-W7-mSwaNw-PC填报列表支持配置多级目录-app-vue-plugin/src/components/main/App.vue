<template>
  <div
    :id="id"
    ref="app-secondary"
    class="app-secondary"
    style="display: flex; justify-content: space-between; height: 100%"
    :style="{ width: this.customConfig.组件宽 || '100%', height: this.customConfig.组件高 || '100%' }"
  >
    <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input> -->
    <div class="treeLeft">
      <span style="color: #367583; font-weight: 700">┃ 组织</span>
      <el-tree
        :data="leftTreedata"
        node-key="citycode"
        :props="defaultProps"
        :highlight-current="true"
        :expand-on-click-node="true"
        ref="tree"
        @node-click="(data, node, item) => nodeClick(data, node, item, 'left')"
        icon-class=" "
        :default-expanded-keys="['32']"
        style="height: 94%; overflow-y: auto"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }" v-if="data.type == 'area'">
          <svg
            v-show="!node.expanded && data.leval == 3"
            t="1676345380838"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2680"
            width="16"
            height="16"
            style="margin-top: 2px"
          >
            <path
              d="M877.714286 768c0 21.942857-14.628571 36.571429-36.571429 36.571429h-585.142857c-21.942857 0-36.571429-14.628571-36.571429-36.571429v-585.142857c0-21.942857 14.628571-36.571429 36.571429-36.571429h585.142857c21.942857 0 36.571429 14.628571 36.571429 36.571429v585.142857zM841.142857 73.142857h-585.142857C197.485714 73.142857 146.285714 124.342857 146.285714 182.857143v585.142857c0 58.514286 51.2 109.714286 109.714286 109.714286h585.142857c58.514286 0 109.714286-51.2 109.714286-109.714286v-585.142857c0-58.514286-51.2-109.714286-109.714286-109.714286z m-146.285714 365.714286H585.142857V329.142857c0-21.942857-14.628571-36.571429-36.571428-36.571428s-36.571429 14.628571-36.571429 36.571428V438.857143H402.285714c-21.942857 0-36.571429 14.628571-36.571428 36.571428s14.628571 36.571429 36.571428 36.571429H512v109.714286c0 21.942857 14.628571 36.571429 36.571429 36.571428s36.571429-14.628571 36.571428-36.571428V512h109.714286c21.942857 0 36.571429-14.628571 36.571428-36.571429S716.8 438.857143 694.857143 438.857143z"
              p-id="2681"
              fill="#367583"
            ></path>
          </svg>
          <svg
            v-show="node.expanded && data.leval == 3"
            t="1676345689230"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2309"
            width="16"
            height="16"
            style="margin-top: 2px"
          >
            <path
              d="M70.4 153.6c0-45.9264 37.2736-83.2 83.2-83.2h716.8c45.9264 0 83.2 37.2736 83.2 83.2v716.8c0 45.9264-37.2736 83.2-83.2 83.2H153.6A83.2 83.2 0 0 1 70.4 870.4V153.6z m64 0v716.8c0 10.5984 8.6016 19.2 19.2 19.2h716.8a19.2 19.2 0 0 0 19.2-19.2V153.6A19.2 19.2 0 0 0 870.4 134.4H153.6A19.2 19.2 0 0 0 134.4 153.6z"
              fill="#367583"
              p-id="2310"
            ></path>
            <path d="M307.2 544a32 32 0 1 1 0-64h409.6a32 32 0 1 1 0 64H307.2z" fill="#367583" p-id="2311"></path>
          </svg>
          <svg
            v-show="data.leval == 2"
            style="transform: rotate(180deg) rotateY(180deg)"
            t="1676346320560"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="18369"
            width="14"
            height="14"
          >
            <path
              d="M587 0H160c-35.3 0-64 28.7-64 64v896c0 35.3 28.7 64 64 64h704c35.3 0 64-28.7 64-64V341c0-33.9-13.5-66.5-37.5-90.5l-213-213C653.5 13.5 620.9 0 587 0z m53 90.5L837.5 288H704c-35.3 0-64-28.7-64-64V90.5zM832 960H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h384v160c0 70.7 57.3 128 128 128h160v576c0 17.7-14.3 32-32 32z"
              p-id="18370"
              fill="#367583"
            ></path>
          </svg>
          <svg v-show="data.leval == 1" t="1676346998980" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="40652" width="13" height="16">
            <path
              d="M372.363636 930.909091h558.545455V349.090909h-162.909091v217.390546A139.636364 139.636364 0 1 1 589.754182 744.727273H372.363636v186.181818z m-93.090909 0v-186.181818H93.090909v186.181818h186.181818z m0-279.272727v-186.181819H186.181818v-93.090909h213.457455l116.363636-116.363636H674.909091V93.090909h93.090909v162.909091h162.909091V93.090909H93.090909v558.545455h186.181818z m93.090909 0h217.390546A140.032 140.032 0 0 1 674.909091 566.481455V349.090909h-120.366546l-116.363636 116.363636H372.363636v186.181819zM0 0h1024v1024H0V0z m721.454545 744.727273a46.545455 46.545455 0 1 0 0-93.090909 46.545455 46.545455 0 0 0 0 93.090909z"
              fill="#367583"
              p-id="40653"
            ></path>
          </svg>
          &nbsp;
          <span>{{ node.label }}</span>
          <!-- <el-input v-show="data.editShow" v-model="data.label" size="mini" style="width: 120px" @blur="blurTreeEditInput(data)" class="treeEditInput"></el-input>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)"> 新增 </el-button>
              <el-button type="text" size="mini" @click="() => editTreeNode(data)"> 编辑 </el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)"> 修改 </el-button>
            </span> -->
        </span>
      </el-tree>
    </div>
    <div class="treeRight">
      <span style="color: #367583; font-weight: 700">┃ 部门</span>
      <el-tree
        :data="rightTreedata"
        node-key="id"
        default-expand-all
        :props="defaultProps"
        :highlight-current="true"
        :expand-on-click-node="true"
        ref="tree"
        icon-class=" "
        @node-click="(data, node, item) => nodeClick(data, node, item, 'right')"
        style="height: 94%; overflow-y: auto"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <svg t="1676345689230" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2309" width="16" height="16" style="margin-top: 2px">
            <path
              d="M70.4 153.6c0-45.9264 37.2736-83.2 83.2-83.2h716.8c45.9264 0 83.2 37.2736 83.2 83.2v716.8c0 45.9264-37.2736 83.2-83.2 83.2H153.6A83.2 83.2 0 0 1 70.4 870.4V153.6z m64 0v716.8c0 10.5984 8.6016 19.2 19.2 19.2h716.8a19.2 19.2 0 0 0 19.2-19.2V153.6A19.2 19.2 0 0 0 870.4 134.4H153.6A19.2 19.2 0 0 0 134.4 153.6z"
              fill="#367583"
              p-id="2310"
            ></path>
            <path d="M307.2 544a32 32 0 1 1 0-64h409.6a32 32 0 1 1 0 64H307.2z" fill="#367583" p-id="2311"></path>
          </svg>
          <span>{{ node.label }}</span>
          <!-- <el-input v-show="data.editShow" v-model="data.label" size="mini" style="width: 120px" @blur="blurTreeEditInput(data)" class="treeEditInput"></el-input>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)"> 新增 </el-button>
              <el-button type="text" size="mini" @click="() => editTreeNode(data)"> 编辑 </el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)"> 修改 </el-button>
            </span> -->
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
import { Tree, Input, Icon } from "element-ui";
import Vue from "vue";
import { queryAssetById } from "../../api/asset";
import Utils from "../../utils/handleData";
Vue.use(Tree);
Vue.use(Input);
Vue.use(Icon);
export default {
  name: "Main",
  props: {
    customConfig: Object,
    info: Object,
    //应用变量和系统变量 2022.7.26 V8R4C50SPC220需求新加 之前版本取不到appVariables和sysVariables
    appVariables: Array,
    sysVariables: Array,
    componentId: String,
    //2022.8.11 V8R4C60SPC100需求新加，之前版本取不到themeInfo
    themeInfo: Object,
    //2022.10新加，之前取不到国际化方法
    intlGetKey: Function,
    history: Object,
    mainInit: Function,
  },
  computed: {},
  data() {
    return {
      //必需，不可删除
      id: "",
      newTreeId: "1000",
      leftTreedata: [],
      rightTreedata: [],
      // filterText: "",
      defaultProps: {
        children: "children",
        label: "cityname",
      },
      beforeNode: {},
      nodeAllData: [],
    };
  },
  // watch: {
  //   filterText(val) {
  //     this.$refs.tree.filter(val);
  //   },
  // },
  mounted() {
    queryAssetById(this.customConfig.树资产ID, 99999).then((res) => {
      this.nodeAllData = Utils.translatePlatformDataToJsonArray(res);
      this.leftTreedata = this.changeTree(
        Utils.translatePlatformDataToJsonArray(res).filter((item) => {
          return item.type == "area";
        }),
        0
      );
      console.log(this.rightTreedata);
    });
    //此方法封装了事件注册，不可删除
    this.mainInit(this);
  },
  methods: {
    changeTree(arr, parentcode) {
      const newArr = [];
      arr.forEach((item) => {
        if (item.parentcode == parentcode) {
          // 找一级，pid相同的item添加到新数组
          newArr.push(item);
          // 找二级，再次调用函数
          const children = this.changeTree(arr, item.citycode);
          // console.log(children);
          if (children.length) {
            item.children = children;
          }
        }
      });
      return newArr;
    },
    nodeClick(data, node, item, param) {
      console.log(data, node, item, param);
      if (param == "left") {
        node.childNodes.forEach((item) => {
          item.expanded = true;
        });
        this.rightTreedata = this.nodeAllData.filter((item) => {
          return item.type == "office" && data.citycode == item.parentcode;
        });
      }

      if (param == "right") {
        this.triggerEvent("treeClick", data);
      }
    },
    blurTreeEditInput(data) {
      console.log(data);
      data.editShow = false;
    },
    editTreeNode(data) {
      this.beforeNode.editShow = false;
      this.$set(data, "editShow", true);
      this.beforeNode = data;
    },
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.label.indexOf(value) !== -1;
    // },
    append(data) {
      let newChild = { id: this.newTreeId++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
    /**
     * 用于触发事件的方法，window.eventCenter?.triggerEvent封装了一层，
     * @param {String} eventName 事件名
     * @param {Object} payload 事件传参
     * @example triggerEvent("click",{value:"123"})
     *
     */
    triggerEvent(eventName, payload) {
      let { componentId, appId } = this.customConfig || {};
      componentId && appId && window.eventCenter?.triggerEvent(componentId, eventName, { value: payload.citycode });
    },
    //必需，不可删除
    Event_Center_getName() {
      return this.id;
    },
  },
  beforeDestroy() {
    window.componentCenter?.removeInstance(this.customConfig?.componentId);
  },
};
</script>
<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}
.treeLeft {
  width: 63%;
  height: 94%;
}
.treeRight {
  width: 35%;
  height: 94%;
}
.treeEditInput {
  /deep/.el-input__inner {
    height: 24px;
  }
}
/deep/.custom-tree-node {
  .el-button {
    opacity: 0;
  }
  &:hover {
    .el-button {
      opacity: 1;
    }
  }
}
/deep/.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #cfdee1 !important;
}
/deep/.custom-tree-node {
  span {
    color: #4e8591;
  }
}
/deep/.el-tree__empty-text {
  display: none;
}
</style>
