import Utils from "@/utils/index.js"
import eventActionDefinitions from "@/components/main/eventActionDefinitions.js"

const configJson = require("../../pluginTemp/config.json")
export default {
  data() {
    return {}
  },
  props: {
    componentId: String
  },
  mounted() {
    const { componentId } = this
    window.componentCenter?.register(componentId, "comp", this, eventActionDefinitions)
  },
  methods: {
    Event_Center_getName() {
      const requirementNumber = configJson["requirement-number"] === "需求编号"
        ? "" : configJson["requirement-number"]
      return this.customConfig.id || requirementNumber || Utils.tools.generateUUID()
    },
    /**
     * 用于触发事件的方法，window.eventCenter?.triggerEvent封装了一层
     * @param {String} eventName 事件名
     * @param {Object} payload 事件传参
     * @example
     * triggerEvent("click",{value:"123"})
     *
     */
    triggerEvent(eventName, payload) {
      this.componentId && window.eventCenter?.triggerEvent(
        this.componentId,
        eventName,
        //payload需为一个object
        payload
      )
    }
  },
  beforeDestroy() {
    window.componentCenter?.removeInstance(this.componentId)
  }
}