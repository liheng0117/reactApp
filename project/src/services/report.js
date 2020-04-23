import api from './api'

// export const list = data => api('report-summary')(data)  // 表格
// export const list = data => api('reports-order')(data)  // 表格
// export const list = data => api('reports-bonus')(data)  // 表格

export const list = url => data => api(url)(data)

export const summary = data => api('report-summary')(data)
export const order = data => api('reports-order')(data)
export const bonus = data => api('reports-bonus')(data)
export const createBonus = data => api('reports-bonus-create')(data)
export const createBilling = data => api('reports-billing-create')(data)
