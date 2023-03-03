import PropTypes from "prop-types";
import List from "./components/list";
import DesignConfiguration from "./components/designConfiguration";
const React =window.React
const {  useState}  =React
const renderHashMap = {
  list: List,
  designConfiguration: DesignConfiguration,
};

const App = ({ type, ...props }) => {
  let Comp = () => <></>;
  const {
  isDesign,
  pluginId,
  setSetPluginProps, ...restProps} = props;
  console.log('data-form-list', restProps);
  if (renderHashMap[type]) Comp = renderHashMap[type];
  return <Comp {...restProps} />;
};

App.propTypes = {
  type: PropTypes.string,
};

export default App;
