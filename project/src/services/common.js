import api from './api'
import {  memory } from '@/utils'
export const fetchMap = () => api('map')()
export const fetchRegion = () => api('region')()
export const fetchCountry = () => api('country')()

export const search = data => api('search')(data)

export const initCfgs = (callback = () => {}) => {
  if (!memory.pullCfgs()) {
    Promise.all([fetchMap(), fetchRegion(), fetchCountry()]).then(res => {
      console.log('aaaaa', window.g_app.store)
      let [ map, region, country ] = res
      country = country.reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
      map.timezone = map.timezone.reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
      memory.pushCfgs({country, region, ...map })
      callback()
    })
  } else {
    callback()
  }
}