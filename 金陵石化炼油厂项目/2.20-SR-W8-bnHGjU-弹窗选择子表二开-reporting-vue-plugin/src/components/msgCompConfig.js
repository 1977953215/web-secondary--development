// 组件可派发事件
export const events = [];

// 组件可接收事件
export const actions = [
   {
      key: "getParentID",
      name: "表ID",
      isSupportChild: true, // 是否支持子表
      params: [
         {
            key: "dataId",
            name: "主键",
            dataType: "string",
         },
         {
            key: "assetId",
            name: "资产",
            dataType: "string",
         },
      ],
   },
   {
      key: "validateForm",
      name: "校验表单",
      isSupportChild: true, // 是否支持子表
      params: [
         {
            key: "value",
            name: "值",
            dataType: "string",
         },
      ],
   },
   {
      key: "pushData",
      name: "传入数据",
      isSupportChild: true, // 是否支持子表
      params: [
         {
            key: "value",
            name: "值",
            dataType: "objectArray",
         },
      ],
   },
];

export default {
   actions,
   events,
};
