import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 *
 */
export const queryAssetById = (id, count = 200) => request.post(`/asset/getAssetData?asset_id=${id}&count=${count}`, { filters: [] });

// 获取城市数据
// export const queryCityData = () => request.post(`service/dataapi/rest/e2159396-d7c3-4115-95ab-3fdefa85c5be`, {});

// 获取城市数据接口
export const queryCityData = (dataForm) => request.post(`/ext/queryAsset/queryByAssetId?assetId=ab367a9e-de90-44de-9f7c-4c835941c886`, dataForm);

export const queryAreaData = () => request.post(`/service/dataapi/rest/2eaec0f7-ad17-4682-afd2-1d5aa8433c40`, {});
