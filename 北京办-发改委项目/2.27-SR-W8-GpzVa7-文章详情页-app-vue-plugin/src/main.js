import Vue from "vue";
import App from "./App.vue";
import { Development } from "@/components/index.js";
import setAttributes from "@/utils/handlePlatform/setAttributes.js";

Vue.config.productionTip = false;
Vue.config.devtools = true;

import { Button, Breadcrumb, BreadcrumbItem, Message, Form, FormItem, Input } from "element-ui";
Vue.use(Button);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.prototype.$message = Message;

const configJson = require("../pluginTemp/config.json");
if (process.env.NODE_ENV !== "production") {
   new Vue({
      render: (h) => <Development />,
   }).$mount("#app");
} else {
   if (!window.CUSTOM_PLUGIN) {
      window.CUSTOM_PLUGIN = new Map();
   }
   window.CUSTOM_PLUGIN.set(configJson.id, (dom, props, context, eventBus) => {
      if (dom.childNodes.length > 0) {
         dom.removeChild(dom.childNodes[0]);
      }
      props = setAttributes(dom, props);
      props.eventBus = eventBus;
      const div = document.createElement("div");
      dom.appendChild(div);
      new Vue({
         render: (h) => <App {...{ props }} />,
      }).$mount(div);
   });
}
