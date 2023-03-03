// 组件可派发事件
export const events = [];

// 组件可接收事件
export const actions = [
   {
      key: "validateForm",
      name: "校验表单",
      isSupportChild: true, // 是否支持子表
      hasReturn: true,
      params: [
         {
            key: "value",
            name: "校验表单",
            dataType: "string",
         },
      ],
      returns: [
         {
            key: "isSave",
            name: "校验是否成功",
            dataType: "string",
         },
      ],
   },
];

export default {
   actions,
   events,
};
