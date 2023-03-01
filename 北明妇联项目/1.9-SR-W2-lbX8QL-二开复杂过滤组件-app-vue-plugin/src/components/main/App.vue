<template>
   <div :id="id" ref="app-secondary" class="app-secondary outermest_filter">
      <!-- <van-dropdown-menu active-color="#1989fa" :overlay="true" close-on-click-overlay id="dropdown_menu">
         <van-dropdown-item :title="cityTitle" class="dropdown_city">
            <van-cell center>
               <template #right-icon>
                  <van-cascader v-model="city" :options="cityList" :show-header="false" :field-names="fieldNames" @change="changeCityDropDown" />
               </template>
            </van-cell>
         </van-dropdown-item>
         <van-dropdown-item :title="typeTitle" v-model="type" :options="typeList" @change="changeTypeDropDown" />
         <van-dropdown-item :title="dateTitle" v-model="date" :options="dateList" @change="changeDateDropDown" />
      </van-dropdown-menu> -->

      <van-dropdown-menu active-color="#1989fa" :overlay="false" close-on-click-overlay>
         <van-dropdown-item :title="cityTitle" @open="openDropMenu('city')" />
         <van-dropdown-item :title="typeTitle" @open="openDropMenu('type')" />
         <van-dropdown-item :title="dateTitle" @open="openDropMenu('date')" />
      </van-dropdown-menu>

      <van-popup v-model="popupIsShow" round position="bottom">
         <van-cascader v-if="cascaderType == 'city'" v-model="city" :show-header="false" :options="cityList" :field-names="fieldNames" @change="changeCityDropDown" />
         <van-cascader v-if="cascaderType == 'type'" v-model="type" :show-header="false" :options="typeList" @change="changeTypeDropDown" />
         <van-cascader v-if="cascaderType == 'date'" v-model="date" :show-header="false" :options="dateList" @change="changeDateDropDown" />
      </van-popup>
   </div>
</template>

<script>
import "./app.less";
import { queryCityData, queryTypeData } from "../../api/asset";

