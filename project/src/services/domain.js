import api from './api'

export const list = data => api('domain-list')(data)  // 表格
export const update = data => api('domain-update')(data)  // 保存
export const search = data => api('search')(data)  // 搜索

