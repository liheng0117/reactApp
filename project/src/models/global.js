import { pathToRegexp, tools, memory } from '@/utils'
import { routerRedux } from 'dva/router'
import router from 'umi/router'
import * as commonServices from '@/services/common'
import * as userServices from '@/services/user'
import backend from '@/assets/backend.json'
import frontend from '@/assets/frontend.json'
const { conversionObj } = tools
// // console.log(backend, 'sss')
// function _init() {
//   let data =

//   return { country, timezone, ...rest }
// }
export default {
  namespace: 'cfgs',
  state:  window.g_platform === 'frontend' ? frontend : backend,
  effects: {
    *fetch({}, { call, put }) {
      let data = yield call(commonServices.mapList)
      let { country, timezone, ...rest } = data
      country = country.reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
      timezone = timezone.reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
      // yield put({ type: 'updateState', payload: { country, timezone, ...rest } })
    },
    *fetchCountry({}, { call, select, put }) {
      let cfgs = yield select(d => d.cfgs)
      if (!('country' in cfgs)) {
        console.log(cfgs, 'aaa')
        let country = yield call(commonServices.country)
        country = country.reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
        let payload = { ...cfgs, country }
        yield put({ type: 'updateState', payload })
      }
  
    },
    *init({ payload }, { put }) {
      let { country, timezone, ...rest } = payload
      country = country.reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
      timezone = timezone.reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
      //yield put({ type: 'app/fetchCfgs', payload })
      yield put({ type: 'updateState', payload: { country, timezone, ...rest } })
    }
  },

  reducers: {
    updateState (state, { payload }) {
      return payload
    },
  },
}
