import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 *
 */
export const queryAssetById = (id) => request.post(`/asset/getAssetData?asset_id=${id}&count=${99999}`, { filters: [] });

export const queryAreaByApi = () => request.post(`/dataservice/test/api?api_id=1bd16ede-9bf6-4759-8c58-7fbdce1e2158`, {});

export const jsSdkConfig = (url) => request.get(`ext/js-sdk?url=${url}`);

export const queryAddress = (loglat) => request.get(`ext/locating/queryAddressByCoordinate?coordinate=${loglat}`);

// 获取城市数据
// export const queryCityData = () => request.post(`service/dataapi/rest/e2159396-d7c3-4115-95ab-3fdefa85c5be`, {});

// 获取城市数据接口
export const queryCityData = (dataForm) => request.post(`/ext/queryAsset/queryByAssetId?assetId=ab367a9e-de90-44de-9f7c-4c835941c886`, dataForm);

// 获取类型数据
// export const queryTypeData = (dataForm) => request.post(`service/dataapi/rest/72cbd539-2460-447b-bdfe-dfeb2e36be2e`, dataForm);

export const queryTypeData = (dataForm) => request.post(`/ext/queryAsset/queryByAssetId?assetId=64c4b0e0-4d4f-ea0a-49f1-70de1fc941f6`, dataForm);
