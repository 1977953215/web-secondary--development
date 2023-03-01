<template>
   <div :id="id" ref="app-secondary" class="app-secondary outermest_publicity">
      <!-- 公示栏 -->
      <el-row class="formula">
         <!-- 公式信息 -->
         <el-col :gutter="20" :span="17">
            <div class="formula_box">
               <div class="text">
                  {{ formulaTitle }}：<span class="number">{{ formulaNumber }} 家</span>
               </div>
               <div class="date">数据更新于{{ formulaDate }}</div>
            </div>
         </el-col>
         <!-- 切换区域 -->
         <el-col :span="7" class="area_select">
            <el-button @click="popupIsShow = true">
               {{ formulaTitle }}
               <div class="triangle"></div>
            </el-button>
            <van-popup v-model="popupIsShow" round position="bottom">
               <van-cascader v-model="cityValue" :options="cityList" title="请选择所在地区" :field-names="fieldNames" @change="changeCityDropDown" />
            </van-popup>
         </el-col>
      </el-row>
      <!-- 过滤条件 -->
      <div class="filter"></div>
   </div>
</template>

<script>
import "./app.less";

// 引入Jquery
import $ from "jquery";

import { queryCityData, queryAreaData } from "../../api/asset";

import moment from "moment";

// import VConsole from "vconsole";

export default {
   name: "Main",

   props: {
      customConfig: Object,
      info: Object,
      appVariables: Array,
      sysVariables: Array,
      themeInfo: Object,
      intlGetKey: Function,
      history: Object,
      mainInit: Function,
   },

   data() {
      return {
         id: "",

         // 选中区域
         cityValue: "",
         // 城市列表
         cityList: [],

         // 区域数据
         areaData: [],

         // 级联选择器字段
         fieldNames: {
            text: "cityname",
            value: "citycode",
            children: "children",
         },

         popupIsShow: false,

         // 标题
         formulaTitle: "城市",
         // 公示数
         formulaNumber: "0",
         // 公示日期
         formulaDate: "",
      };
   },

   mounted() {
      // new VConsole();

      // 事件注册
      this.mainInit(this);

      // 添加选择器图标
      this.$nextTick(() => {
         let oldIcon = $("#select_icon");
         if (oldIcon[0]) oldIcon.remove();
         let icon = $(".el-input__suffix-inner");
         icon.append(`<div id="select_icon" class="triangle"></div>`);
      });

      // 获取区域数据
      this.getCityData();
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
      async getCityData() {
         // 获取区域数据
         await queryAreaData().then((res) => {
            this.areaData = res.data;
            // 获取缓存数据
            let treeData = window.localStorage.getItem("cityDataList");
            // 生成参数
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
                  console.log("筛选组件-公示-已过期");
                  queryCityData(dataForm).then((res) => {
                     // 处理数据
                     this.cityList = this.resetTreeData(res.data.results);
                     // 筛选数据
                     this.addDefaultValue();
                     // 创建缓存数据
                     let localData = {
                        time: moment(new Date()).format("yyyy-MM-DD HH:MM:ss"),
                        data: this.cityList,
                     };
                     // 添加缓存数据
                     window.localStorage.setItem("cityDataList", JSON.stringify(localData));
                  });
               } else {
                  console.log("筛选组件-公示-未过期");
                  this.cityList = JSON.parse(treeData).data;
                  this.addDefaultValue();
               }
            } else {
               // 获取数据
               queryCityData(dataForm).then((res) => {
                  // 处理数据
                  this.cityList = this.resetTreeData(res.data.results);
                  // 筛选数据
                  this.addDefaultValue();
                  // 创建缓存数据
                  let localData = {
                     time: moment(new Date()).format("yyyy-MM-DD HH:MM:ss"),
                     data: this.cityList,
                  };
                  // 添加缓存数据
                  window.localStorage.setItem("cityDataList", JSON.stringify(localData));
               });
            }
         });
      },

      // 添加默认选中
      addDefaultValue() {
         // 添加默认选中
         let appVariablesList = window?.APP_SDK_DATA?.store?.appVariables;
         appVariablesList?.forEach((item) => {
            if (item.name == "officecity") {
               this.cityValue = item.default_value;
            }
         });

         console.log("<---筛选组织-公示-应用变量--->", this.cityValue);

         this.queryCityDataValue(this.cityValue, this.cityList);
      },

      // 匹配城市数据
      queryCityDataValue(id, list) {
         for (let i = 0; i < list.length; i++) {
            if (id == list[i].citycode) {
               // this.formulaTitle = list[i].cityname || "城市";
               this.cityValue = list[i].citycode;

               let code = list[i].citycode;
               // 判断是否是区级
               if (list[i].citycode.length > 4) {
                  code = list[i].citycode.slice(0, 4);
               }

               let data = this.areaData.filter((item) => {
                  return item.citycode == code;
               })[0];

               this.formulaTitle = list[i].cityname || "城市";
               this.formulaNumber = data.num;
               this.formulaDate = data.times;
               return;
            }
            if (list[i].children && list[i].children.length) {
               this.queryCityDataValue(id, list[i].children);
            }
         }
      },

      // 切换区域
      changeCityDropDown(value) {
         console.log("cityValue", value.value);
         // 获取选中值
         let selectValue = value.selectedOptions[value.selectedOptions.length - 1];
         // 赋值title
         this.formulaTitle = selectValue?.cityname;

         // 添加默认
         let code = value.value;
         // 判断是否是区级
         if (value.value.length > 4) {
            code = value.value.slice(0, 4);
         }
         let data = this.areaData.filter((item) => {
            return item.citycode == code;
         })[0];
         this.formulaTitle = data.cityname || "城市";
         this.formulaNumber = data.num;
         this.formulaDate = data.times;
         // 逻辑控制传参
         this.triggerEvent("formulaCitycode", { citycode: selectValue?.citycode });
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
