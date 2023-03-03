import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 *
 */
export const queryAssetById = (id, count = 200) => request.post(`/asset/getAssetData?asset_id=${id}&count=${count}`, { filters: [] });

// 获取文章数据
export const queryEssayData = (assetId, id) => request.get(`/retrieval/favorites/queryById?asset_id=${assetId}&id=${id}`);

// 收藏
export const collectData = (dataForm) => request.post(`/retrieval/favorites/add`, dataForm);

// 取消收藏
export const cancelCollectData = (id) => request.get(`/retrieval/favorites/cancel?article_id=${id}`);

// 收藏列表
export const collectList = (dataForm) => request.get(`/retrieval/favorites/list`, dataForm);
