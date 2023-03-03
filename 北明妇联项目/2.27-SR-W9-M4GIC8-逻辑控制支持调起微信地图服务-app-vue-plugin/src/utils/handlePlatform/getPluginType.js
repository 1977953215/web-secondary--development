export default () => {
  const configJson = require("../../../pluginTemp/config.json")
  const pluginType = configJson.type === "app"
    ? configJson.props.type === "customize" ? "app" : configJson.props.type
    : configJson.type
  return pluginType
}