import VConsole from "vconsole";

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
      appVariables: Array,
      changeAppVariables: Function,
   },

   data() {
      return {
         id: "",

         city: "",
         cityTitle: "城市",
         cityList: [],

         // 级联选择器字段
         fieldNames: {
            text: "cityname",
            value: "citycode",
            children: "children",
         },

         type: "",
         typeTitle: "类型",
         typeList: [],

         date: "",
         dateTitle: "时间",
         dateList: [
            { text: "无", value: "clear" },
            { text: "近一个月", value: "0" },
            { text: "近三个月", value: "1" },
            { text: "近半年", value: "2" },
         ],

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
      // 获取类型数据
      this.getTypeData();
   },

   methods: {
      // 数据转换
      translatePlatformDataToJsonArray(originTableData) {
         let originTableHeader = originTableData.data[0];
         let tableHeader = [];
         originTableHeader.forEach((item) => {
            tableHeader.push(item.col_name);
         });
         let tableBody = originTableData.data[1];
         let tableData = [];
         tableBody.forEach((tableItem) => {
            let temp = {};
            tableItem.forEach((item, index) => {
               temp[tableHeader[index]] = item;
            });
            tableData.push(temp);
         });
         return tableData;
      },

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
               console.log("复杂过滤组件-已过期");
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
               console.log("复杂过滤组件-未过期");
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
                     if (item.name == "citycode") {
                        cityCode = item.default_value;
                     }
                  });
                  console.log("<---复杂过滤组件-应用变量--->", this.cityValue);
               }
            } else {
               cityCode = areaCode;
            }

            // // 默认选中
            // this.city = cityCode;

            // // 添加默认名称
            // this.cityTitle =
            //    this.cityList.filter((item) => {
            //       return item.citycode == cityCode;
            //    })[0]?.cityname || "城市";

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

      // 获取类型数据
      getTypeData() {
         let dataForm = {
            queryCondition: {
               queryColumns: ["type_name", "data_id"],
               queryParams: [],
               orderBy: "type_name",
               orderSort: "DESC",
            },
         };
         queryTypeData(dataForm).then((res) => {
            let dataList = [];
            res.data.results.forEach((item) => {
               dataList[item.sort] = {
                  text: item.type_name,
                  value: item.data_id,
               };
            });
            dataList.unshift({ text: "无", value: "clear" });

            this.typeList = dataList.filter(Boolean);

            console.log("dataList", this.typeList);

            if (this.urlSearch.typevalue) {
               this.type = this.urlSearch.typevalue;
               this.typeTitle =
                  this.typeList.filter((item) => {
                     return item.value == this.urlSearch.typevalue;
                  })[0]?.text || "类型";
            }
         });
      },

      // 切换城市
      changeCityDropDown(value) {
         this.cityTitle = value.selectedOptions[value.selectedOptions.length - 1].cityname;
         this.triggerEvent("dropCitycode", { citycode: value.value });
      },
      // 切换类型
      changeTypeDropDown(value) {
         if (value.value == "clear") {
            this.type = "";
            this.typeTitle = "类型";
            this.triggerEvent("dropTypevalue", { typevalue: null });
            this.changeAppVariables(null, "citytype2");
            console.log("修改应用变量(citytype2)：", null);
            return;
         }
         this.typeTitle = this.typeList.filter((item) => {
            return item.value == value.value;
         })[0]?.text;
         this.triggerEvent("dropTypevalue", { typevalue: value.value });
      },
      // 切换日期
      changeDateDropDown(value) {
         if (value.value == "clear") {
            this.date = "";
            this.dateTitle = "时间";
            this.triggerEvent("dropTime", { starttime: null, endtime: null });
            this.changeAppVariables(null, "starttime2");
            this.changeAppVariables(null, "endtime2");
            console.log("修改应用变量(starttime2)：", null);
            console.log("修改应用变量(endtime2)：", null);
            return;
         }

         this.dateTitle = this.dateList.filter((item) => {
            return item.value == value.value;
         })[0].text;

         let timeValue = { starttime: "", endtime: "" };

         if (this.dateTitle == "近一个月") {
            timeValue.starttime = this.getDateTime(1).starttime;
            timeValue.endtime = this.getDateTime(1).endtime;
         } else if (this.dateTitle == "近三个月") {
            timeValue.starttime = this.getDateTime(3).starttime;
            timeValue.endtime = this.getDateTime(3).endtime;
         } else if (this.dateTitle == "近半年") {
            timeValue.starttime = this.getDateTime(6).starttime;
            timeValue.endtime = this.getDateTime(6).endtime;
         }

         this.triggerEvent("dropTime", { starttime: timeValue.starttime, endtime: timeValue.endtime });
      },

      // 获取日期时间
      getDateTime(n) {
         let end = new Date();
         let year = end.getFullYear();
         let month = end.getMonth() + 1;
         let day = end.getDate();

         let dateObj = {};
         dateObj.end = year + "-" + month + "-" + day;

         let endMonthDay = new Date(year, month, 0).getDate(); //当前月的总天数

         if (month - n <= 0) {
            let startMonthDay = new Date(year - 1, 12 - (n - parseInt(month)), 0).getDate();
            if (startMonthDay < day) {
               dateObj.start = year - 1 + "-" + (12 - (n - month)) + "-" + startMonthDay;
            } else {
               dateObj.start = year - 1 + "-" + (12 - (n - month)) + "-" + day;
            }
         } else {
            let startMonthDay = new Date(year, parseInt(month) - n, 0).getDate();
            if (startMonthDay < day) {
               if (day < endMonthDay) {
                  dateObj.start = year + "-" + (month - n) + "-" + (startMonthDay - (endMonthDay - day));
               } else {
                  dateObj.start = year + "-" + (month - n) + "-" + startMonthDay;
               }
            } else {
               dateObj.start = year + "-" + (month - n) + "-" + day;
            }
         }

         return {
            starttime: Date.parse(new Date(dateObj.start)),
            endtime: Date.parse(new Date(dateObj.end)),
         };
      },

      // 展开下拉菜单
      openDropMenu(menuType) {
         // 改变弹出层类型
         this.cascaderType = menuType;
         // 打开弹出层
         this.popupIsShow = true;
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

<style lang="less"></style>
