import request from "./request";

// 查询资产
export const queryAssetById = (id, count = 200) => request.post(`/asset/getAssetData?asset_id=${id}&count=${count}`, { filters: [] });

// 查询物料清单数据
export const queryMatterData = (data_id, asset_id) => request.get(`/ext/snap-window/queryMatter?data_id=${data_id}&asset_id=${asset_id}`);

// 查询物料清单列表数据
export const queryMatteList = (params) => request.post(`/ext/snap-window/queryMaterials`, params);

// 查询公式类型数据
export const queryFormulaTypeData = () => request.get(`/ext/snap-window/queryFormulaType`);

// 查询公式名称数据
export const queryFormulaNameData = (type) => request.get(`/ext/snap-window/queryFormula?type=${type}`);

// 保存物料清单数据
export const saveMatterData = (asset_id, dataForm) => request.post(`/ext/snap-window/batchAddMatter?asset_id=${asset_id}`, dataForm);
