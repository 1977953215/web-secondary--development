const handleFunc = {
  analyzer: (props) => {
    let { type } = props
    props.type = type || "main"
    if (type === "designConfiguration") {
      !props.configuration.analyzer_secondary_configuration && (props.configuration.analyzer_secondary_configuration = "{}")
      props.customConfig = JSON.parse(props.configuration.analyzer_secondary_configuration)
      props.changeCustomConfig = (customConfig) => {
        props.configuration.analyzer_secondary_configuration = JSON.stringify(customConfig)
        props.changeConfiguration(props.configuration)
      }
    } else {
      !props.options.analyzer_secondary_configuration && (props.options.analyzer_secondary_configuration = "{}")
      props.customConfig = JSON.parse(props.options.analyzer_secondary_configuration)
      props.customOptions = props.options?.externalVariables || {}
    }
    return props
  },
  bigscreen: (props) => {
    props.type = props.type || "main"
    let handleConfiguration = () => {
      const dataConfig = props.block?.dataConfig || {}
      const { pluginOptions = {}, columns } = dataConfig
      pluginOptions.columns = columns
      return pluginOptions
    }
    let changeCustomConfig = (pluginOptions) => {
      if (props.bigscreen && props.block) {
        const {
          bigscreen: { updateBlockById, pluginDetailMap }, block: {
            baseConfig: { id }
          }
        } = props
        updateBlockById(id, { dataConfig: { pluginOptions: { ...pluginOptions } } })
        pluginDetailMap[`${id}-default`].detail.ref.current.run()
      } else {
        console.log("暂时无此方法，请升级平台版本")
      }
    }
    delete props.customConfig
    props = { ...props, customConfig: handleConfiguration() }
    if (props.type !== "main") {
      props = { ...props, changeCustomConfig }
    } else {
      props.customOptions = props.options?.externalVariables || {}
    }
    return props
  },
  reporting: (props) => {
    props.customConfig = props.configuration ? JSON.parse(props.configuration) : {}
    props.changeConfiguration && (props.changeCustomConfig = props.changeConfiguration)
    return props
  },
  app: (props) => {
    const { isConfig } = props
    props.type = isConfig ? "designConfiguration" : "main"
    isConfig && (props.changeCustomConfig = props.onConfigChange)
    props.componentId = props.customConfig.componentId
    return props
  },
  "app-sso": (props) => {
    return props
  },
  "app-tabs": (props) => {
    return props
  },
  assets: (props) => {
    return props
  },
  canvas: (props) => {
    props.type = (props.type === "designConfiguration" ? "designConfiguration" : "main")
    props.changeConfiguration && (props.changeCustomConfig = props.changeConfiguration)
    if (props.type === "designConfiguration") {
      props.customConfig = JSON.parse(props.configuration)
    } else {
      props.customConfig = props.configuration
    }
    return props
  },
  "data-form-list": (props) => {
    return props
  },
  "list-custom-btn": (props) => {
    return props
  },
  head: (props) => {
    return props
  },
  login: (props) => {
    return props
  },
  navigation: (props) => {
    return props
  }
}
/**
 * 将各个二开类型的props入参，统一API命名输出,将用户配置项参数统一命名为customConfig
 * @param props 二开入参
 * @param pluginType 二开类型
 * @return {}
 */

export default function adapter(props, pluginType) {
  if (handleFunc.hasOwnProperty(pluginType) && process.env.NODE_ENV === "production") {
    props = handleFunc[pluginType](props)
  }
  return props
}
