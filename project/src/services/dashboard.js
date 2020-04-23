import api from './api'
export const revenue = data => api('dashboard-revenue')(data)
export const offers = data => api('dashboard-offers')(data)
export const performance = data => api('dashboard-performance')(data)
export const payout = data => api('dashboard-payout')(data)
export const cost = data => api('dashboard-cost')(data)
export const conversion = data => api('dashboar-conversion')(data)