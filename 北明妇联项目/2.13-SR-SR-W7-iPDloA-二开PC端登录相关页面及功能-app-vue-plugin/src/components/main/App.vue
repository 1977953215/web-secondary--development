<template>
  <div :id="id" ref="app-secondary" class="app-secondary" style="height: 100%">
    <div class="bg" v-show="isShowbg"></div>
    <div class="background_Main">
      <div class="login_Box" v-show="!isChooseSystem">
        <div class="login_Box_Forget_Box1" id="login_Box_Forget_Box1" v-show="isShowPasswordBox">
          <svg t="1676449634328" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3676" width="32" height="32">
            <path
              d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m0 170.666667a42.666667 42.666667 0 0 0-42.666667 42.666667v341.333333a42.666667 42.666667 0 0 0 85.333334 0V298.666667a42.666667 42.666667 0 0 0-42.666667-42.666667z m0 554.666667a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z"
              fill="#FAAD14"
              p-id="3677"
            ></path>
          </svg>
          <span>请联系客服重置登录密码<br />电话：<span class="login_Box_Forget_Box1_Phone" @click="showPhone()">通讯录名单</span></span>
        </div>
        <div class="login_Box_Forget_Box2" id="login_Box_Forget_Box2" v-show="isShowPasswordBox2">
          <ul>
            <li v-for="(item, index) in this.addressInfo" :key="index">
              <div>{{ item.name }}</div>
              <div>{{ item.office }}</div>
              <div>{{ item.phone }}</div>
            </li>
          </ul>
        </div>
        <div class="login_Box_Flag">
          <img src="../../../pluginTemp/images/flag.png" alt="" width="64px" height="56px" />
          <span>登录</span>
        </div>
        <div class="login_Box_Logo">
          <img src="../../../pluginTemp/images/logo.png" width="52px" height="80px" alt="" />
        </div>
        <div class="login_Box_Title">
          <span>江苏女性云服务平台</span>
        </div>
        <el-input class="login_Box_Input" style="margin-top: 50px" v-model="loginUserName" placeholder="请输入用户名称">
          <template slot="prepend"
            ><svg t="1676366526649" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5256" width="22" height="22">
              <path
                d="M634.88 576.853333s-3.413333-3.413333-3.413333-6.826666c85.333333-64.853333 133.12-167.253333 133.12-293.546667-3.413333-136.533333-109.226667-242.346667-252.586667-242.346667S262.826667 139.946667 262.826667 279.893333c0 157.013333 68.266667 245.76 129.706666 293.546667 0 0 0 3.413333-3.413333 3.413333-228.693333 37.546667-303.786667 204.8-303.786667 279.893334 0 116.053333 296.96 129.706667 426.666667 129.706666s426.666667-13.653333 426.666667-129.706666c0-71.68-75.093333-238.933333-303.786667-279.893334zM512 921.6c-191.146667 0-348.16-34.133333-358.4-61.44 0-34.133333 44.373333-184.32 256-215.04 30.72-3.413333 47.786667-40.96 51.2-61.44 6.826667-34.133333-10.24-51.2-17.066667-54.613333-75.093333-51.2-112.64-133.12-112.64-245.76C331.093333 177.493333 409.6 102.4 512 102.4s180.906667 75.093333 180.906667 177.493333c0 136.533333-64.853333 211.626667-116.053334 245.76-6.826667 3.413333-23.893333 20.48-17.066666 51.2 3.413333 17.066667 20.48 58.026667 54.613333 64.853334 211.626667 34.133333 256 180.906667 256 215.04-10.24 30.72-167.253333 64.853333-358.4 64.853333z"
                p-id="5257"
                fill="#8FB7BF"
              ></path>
            </svg>
            <div class="login_Box_Input_Line"></div>
          </template>
        </el-input>
        <el-input class="login_Box_Input" type="password" style="margin-top: 20px" v-model="loginPassword" placeholder="请输入登录密码">
          <template slot="prepend"
            ><svg t="1676366526649" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5256" width="22" height="22">
              <path
                d="M916.210526 1024 107.789474 1024C78.012632 1024 53.894737 999.855158 53.894737 970.105263L53.894737 485.052632C53.894737 455.275789 78.012632 431.157895 107.789474 431.157895L188.631579 431.157895 188.631579 323.368421C188.631579 144.761263 333.419789 0 512 0 690.580211 0 835.368421 144.761263 835.368421 323.368421L835.368421 431.157895 916.210526 431.157895C945.987368 431.157895 970.105263 455.275789 970.105263 485.052632L970.105263 970.105263C970.105263 999.855158 945.987368 1024 916.210526 1024ZM781.473684 323.368421C781.473684 174.538105 660.830316 53.894737 512 53.894737 363.169684 53.894737 242.526316 174.538105 242.526316 323.368421L242.526316 431.157895 781.473684 431.157895 781.473684 323.368421ZM916.210526 485.052632 835.368421 485.052632 188.631579 485.052632 107.789474 485.052632 107.789474 970.105263 916.210526 970.105263 916.210526 485.052632ZM512 592.842105C526.874947 592.842105 538.947368 604.914526 538.947368 619.789474L538.947368 835.368421C538.947368 850.243368 526.874947 862.315789 512 862.315789 497.125053 862.315789 485.052632 850.243368 485.052632 835.368421L485.052632 619.789474C485.052632 604.914526 497.125053 592.842105 512 592.842105Z"
                fill="#8FB7BF"
                p-id="3467"
              ></path>
            </svg>
            <div class="login_Box_Input_Line"></div>
          </template>
        </el-input>
        <el-input class="login_Box_Input" style="margin-top: 20px" v-model="loginCode" placeholder="请输入右侧校验码">
          <template slot="prepend"
            ><svg t="1676366526649" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5256" width="22" height="22">
              <path
                d="M888.49 222.686v-31.54l-65.672-0.955h-0.205a465.715 465.715 0 0 1-144.315-31.334c-77.005-31.198-126.294-66.765-126.703-67.107l-39.8-28.672-39.185 28.468c-2.048 1.501-49.903 36.044-126.908 67.31a447.42 447.42 0 0 1-144.52 31.335l-65.877 0.956v378.88c0 87.04 49.834 184.661 137.01 267.81 37.547 35.84 79.258 66.355 120.833 88.2 43.28 22.733 84.24 34.612 118.852 34.612 34.406 0 75.776-12.152 119.603-35.158a547.977 547.977 0 0 0 120.013-87.654 515.209 515.209 0 0 0 96.188-122.88c27.102-49.562 40.823-98.304 40.823-144.999l-0.136-347.204zM510.09 143.428l1.706-1.365 1.775 1.365c5.803 4.165 59.529 41.848 140.356 74.752 79.19 32.086 153.6 35.635 167.663 36.045l2.594 0.068 0.205 315.734c0.137 69.495-42.598 150.186-117.077 221.457C641.57 854.289 563.13 896.478 512 896.478c-23.689 0-55.57-9.899-89.702-27.785a478.822 478.822 0 0 1-105.609-77.278C242.21 720.213 199.475 639.522 199.475 569.89V254.225l2.73-0.136c3.278 0 82.604-1.502 167.664-35.977a739.942 739.942 0 0 0 140.22-74.615v-0.069z"
                p-id="4510"
                fill="#8FB7BF"
              ></path>
              <path
                d="M713.318 368.64a32.222 32.222 0 0 0-45.329 0L449.195 587.435l-93.184-93.116a32.222 32.222 0 0 0-45.33 0 32.222 32.222 0 0 0 0 45.26l115.85 115.85a32.29 32.29 0 0 0 45.328 0L713.32 413.9a32.222 32.222 0 0 0 0-45.33z"
                p-id="4511"
                fill="#8FB7BF"
              ></path>
            </svg>
            <div class="login_Box_Input_Line"></div>
          </template>
          <template slot="append">
            <img :src="loginCodeSrc" alt="" width="78" height="36" @click="getLoginCode" />
          </template>
        </el-input>
        <div class="login_Box_Option">
          <el-checkbox class="login_Box_Check" v-model="isRemember" @change="logChecked">记住密码</el-checkbox>
          <span class="login_Box_Forget" @click="forgetPassword()" id="login_Box_Forget">忘记密码？</span>
        </div>
        <div class="login_Box_Go" @click="goLogin">登录</div>
      </div>
      <div class="login_Choose_Identity" v-show="isChooseSystem" :style="{ justifyContent: !isAllshow ? 'center' : 'space-between' }">
        <div class="login_Choose_Identity_Left" @click="goSystem('left')" v-show="isAllshow">
          <img src="../../../pluginTemp/images/left.png" width="124px" height="124px" alt="" />
          <br />
          <span>江苏女性网后台管理</span>
        </div>
        <div class="login_Choose_Identity_Right" @click="goSystem('right')">
          <img src="../../../pluginTemp/images/right.png" width="124px" height="124px" alt="" />
          <br />
          <span>江苏女性云服务平台</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Icon, Checkbox } from "element-ui";
