<script>
import {
  DesignConfiguration,
  Main
} from "./components";

export default {
  name: "App",
  components: { DesignConfiguration, Main },
  props: {
    formListModelVariableList: Object,
    configuration: Object,
    type: String,
    changeConfiguration: Function,
    componentId: String,
    record: Object,
    value: String,
    mainInit: Function
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {},
  render(h) {
    let props = this._props;
    if (this.type == "designConfiguration") {
      props.changeCustomConfig = props.changeConfiguration;
      props.customConfig = JSON.parse(props.configuration)
      return <DesignConfiguration {...{ props }} />;
    } else {
      props.customConfig = props.configuration;
      return <Main {...{ props }} />;
    }
  }
};
</script>
