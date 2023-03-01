import Utils from "../index.js"
import adapter from "./adapter.js"
import getPluginType from "./getPluginType.js"

export default function setAttributes(dom, props) {
  const isVue = process.env.CONFIG_JSON ? false : true
  const pluginType = getPluginType()
  let { customConfig, customOptions, type } = adapter(props, pluginType)
  const configJson = require("../../../pluginTemp/config.json")
  if (pluginType === "bigscreen" || pluginType === "analyzer") {
    customConfig = customOptions
  }
  //内部使用，需求编号，不需要可去掉，用来将需求编号和开发者打到dom元素上，方便以后处理问题
  const requirementNum = configJson["requirement-number"] === "需求编号"
    ? ""
    : `${configJson["requirement-number"]}-`

  const domSymbol = customConfig?.id
    ? `${pluginType}-${type}-secondary-${requirementNum}${customConfig.id}`
    : `${pluginType}-${type}-secondary-${requirementNum}${Utils.tools.generateUUID()}`
  const developers = process.env[`${isVue ? "VUE" : "REACT"}_APP_DEVELOPERS`]
  let className = dom.className
  className = className ? `${className} ${domSymbol}` : domSymbol
  dom.setAttribute("class", className)
  dom.setAttribute("developers", developers)
  if (process.env.NODE_ENV === "production" && type != "designConfiguration") {
    console.log(`%c需求编号:%c${configJson["requirement-number"]}%c\n开发者：%c${developers}\n%c二开区域：`, "font-size:18px;color:skyblue", "font-size:18px;color:lightpink", "font-size:18px;color:skyblue", "font-size:18px;color:red", "font-size:18px;color:skyblue", dom)
  }
  return adapter(props, pluginType)
}
