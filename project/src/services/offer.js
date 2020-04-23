import api from './api'
export const offerList = data => api('offer-list')(data)
export const offerPageList = data => api('offer-page_list')(data)
export const offerDetail = data => api('offer-detail')(data)
export const offerUpdate = data => api('offer-update')(data)
export const offerBatch = data => api('offer-batch')(data)

export const creativeList = data => api('creative-list')(data)
export const creativeSave = data => api('creative-save')(data)
export const createRemove = data => api('creative-remove')(data)
export const creativeBatch = data =>api('creative-batch')(data)