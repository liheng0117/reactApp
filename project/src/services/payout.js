import api from './api'
export const payoutList = data => api('payout-list')(data)
export const payoutDetail = data => api('payout-detail')(data)