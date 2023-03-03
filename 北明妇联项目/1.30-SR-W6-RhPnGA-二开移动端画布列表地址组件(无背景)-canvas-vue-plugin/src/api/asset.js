import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 *
 */
 export const jsSdkConfig = (params) => request.get(`/ext/js-sdk?url=${params.url}`);
