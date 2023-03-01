import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 *
 */
export const queryAssetById = (id) => request.post(`/asset/getAssetData?asset_id=${id}&count=${99999}`, { filters: [] });

// 获取城市数据
// export const queryCityData = () => request.post(`service/dataapi/rest/e2159396-d7c3-4115-95ab-3fdefa85c5be`, {});

// 获取城市数据接口
export const queryCityData = (dataForm) => request.post(`/ext/queryAsset/queryByAssetId?assetId=ab367a9e-de90-44de-9f7c-4c835941c886`, dataForm);

// 获取组织类型数据
// export const queryTypeData = () => request.post(`/service/dataapi/rest/eb4a2003-f1ef-42eb-8e48-7625e6dee6f0`, {});

export const queryTypeData = (dataForm) => request.post(`/ext/queryAsset/queryByAssetId?assetId=c6f5f1f3-e93a-c069-d424-2baea2aebe20`, dataForm);
