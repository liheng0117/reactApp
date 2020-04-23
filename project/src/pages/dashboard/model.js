import { formatMessage } from 'umi-plugin-locale'
import { pathToRegexp, qs } from '@/utils'
import * as dashboardServices from '@/services/dashboard'
export default {
  namespace: 'dashboard',
  state: {
    revenue: {},
    conversion: {},
    rate: {},
    bonus: {},
    offers: [],
    payouts: [],
    cose: [],
    performance: [],
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname, search }) => {
        let regexp = pathToRegexp('*/dashboard').exec(pathname)
        if (regexp) {
          let payload = qs.parse(search, { ignoreQueryPrefix: true })
          let platform = !!regexp[1] ? 'backend' : 'frontend'
          dispatch({ type: `${platform}Index`, payload })
        }
      })
    }
  },
  effects: {
    *frontendIndex({ payload }, { put }) {
      yield put({ type: 'fetchRevenue', payload })
      yield put({ type: 'fetchOffers', payload })
      yield put({ type: 'fetchPayouts', payload })
      yield put({ type: 'fetchPerformance', payload })
    },
    *backendIndex({ payload }, { put }) {
      yield put({ type: 'fetchConversion', payload })
      yield put({ type: 'fetchCost', payload })
      yield put({ type: 'fetchPerformance', payload })
    },
    *fetchRevenue({ payload }, { call, put }) {
      let { bonus, revenue, ...others } = yield call(dashboardServices.revenue, payload)
      let _payload = {
        bonus, 
        revenue,
        rate: { ...others }
      }
      yield put({ type: 'updateState', payload: _payload })
    },
    *fetchOffers({ payload }, { call, put }) {
      let { list: offers } = yield call(dashboardServices.offers, payload)
      yield put({ type: 'updateState', payload: { offers } })
    },
    *fetchPayouts({ payload }, { call, put }) {
      let payouts = yield call(dashboardServices.payout, payload)
      yield put({ type: 'updateState', payload: { payouts } })
    },
    *fetchPerformance({ payload }, { call, put }) {
      let performance = yield call(dashboardServices.performance, payload)
      yield put({ type: 'updateState', payload: { performance } })
    },
    *fetchConversion({ payload }, { call, put }) {
      let conversion = yield call(dashboardServices.conversion, payload)
      yield put({ type: 'updateState', payload: { conversion } })
    },
    *fetchCost({ payload }, { call, put}) {
      let cost = yield call(dashboardServices.cost, payload)
      yield put({ type: 'updateState', payload: { cost } })
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
}
