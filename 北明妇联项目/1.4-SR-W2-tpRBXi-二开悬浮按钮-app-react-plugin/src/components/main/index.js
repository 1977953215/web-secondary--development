import React, { Component } from "react";
import './index.less'
import dome from '../../api/demo2.png'
export default class Main extends Component {
  state = {
    id: "",
    number: 1

  };

  componentDidMount() {
    //封装平台方法
    //同时封装外层dom id为需求编号，初始化事件注册，重要勿删
    this.props.mainInit && this.props.mainInit(this);
    this.initComData();
  }

  initComData = () => {
    const { customConfig } = this.props;
    customConfig.number && this.setState({ number: customConfig.number });
  };

  Event_Center_getName() {
    return this.state.id;
  }

  /**
   * 用于触发事件方法，window.eventCenter?.triggerEvent封装了一层，
   * @param {String} eventName 事件名
   * @param {Array} payload 事件传参
   *
   */
  triggerEvent = (eventName, payload) => {
    const componentId = this.props.componentId || this.props?.customConfig.componentId;
    componentId && window.eventCenter?.triggerEvent(
      componentId,
      eventName,
      //payload需为一个object
      payload
    );
  };
  handleClick = () => {
    console.log(this);
    this.triggerEvent("click", { value: "123" });
  };

  render() {
    const { customConfig = {} } = this.props
    const { height = '600px', img = {} } = customConfig
    return (

      <div
        className="app-secondary fixed_img"
        style={{ top: height }}
        id={this.state.id}
        onClick={() => { this.handleClick() }}
      >
        <img src={
            (window?.configuration?.system_resource_access_prefix
              ? window?.configuration?.system_resource_access_prefix
              : "") + (img.img || dome)
          } width='100%' height='100%' />
        {/* 以下为样例，正式开发请去除相关代码 */}
        {/* {this.state.number}
        <button onClick={this.handleClick}>测试逻辑控制</button> */}
      </div>
    );
  }
}
