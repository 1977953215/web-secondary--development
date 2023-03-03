// import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { Row, Col, Modal, Button } from "antd";
import "./index.less";
const React = window.React;
const { useEffect, useState  } = React
const { Row, Col, Modal, Button } = window.antd;

const List = ({ dataSource, customParams, dataId, deleteData }) => {
  let { column, keyName, goURL } = customParams;
  console.log(dataSource, customParams);
  useEffect(() => {
    let filed = dataSource[Number(column) - 1].value.value;
    window.open(`${goURL}${goURL.indexOf("?") !== -1 ? "&" : "?"}${keyName}=${filed}`);
  }, []);

  return <></>;
};

List.propTypes = {
  isDesign: PropTypes.bool,
  tableColumns: PropTypes.array,
  modelInfo: PropTypes.object,
};

export default List;
