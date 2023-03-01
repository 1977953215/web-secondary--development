// 组件可派发事件
export const events = [
   {
      key: "formulaCitycode",
      name: "公示-切换城市",
      payload: [
         {
            name: "城市",
            key: "citycode",
            dataType: "string",
         },
      ],
   },
];

// 组件可接收事件
export const actions = [
   
];

export default {
   actions,
   events,
};
