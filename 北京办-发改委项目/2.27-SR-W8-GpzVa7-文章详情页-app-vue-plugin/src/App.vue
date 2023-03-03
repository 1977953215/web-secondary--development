<script>
import { DesignConfiguration, Main } from "./components";
export default {
   name: "App",
   components: { DesignConfiguration, Main },
   props: {
      customConfig: Object,
      changeCustomConfig: Function,
      info: Object,
      appVariables: Array,
      sysVariables: Array,
      themeInfo: Object,
      intlGetKey: Function,
      history: Object,
      funcRef: Object,
      type: String,
      componentId: String,
   },
   data() {
      return {};
   },
   computed: {},
   watch: {},
   created() {},
   mounted() {},
   beforeDestroy() {},
   methods: {},
   render(h) {
      const renderhMap = {
         main: Main,
         designConfiguration: DesignConfiguration,
      };
      const Comp = renderhMap[this.type];
      return <Comp {...{ props: this._props }} />;
   },
};
</script>
