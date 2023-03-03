import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 *
 */
export const requeryAddressByCoordinate = (params) => request.get(`/ext/locating/queryAddressByCoordinate?coordinate=${params.coordinate}`);
export const queryAddressByCoordinate = (params) => request.get(`/ext/locating/queryCoordinateByAddress?address=${params.address}`);
export const jsSdkConfig = (params) => request.get(`/ext/js-sdk?url=${params.url}`);
// 获取城市数据接口
export const catalog = (dataForm) => request.post(`/ext/queryAsset/queryByAssetId?assetId=ab367a9e-de90-44de-9f7c-4c835941c886`, dataForm);
