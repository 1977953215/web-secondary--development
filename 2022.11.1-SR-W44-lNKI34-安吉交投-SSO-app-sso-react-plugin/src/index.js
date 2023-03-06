// import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";

const { React } = window.React;
const { ReactDOM } = window.ReactDOM;

if (process.env.NODE_ENV !== "production") {
   require("antd/dist/antd.css");
   ReactDOM.render(<App />, document.getElementById("root"));
} else {
   if (!window.CUSTOM_PLUGIN) {
      window.CUSTOM_PLUGIN = new Map();
   }
   window.CUSTOM_PLUGIN.set(process.env.CUSTOM_PLUGIN_ID, (dom, props) => {
      ReactDOM.render(<App {...props} />, dom);
   });
}
