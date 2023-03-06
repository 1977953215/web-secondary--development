import request from "./request";

export const queryCurrentUser = () =>
   request.get(`/system/authority/user`, {
      useCache: true,
      cacheDuration: 3000,
   });

// 获取sso配置
export const isSso = (ssoType) => request.get(`/sso/server/isSso?ssoType=${ssoType}`);

export const queryAll = () => request.get("/system/property/queryAll");

export const ssoLoginNew = (params) => request.post(`/sso/server/login?ssoType=${params?.ssoType}&token=${params?.token}&tenant=${params?.tenant}`);

export const tokenIsValid = (token) => request.get(`ext/sso/app/token/validation?token=${token}`);

export const setCookie = (token) => request.get("system/authority/setCookie?token=" + token);
