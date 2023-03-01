<template>
   <div :id="id" ref="app-secondary" class="app-secondary outermest_area">
      <!-- <van-dropdown-menu active-color="#1989fa" :overlay="true" :lock-scroll="false" direction="up">
         <van-dropdown-item :title="cityTitle" class="dropdown_city">
            <van-cell center>
               <template #right-icon>
                  <van-cascader v-model="city" :options="cityList" :show-header="false" :field-names="fieldNames" @change="changeCityDropDown" />
               </template>
            </van-cell>
         </van-dropdown-item>
         <van-dropdown-item :title="organizationTypeTitle" v-model="organizationType" :options="organizationTypeList" @change="changeTypeDropDown" />
         <van-dropdown-item :title="distanceTitle" v-model="distance" :options="distanceList" @change="changeDistanceDropDown" />
         <van-dropdown-item :title="sortTitle" v-model="sort" :options="sortList" @change="changeSortDropDown" />
      </van-dropdown-menu> -->

      <van-dropdown-menu active-color="#1989fa" :overlay="false" close-on-click-overlay>
         <van-dropdown-item :title="cityTitle" @open="openDropMenu('city')" />
         <van-dropdown-item :title="organizationTypeTitle" @open="openDropMenu('organization')" />
         <van-dropdown-item :title="distanceTitle" @open="openDropMenu('distance')" />
         <van-dropdown-item :title="sortTitle" @open="openDropMenu('sort')" />
      </van-dropdown-menu>

      <van-popup v-model="popupIsShow" round position="bottom">
         <van-cascader v-if="cascaderType == 'city'" v-model="city" :show-header="false" :options="cityList" :field-names="fieldNames" @change="changeCityDropDown" />
         <van-cascader v-if="cascaderType == 'organization'" v-model="organizationType" :show-header="false" :options="organizationTypeList" @change="changeTypeDropDown" />
         <van-cascader v-if="cascaderType == 'distance'" v-model="distance" :show-header="false" :options="distanceList" @change="changeDistanceDropDown" />
         <van-cascader v-if="cascaderType == 'sort'" v-model="sort" :show-header="false" :options="sortList" @change="changeSortDropDown" />
      </van-popup>
   </div>
</template>

<script>
import "./app.less";
import { queryTypeData, queryCityData } from "../../api/asset";

import qs from "querystringify";

import moment from "moment";

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

         city: "",
         cityTitle: "区域",
         cityList: [],

         // 级联选择器字段
         fieldNames: {
            text: "cityname",
            value: "citycode",
            children: "children",
         },

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

         // 弹出层开关
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

      // 获取城市数据
      this.getCityData();
      // 获取组织类型
      this.getOrganizationType();

      // this.do_EventCenter_changeFormulaArea({ value: "32" });

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
      // 对象数组转树形数据
      resetTreeData(data) {
         let leval4 = [];
         let leval3 = [];
         let leval2 = [];
         let leval1 = [];
         let leval0 = [];

         data.forEach((item) => {
            if (item.leval == "4") {
               leval4.push(item);
            } else if (item.leval == "3") {
               leval3.push(item);
            } else if (item.leval == "2") {
               leval2.push(item);
            } else if (item.leval == "1") {
               leval1.push(item);
            } else if (item.leval == "0") {
               leval0.push(item);
            }
         });

         leval1.forEach((item) => {
            item.children = [];
            item.children = leval0.filter((e) => {
               return e.parentcode == item.citycode;
            });
         });

         leval2.forEach((item) => {
            item.children = [];
            item.children = leval1.filter((e) => {
               return e.parentcode == item.citycode;
            });
         });

         leval3.forEach((item) => {
            item.children = [];
            item.children = leval2.filter((e) => {
               return e.parentcode == item.citycode;
            });
         });

         leval4.forEach((item) => {
            item.children = [];
            item.children = leval3.filter((e) => {
               return e.parentcode == item.citycode;
            });
         });

         return leval4;
      },

      // 获取城市数据
      getCityData(areaCode) {
         // 获取缓存数据
         let treeData = window.localStorage.getItem("cityDataList");
         let dataForm = {
            queryCondition: {
               queryColums: ["citycode", "parentcode", "cityname", "leval"],
            },
            orderBy: "citycode",
            orderSort: "DESC",
         };
         // 如果存在缓存数据
         if (treeData) {
            let newDate = Date.parse(new Date());
            let yesDate = JSON.parse(treeData).time;
            // 判断时间
            if (yesDate - newDate < -86400000) {
               console.log("筛选组件-区域-已过期");
               queryCityData(dataForm).then((res) => {
                  // 处理数据
                  this.cityList = this.resetTreeData(res.data.results);
                  // 创建缓存数据
                  let localData = {
                     time: moment(new Date()).format("yyyy-MM-DD HH:MM:ss"),
                     data: this.cityList,
                  };
                  // 添加缓存数据
                  window.localStorage.setItem("cityDataList", JSON.stringify(localData));
                  this.addDefaultValue(areaCode);
               });
            } else {
               console.log("筛选组件-区域-未过期");
               this.cityList = JSON.parse(treeData).data;
               this.addDefaultValue(areaCode);
            }
         } else {
            // 获取数据
            queryCityData(dataForm).then((res) => {
               // 处理数据
               this.cityList = this.resetTreeData(res.data.results);
               // 创建缓存数据
               let localData = {
                  // time: moment(new Date()).format("yyyy-MM-DD HH:MM:ss"),
                  time: Date.parse(new Date("2023-2-27 10:30:00")),
                  data: this.cityList,
               };
               // 添加缓存数据
               window.localStorage.setItem("cityDataList", JSON.stringify(localData));
               this.addDefaultValue(areaCode);
            });
         }
      },

      // 添加默认值
      addDefaultValue(areaCode) {
         // 添加默认选中
         this.$nextTick(() => {
            let cityCode = "";
            // 获取默认选中值
            if (!areaCode) {
               if (this.urlSearch.citycode) {
                  cityCode = this.urlSearch.citycode;
               } else {
                  let appVariablesList = window?.APP_SDK_DATA?.store?.appVariables;
                  appVariablesList?.forEach((item) => {
                     if (item.name == "officecity") {
                        cityCode = item.default_value;
                     }
                  });
                  console.log("<---筛选组织-公示-应用变量--->", this.cityValue);
               }
            } else {
               cityCode = areaCode;
            }
            // 遍历树形数据
            this.queryCityDataValue(cityCode, this.cityList);
         });
      },

      // 匹配城市数据
      queryCityDataValue(id, list) {
         for (let i = 0; i < list.length; i++) {
            if (id == list[i].citycode) {
               this.cityTitle = list[i].cityname || "城市";
               this.city = list[i].citycode;
               return;
            }
            if (list[i].children && list[i].children.length) {
               this.queryCityDataValue(id, list[i].children);
            }
         }
      },

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

      // 切换区域
      changeCityDropDown(value) {
         // 获取选中值
         let selectValue = value.selectedOptions[value.selectedOptions.length - 1];
         // 赋值title
         this.cityTitle = selectValue?.cityname;
         // 逻辑控制传参
         this.triggerEvent("dropCitycode", { citycode: selectValue?.citycode });
      },
      // 切换组织类型
      changeTypeDropDown(value) {
         console.log("切换组织类型--->", value);
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
         console.log("过滤数据--->", value);
         let row = dataList.filter((item) => {
            return item.value == value;
         });
         return row[0].text;
      },

      // 触发动作
      do_EventCenter_changeFormulaArea({ value }) {
         console.log("触发动作---->", value);
         this.getCityData(value);
         // 添加默认区域
         this.city = value;
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
