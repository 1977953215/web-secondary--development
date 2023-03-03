import Vue from "vue";
import App from "./App.vue";
// 按需引入组件，引入方式见https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru
import "./index.css";
const configJson = require("../pluginTemp/config.json");
Vue.config.productionTip = false;

import { Input, Select, Option, Form, FormItem, RadioGroup, RadioButton, Switch, Table, TableColumn, Button, Popconfirm, Dialog, Row, Col, Pagination, Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Switch);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Popconfirm);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Col);
Vue.use(Pagination);
Vue.prototype.$message = Message;

// import Element from "element-ui";
// Vue.use(Element);

if (process.env.NODE_ENV !== "production") {
   const appArr = [
      { title: "新增/编辑 主表组件", type: "add" },
      // { title: "设计页组件", type: "set" },
      { title: "详情页组件", type: "Preview" },
   ];

   const customConfig = {
      componentId: "111",
      data: "111",
      saveValue: [],
      component: {
         columnStyle: {
            title: "二开测试title",
         },
      },

      formConfig: {
         form_name: "二开数据",
      },
      onChange: (values) => {
         // console.log(values);
      },
      changeConfiguration: (values) => {
         // console.log(values);
      },
      configuration: "",
   };

   new Vue({
      render: (h) => {
         return (
            <div class="app-container">
               {appArr.map((item, index) => {
                  return (
                     <div class="components">
                        <div class="title">{item.title}：</div>
                        <App style={{ width: "calc(100% - 220px)" }} customConfig={customConfig} type={item.type} />
                     </div>
                  );
               })}
            </div>
         );
      },
   }).$mount("#app");
} else {
   if (!window.CUSTOM_PLUGIN) {
      window.CUSTOM_PLUGIN = new Map();
   }

   window.CUSTOM_PLUGIN.set(configJson.id, (dom, props) => {
      if (dom.childNodes.length == 0) {
         const div = document.createElement("div");
         dom.appendChild(div);
         new Vue({
            render: (h) => <App type={props.type} customConfig={props || {}} />,
         }).$mount(div);
      }
   });
}
