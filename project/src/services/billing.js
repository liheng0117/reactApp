import api from './api'
export const billingList = data => api('billing-list')(data)
export const billingStatus = data => api('billing-batch-status')(data)
export const billingDetail = data => api('billing-detail')(data)
export const billingUpdate = data => api('billing-update')(data)
export const billingDelete = data => api('billing-delete')(data)
export const billingPreview = data => api('reports-preview')(data)