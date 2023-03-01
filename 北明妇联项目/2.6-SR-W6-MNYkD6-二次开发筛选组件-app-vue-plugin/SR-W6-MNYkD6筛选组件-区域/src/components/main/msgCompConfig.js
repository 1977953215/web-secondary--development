// 组件可派发事件
export const events = [
   {
      key: "dropCitycode",
      name: "下拉菜单-区域",
      payload: [
         {
            name: "区域",
            key: "citycode",
            dataType: "string",
         },
      ],
   },
   {
      key: "dropOrganizationType",
      name: "下拉菜单-组织类型",
      payload: [
         {
            name: "组织类型",
            key: "organizationType",
            dataType: "string",
         },
      ],
   },
   {
      key: "dropDistance",
      name: "下拉菜单-距离",
      payload: [
         {
            name: "距离",
            key: "distance",
            dataType: "number",
         },
      ],
   },
   {
      key: "dropSort",
      name: "下拉菜单-排序",
      payload: [
         {
            name: "排序",
            key: "sort",
            dataType: "number",
         },
      ],
   },
];

// 组件可接收事件
export const actions = [
   {
      key: "changeFormulaArea",
      name: "切换公示区域",
      params: [
         {
            key: "value",
            name: "cityCode",
            dataType: "string",
         },
      ],
   },
];

export default {
   actions,
   events,
};
