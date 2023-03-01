import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 *
 */
export const queryAssetById = (id) => request.post(`/asset/getAssetData?asset_id=${id}&count=${99999}`, { filters: [] });

// 获取菜单数据
// export const queryMenuData = () => request.post(`/service/dataapi/rest/bfe52f17-9d69-410e-8a49-9a2116fb3099`, {});

export const queryMenuData = (dataForm) => request.post(`/ext/queryAsset/queryByAssetId?assetId=07d82842-286a-1365-1a8f-0501b6a8acb6`, dataForm);

// 获取个人信息
export const getDataApi = (dataForm) => request.post(`/service/dataapi/rest/78811857-b20f-4baf-86e6-52466ebdd2c1`, dataForm);

// 获取当前账户信息
export const user = () => request.get("/system/authority/user");

// 获取其他账号信息
export const getAccountList = (id) => request.get(`/system/account/queryUserByAccount?account_code=${id}`);

// 切换账户
export const loginByUser = (dataForm) => request.post("/system/authority/loginByUserAndCreateCookie", dataForm);

// 登出
export const logout = () => request.get("/system/authority/logout");
