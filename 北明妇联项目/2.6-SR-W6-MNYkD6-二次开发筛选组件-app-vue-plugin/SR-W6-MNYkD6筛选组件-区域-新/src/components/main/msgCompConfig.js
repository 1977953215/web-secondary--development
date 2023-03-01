// 组件可派发事件
export const events = [
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
export const actions = [];

export default {
   actions,
   events,
};
