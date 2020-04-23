import api from './api'

export const list = data => api('affiliate-list')(data)  // 表格
export const affiliateDetail = data => api('affiliate-detail')(data) // 编辑
export const create = data => api('affiliate-create')(data) // 创建
export const offerList = data => api('affiliate-payout-offers')(data) // Offer List
export const affiliateBatchStatus = data => api('affiliate-batch-status')(data) // Offer List
export const affiliateUpdate = data => api('affiliate-update')(data) // Offer List
