<template>
   <div :id="id" ref="app-secondary" class="app-secondary outermest_area">
      <!-- <van-dropdown-menu active-color="#1989fa" :overlay="true" :lock-scroll="false" direction="up">
         <van-dropdown-item :title="organizationTypeTitle" v-model="organizationType" :options="organizationTypeList" @change="changeTypeDropDown" />
         <van-dropdown-item :title="distanceTitle" v-model="distance" :options="distanceList" @change="changeDistanceDropDown" />
         <van-dropdown-item :title="sortTitle" v-model="sort" :options="sortList" @change="changeSortDropDown" />
      </van-dropdown-menu> -->

      <van-dropdown-menu active-color="#1989fa" :overlay="false" close-on-click-overlay>
         <van-dropdown-item :title="organizationTypeTitle" @open="openDropMenu('organization')" />
         <van-dropdown-item :title="distanceTitle" @open="openDropMenu('distance')" />
         <van-dropdown-item :title="sortTitle" @open="openDropMenu('sort')" />
      </van-dropdown-menu>

      <van-popup v-model="popupIsShow" round position="bottom">
         <van-cascader v-if="cascaderType == 'organization'" v-model="organizationType" :show-header="false" :options="organizationTypeList" @change="changeTypeDropDown" />
         <van-cascader v-if="cascaderType == 'distance'" v-model="distance" :show-header="false" :options="distanceList" @change="changeDistanceDropDown" />
         <van-cascader v-if="cascaderType == 'sort'" v-model="sort" :show-header="false" :options="sortList" @change="changeSortDropDown" />
      </van-popup>
   </div>
</template>

<script>
import "./app.less";
import { queryTypeData } from "../../api/asset";

import qs from "querystringify";

export default {
   name: "Main",

   props: {
      customConfig: Object,
      info: Object,
      appletiables: Array,
      sysletiables: Array,
      themeInfo: Object,
      intlGetKey: Function,
      history: Object,
      mainInit: Function,
      changeAppVariables: Function,
   },

   data() {
      return {
         id: "",

         organizationType: "",
         organizationTypeTitle: "组织类型",
         organizationTypeList: [],

         distance: "",
         distanceTitle: "距离",
         distanceList: [
            { text: "无", value: "clear" },
            { text: "升序", value: "0" },
            { text: "降序", value: "1" },
         ],

         sort: "",
         sortTitle: "排序",
         sortList: [
            { text: "无", value: "clear" },
            { text: "粉丝数升序", value: "1" },
            { text: "粉丝数降序", value: "2" },
            { text: "活动数升序", value: "3" },
            { text: "活动数降序", value: "4" },
         ],

         // url参数
         urlSearch: "",

         popupIsShow: false,
         // 级联选择器类型
         cascaderType: "",
      };
   },

   mounted() {
      // new VConsole();

      this.urlSearch = qs.parse(window.location.search);

      // 事件注册
      this.mainInit(this);

      // 获取组织类型
      this.getOrganizationType();

      this.$nextTick(() => {
         // 距离默认选中
         if (this.urlSearch.distance) {
            this.distance = this.urlSearch.distance;
            this.distanceTitle = this.distanceList.filter((item) => {
               return item.value == this.urlSearch.distance;
            })[0].text;
         }
         // 排序默认选中
         if (this.urlSearch.other) {
            this.sort = this.urlSearch.other;
            this.sortTitle = this.sortList.filter((item) => {
               return item.value == this.urlSearch.other;
            })[0].text;
         }
      });
   },

   methods: {
      // 获取组织类型数据
      getOrganizationType() {
         let dataForm = {
            queryCondition: {
               queryColumns: ["organization_type_name", "categorical_sorting", "data_id"],
               queryParams: [
                  {
                     colName: "is_delete",
                     type: 2,
                     value: "0",
                  },
               ],
               orderBy: "categorical_sorting",
               orderSort: "DESC",
            },
         };
         queryTypeData(dataForm).then((res) => {
            // 组织类型数据
            this.organizationTypeList = [];
            // 转换数据
            res.data.results.forEach((item) => {
               this.organizationTypeList.push({
                  text: item.organization_type_name,
                  value: item.data_id,
               });
            });
            // 添加清空选项
            if (this.organizationTypeList[0].text != "无") {
               this.organizationTypeList.unshift({
                  text: "无",
                  value: "clear",
               });
            }
            // 添加默认选中
            if (this.urlSearch.org_type) {
               let type = this.organizationTypeList.filter((item) => {
                  return item.value == this.urlSearch.org_type;
               });

               this.organizationType = type[0].value;
               this.organizationTypeTitle = type[0].text;
            }
         });
      },

      // 切换组织类型
      changeTypeDropDown(value) {
         // 清空选项
         if (value.value == "clear") {
            this.organizationType = "";
            this.organizationTypeTitle = "组织类型";
            this.triggerEvent("dropOrganizationType", { organizationType: "" });
            this.changeAppVariables(null, "org_type");
            console.log("修改应用变量(org_type)：", null);
            return;
         }
         this.organizationTypeTitle = this.filterData(this.organizationTypeList, value.value);
         this.triggerEvent("dropOrganizationType", { organizationType: value.value });
      },
      // 切换距离
      changeDistanceDropDown(value) {
         // 清空选项
         if (value.value == "clear") {
            this.distance = "";
            this.distanceTitle = "距离";
            this.triggerEvent("dropDistance", { distance: "999" });
            this.changeAppVariables("999", "distance");
            console.log("修改应用变量(org_type)：", "999");
            return;
         }
         this.distanceTitle = this.filterData(this.distanceList, value.value);
         this.triggerEvent("dropDistance", { distance: value.value });
      },
      // 切换排序
      changeSortDropDown(value) {
         // 清空选项
         if (value.value == "clear") {
            this.sort = "";
            this.sortTitle = "排序";
            this.triggerEvent("dropSort", { sort: "999" });
            this.changeAppVariables("999", "other");
            console.log("修改应用变量(other)：", "999");
            return;
         }
         this.sortTitle = this.filterData(this.sortList, value.value);
         this.triggerEvent("dropSort", { sort: value.value });
      },

      // 展开下拉菜单
      openDropMenu(menuType) {
         // 改变弹出层类型
         this.cascaderType = menuType;
         // 打开弹出层
         this.popupIsShow = true;
      },

      // 过滤数据
      filterData(dataList, value) {
         let row = dataList.filter((item) => {
            return item.value == value;
         });
         return row[0].text;
      },

      // 逻辑控制事件方法
      triggerEvent(eventName, payload) {
         let { componentId, appId } = this.customConfig || {};
         componentId && appId && window.eventCenter?.triggerEvent(componentId, eventName, payload);
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
