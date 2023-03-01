<script>
import { DesignConfiguration, Main } from "./components";
export default {
   name: "App",

   components: { DesignConfiguration, Main },

   props: {
      customConfig: Object,
      info: Object,
      appVariables: Array,
      sysVariables: Array,
      themeInfo: Object,
      intlGetKey: Function,
      history: Object,
      funcRef: Object,
      isConfig: Boolean,
      onConfigChange: Function,
      mainInit: Function,
   },
   data() {
      return {};
   },

   mounted() {},

   methods: {},

   beforeDestroy() {},

   render(h) {
      let props = this._props;
      if (this.isConfig) {
         props.changeCustomConfig = props.onConfigChange;
         return <DesignConfiguration {...{ props }} />;
      } else {
         props.mainInit = this.mainInit;
         return <Main {...{ props }} />;
      }
   },
};
</script>