import Vue from "vue";
import "../../../pluginTemp/font/font.css";
import { getAuthPic, loginAccount, queryUserRole, dataapi } from "../../api/asset";
import JSEncrypt from "./jsencrypt";
import $ from "jquery";
const Base64 = require("js-base64").Base64;
Vue.use(Input);
Vue.use(Icon);
Vue.use(Checkbox);
export default {
  name: "Main",
  props: {
    customConfig: Object,
    info: Object,
    //应用变量和系统变量 2022.7.26 V8R4C50SPC220需求新加 之前版本取不到appVariables和sysVariables
    appVariables: Array,
    sysVariables: Array,
    //2022.8.11 V8R4C60SPC100需求新加，之前版本取不到themeInfo
    themeInfo: Object,
    //2022.10新加，之前取不到国际化方法
    intlGetKey: Function,
    history: Object,
    mainInit: Function,
  },
  computed: {},
  data() {
    return {
      //必需，不可删除
      id: "",
      loginUserName: "",
      loginPassword: "",
      loginCode: "",
      loginCodeSrc: "",
      isRemember: false,
      isShowbg: false,
      addressInfo: [],
      isShowPasswordBox: false,
      isShowPasswordBox2: false,
      isChooseSystem: false,
      isAllshow: false,
    };
  },
  mounted() {
    // 获取电话地址信息
    dataapi().then((res) => {
      this.addressInfo = res.data;
    });
    $(document).click((e) => {
      // 设置目标区域
      var _ele1 = $("#login_Box_Forget_Box1");
      var _ele2 = $("#login_Box_Forget");
      // if (_ele2.is(e.target) && _ele2.has(e.target).length != 0) {
      //   return (this.isShowbg = false);
      // }
      if (!_ele1.is(e.target) && _ele1.has(e.target).length === 0 && !_ele2.is(e.target) && _ele2.has(e.target).length == 0) {
        this.isShowbg = false;
        this.isShowPasswordBox = false;
        this.isShowPasswordBox2 = false;
      }
    });
    //此方法封装了事件注册，不可删除
    this.mainInit(this);
    let username = localStorage.getItem("loginUserName");
    if (username) {
      this.loginUserName = localStorage.getItem("loginUserName");
      this.loginPassword = Base64.decode(localStorage.getItem("pw")); // base64解密
      this.isRemember = true;
    }
    this.getLoginCode();
  },
  methods: {
    goSystem(type) {
      if (type == "left") {
        if (window.configuration?.leftGoUrl) {
          window.location.href = window.location.origin + window.configuration.leftGoUrl;
        }
        // window.location.href =
        //   window.location.origin + "/applicationview/content/view?appid=e8e552c8-41bc-2f7b-bb69-d73a47810fe8&type=view&menuId=2357c3fe-ef64-59cc-0f47-92e83ec87926%233";
      } else {
        if (window.configuration?.rightGoUrl) {
          window.location.href = window.location.origin + window.configuration.rightGoUrl;
        }
        // window.location.href =
        //   window.location.origin + "/applicationview/content/view?appid=e913a367-d40f-cd9d-d5ae-a07a210fdbf5&type=view&menuId=47c7b577-fa42-68da-9370-8b46e3d462cc%233";
      }
    },
    logChecked() {
      // 记住密码
      if (this.isRemember) {
        let password = Base64.encode(this.loginPassword); // base64加密
        localStorage.setItem("loginUserName", this.loginUserName);
        localStorage.setItem("pw", password);
      } else {
        localStorage.removeItem("loginUserName");
        localStorage.removeItem("pw");
      }
    },
    forgetPassword() {
      this.isShowbg = true;
      this.isShowPasswordBox = true;
    },
    showPhone() {
      this.isShowPasswordBox2 = true;
    },
    blurScreen() {
      console.log(9);
    },
    goLogin() {
      this.logChecked();
      let message = {
        account: this.loginUserName,
        imageCode: this.loginCode,
        password: this.Encrypt(this.loginPassword),
        username: this.loginUserName,
      };
      loginAccount(message)
        .then((res) => {
          console.log(res);
          document.cookie = "token=" + res.data.tokenInfo;
          this.isChooseSystem = true;
          queryUserRole().then((resp) => {
            console.log(resp);
            if (resp.data == "true") {
              this.isAllshow = true;
            }
          });
        })
        .catch((err) => {
          if (err.data.code == 100000017) {
            this.getLoginCode();
            this.$message({
              message: "验证码错误",
              type: "error",
            });
          }
          if (err.data.code == 10180033) {
            this.getLoginCode();
            this.$message({
              message: "用户名或密码错误",
              type: "error",
            });
          }
        });
    },
    getLoginCode() {
      getAuthPic().then((res) => {
        const myBlob = new window.Blob([res.data], { type: "image/jpeg" });
        const qrUrl = window.URL.createObjectURL(myBlob);
        this.loginCodeSrc = qrUrl;
      });
    },
    Encrypt(text) {
      const PUBLIC_KEY = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANNmSJW87EE2Z3KDW5Kod8cL + 7lUBgfKLm86CGfMQxvc8w + JnOE7GV72DVyg2kCMGho5g9AR64BmrGobbG4xMZECAwEAAQ ==";
      if (!text) {
        return;
      }
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey("-----BEGIN PUBLIC KEY-----" + PUBLIC_KEY + "-----END PUBLIC KEY-----");
      const encrypted = encrypt.encrypt(text);
      return encrypted.toString();
    },
    /**
     * 用于触发事件的方法，window.eventCenter?.triggerEvent封装了一层，
     * @param {String} eventName 事件名
     * @param {Object} payload 事件传参
     * @example triggerEvent("click",{value:"123"})
     *
     */
    triggerEvent(eventName, payload) {
      let { componentId, appId } = this.customConfig || {};
      componentId && appId && window.eventCenter?.triggerEvent(componentId, eventName, payload);
    },
    //必需，不可删除
    Event_Center_getName() {
      return this.id;
    },
  },
  beforeDestroy() {
    window.componentCenter?.removeInstance(this.customConfig?.componentId);
  },
};
</script>
<style lang="less" scoped>
.bg {
  //设置布局方式为固定定位，充斥整个屏幕
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  //设置背景颜色为0.4透明度的黑色
  background-color: rgba(0, 0, 0, 0.4);
}
.background_Main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url("../../../pluginTemp/images/back.png") 100% 100%;
  .login_Box {
    width: 514px;
    height: 586px;
    // margin-top: 238px;
    position: relative;
    background: #ffffff;
    box-shadow: 0px 5px 30px 0px rgba(40, 49, 81, 0.3);
    border-radius: 8px;
    .login_Box_Flag {
      position: relative;
      left: 30px;
      span {
        position: absolute;
        left: 15px;
        top: 12px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .login_Box_Logo {
      position: relative;
      left: 231px;
      top: -12px;
    }
    .login_Box_Title {
      margin-left: 124px;
      margin-top: 18px;
      span {
        font-size: 28px;
        font-family: ShiShangZhongHeiJianTi !important;
        font-weight: 700;
        color: #333333;
      }
    }
    .login_Box_Go {
      margin-top: 40px;
      width: 370px;
      height: 46px;
      background: linear-gradient(90deg, #5d9ca9 0%, #056c82 100%);
      box-shadow: 0px 2px 15px 1px rgba(6, 108, 131, 0.3);
      margin-left: 72px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      cursor: pointer;
    }
    .login_Box_Option {
      margin-left: 72px;
      margin-top: 20px;
      width: 370px;
      display: flex;
      justify-content: space-between;
      .login_Box_Forget {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #1d7a8d;
        cursor: pointer;
      }
      .login_Box_Check {
        /deep/.is-checked {
          .el-checkbox__inner {
            background: #056c82;
          }
        }
        /deep/.el-checkbox__label {
          color: #333333 !important;
        }
        /deep/.el-checkbox__inner {
          width: 20px;
          height: 20px;
          &:hover {
            border-color: #056c82;
          }
        }
        /deep/.el-checkbox__inner::after {
          height: 12px;
          left: 7px;
          width: 5px;
        }
      }
    }
    .login_Box_Forget_Box1 {
      width: 356px;
      height: 140px;
      background: #ffffff;
      border-radius: 4px;
      position: absolute;
      z-index: 1000;
      left: 79px;
      top: 246px;
      svg {
        position: absolute;
        left: 59px;
        top: 44px;
      }
      span {
        display: block;
        position: absolute;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        left: 110px;
        top: 45px;
        .login_Box_Forget_Box1_Phone {
          display: block;
          text-decoration: underline;
          width: 120px;
          position: absolute;
          left: 40px;
          top: 25px;
          color: #1d7a8d;
          cursor: pointer;
        }
      }
    }
    .login_Box_Forget_Box2 {
      width: 410px;
      height: 420px;
      background: #fff;
      border-radius: 4px;
      position: absolute;
      z-index: 1000;
      left: 450px;
      top: 246px;
      padding: 23px 22px;
      overflow-y: scroll;
      ul {
        padding: 0 !important;
      }
      li {
        list-style: none;
        display: flex;
        justify-content: space-between;
        div {
          width: 33%;
          margin-bottom: 15px;
        }
      }
    }
    .login_Box_Input {
      width: 370px;
      border: 1px solid #dcdcdc;
      margin-left: 72px;
      box-sizing: border-box;
      .login_Box_Input_Line {
        height: 24px;
        border-right: 1px solid #8fb7bf;
        display: inline-table;
        margin-left: 13px;
        margin-top: 3px;
      }
      /deep/.el-input__inner {
        border: 0px solid #dcdcdc;
        padding-left: 5px;
        height: 38px;
      }
      /deep/.el-input-group__append {
        background: #fff;
        border: 0;
        padding: 0 0px;
      }
      /deep/.el-input-group__prepend {
        background: #fff;
        border: 0;
        padding: 0 15px;
      }
    }
  }
  .login_Choose_Identity {
    width: 1148px;
    height: 600px;
    display: flex;
    justify-content: space-between;
    .login_Choose_Identity_Left,
    .login_Choose_Identity_Right {
      width: 514px;
      height: 586px;
      background: #ffffff;
      border-radius: 8px;
      background: url("../../../pluginTemp/images/systemBG.png");
      background-size: 100% 100%;
      cursor: pointer;
      img {
        margin-top: 151px;
        margin-left: 186px;
      }
      span {
        display: block;
        font-size: 28px;
        font-family: ShiShangZhongHeiJianTi !important;
        font-weight: 400;
        color: #333333;
        margin-left: 124px;
        margin-top: 70px;
      }
    }
  }
}
</style>
<style lang="less">
.ant-spin-container {
  height: 100%;
}
</style>
