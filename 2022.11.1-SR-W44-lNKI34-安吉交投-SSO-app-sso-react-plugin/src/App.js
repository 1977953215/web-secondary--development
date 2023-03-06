// import React, { useEffect } from "react";
import { queryCurrentUser, ssoLoginNew, isSso, tokenIsValid, setCookie } from "./api/asset";
import Cookies from "js-cookie";

const { useEffect } = window.React;

const App = (props) => {
   const { loginStatus = () => {}, updateProcess } = props;

   useEffect(() => {
      updateProcess && updateProcess();
      newSsoFuc();
   }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

   const newSsoFuc = async () => {
      console.log("<--进入二开SSO组件-->");

      try {
         const { sso_new_flag } = window.configuration || {};
         const { data } = await queryCurrentUser();

         console.log("用户数据-------->", data);

         if (!data && sso_new_flag?.current_value === "1") {
            const ssoType = getQueryString("ssoType");
            const { data: ssoResult } = await isSso(ssoType);

            console.log("未登录-->", ssoResult);

            // 获取sso配置，存在配置则走sso跳转逻辑，否则走正常跳转逻辑
            if (ssoResult) {
               const { tokenName, ssoType: _ssoType } = ssoResult;
               if (_ssoType === "application") {
                  console.log("<--ssoType验证通过-->");
                  let token = "";
                  // 判断从url或cookies中取token
                  if (ssoResult?.tokenFlag === 1) {
                     token = getQueryString(tokenName);
                  } else if (ssoResult?.tokenFlag === 2) {
                     token = getQueryStringCookies(tokenName);
                  }
                  console.log("<--获取的Token-->", token);

                  // 如果没有token直接跳转配置的地址
                  if (!token) {
                     console.log("<--未获取到token-->");
                     failLogin(ssoResult);
                     return;
                  }

                  // 校验token是否有效
                  tokenIsValid(token)
                     .then((res) => {
                        console.log("<--校验token通过-->");
                        setCookie(token).then(() => {
                           window.SSO_IS_LOGIN = true;
                           loginStatus({ flag: true, ssoResult });
                           console.log("<--设置Cookie完成-->");
                        });
                     })
                     .catch((err) => {
                        console.log("<--登录失败-->");
                        failLogin(ssoResult);
                     });
               } else {
                  failLogin(ssoResult);
               }
            } else {
               failLogin();
            }
         } else {
            console.log("已登录-->", ssoResult);

            const ssoType = getQueryString("ssoType");
            const { data: ssoResult } = await isSso(ssoType);

            if (ssoResult) {
               const { tokenName, ssoType: _ssoType } = ssoResult;

               if (_ssoType === "application") {
                  let token = "";
                  if (ssoResult?.tokenFlag === 1) {
                     token = getQueryString(tokenName);
                  } else if (ssoResult?.tokenFlag === 2) {
                     token = getQueryStringCookies(tokenName);
                  }

                  console.log("<--获取的Token-->", token);

                  if (token) {
                     tokenIsValid(token).then((res) => {
                        setCookie(token).then(() => {
                           window.SSO_IS_LOGIN = true;
                           loginStatus({
                              flag: true,
                              ssoResult,
                           });
                        });
                     });
                  }
               }
            }
         }
      } catch (error) {
         console.log(error);
         failLogin();
      }
   };

   const failLogin = async (ssoResult) => {
      console.log("SSO登录失败!");

      if (ssoResult) {
         loginStatus({
            flag: false,
            ssoResult,
         });
      } else {
         window.location.href = "https://jt-toolkit.ajjtcx.com/";
         // window.location.href = "https://jtdc-ls-toolkit.ajjtcx.com";
      }
   };

   return <></>;
};
export default App;

const getQueryString = (name) => {
   const reg = new RegExp(name + "=([^&]*)(&|$)", "i");
   const r = window.location.search.substr(1).match(reg);
   if (r != null) return r[1];
   return "";
};

const getQueryStringCookies = (name) => {
   return Cookies.get(name);
};
