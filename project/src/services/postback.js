import api from './api'
export const postbackList = data => api('postback-list')(data)
export const postbackChangeStatus = data => api('postback-change-status')(data)
export const postbackDelete = data => api('postback-delete')(data)
export const postbackSave_global = data => api('postback-save_global')(data)
export const postbackdDetail_global = data => api('postback-detail_global')(data)

export const create = data => api('postback-create')(data)
export const remove = data => api('postback-delete')(data)