// import Vue from "vue";
import App from "./App.vue";
import MsgCompConfig from "./components/main/msgCompConfig.js";
import { Development } from "@/components/index.js";
import Utils from "@/utils/index.js";
import configJson from "../pluginTemp/config.json";
// const Vue = window.Vue;
// Vue.prototype.wx = wx;
const mainInit = (Main) => {
  const { componentId } = Main.customConfig;
  componentId && window?.componentCenter?.register(componentId, "comp", Main, MsgCompConfig);
  const customConfig = Main.customConfig;
  //内部使用，需求编号，不需要可去掉，用来将需求编号打到dom元素上，方便以后处理问题
  const requirementNum = configJson["requirement-number"] === "需求编号" ? "" : configJson["requirement-number"];
  const id = customConfig?.id ? `app_secondary_${requirementNum}_${customConfig.id}` : `app_secondary_${requirementNum}_${Utils.generateUUID()}`;
  Main.id = id;
};
if (process.env.NODE_ENV !== "production") {
  new Vue({
    render: (h) => <Development mainInit={mainInit} />,
  }).$mount("#app");
} else {
  if (!window.CUSTOM_PLUGIN) {
    window.CUSTOM_PLUGIN = new Map();
  }
  window.CUSTOM_PLUGIN.set(process.env.VUE_APP_CUSTOM_PLUGIN_ID, (dom, props, context, eventBus) => {
    if (!window.VueRef) {
      window.VueRef = loadScript("/static/vue.min.js").then(() => {
        return Promise.all([loadScript("/static/element-ui/index.js"), loadScript("/static/vant/vant.min.js")]);
      });
      loadStyle("/static/element-ui/theme-chalk/index.min.css");
      loadStyle("/static/vant/lib/index.css");
    }
    window.VueRef.then(() => {
      props.mainInit = mainInit;
      run(dom, props);
    });
  });
}

function loadScript(url) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  return new Promise((resolve) => {
    if (script.readyState) {
      //IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          resolve();
        }
      };
    } else {
      //Others
      script.onload = function () {
        resolve();
      };
    }
    script.src = url;
    document.head.appendChild(script);
  });
}

// 动态记载样式
function loadStyle(url) {
  var style = document.createElement("link");
  style.href = url;
  style.type = "text/css";
  style.rel = "stylesheet";

  document.head.appendChild(style);
}
function run(dom, props) {
  if (dom.childNodes.length > 0) {
    dom.removeChild(dom.childNodes[0]);
  }
  const div = document.createElement("div");
  dom.appendChild(div);
  new Vue({
    render: (h) => <App {...{ props }} />,
  }).$mount(div);
}
