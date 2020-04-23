import { pathToRegexp, qs, _ } from '@/utils'
import * as billingServices from '@/services/billing'
import { message } from '@/components'

export default {
  namespace: 'billing',
  state: {
    filter: [], // Filter 
    list: [],  // 表格数据
    detail: {},
    visible: false,
    selectedRowKeys: []
  },

  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const regexp = pathToRegexp('/admin/billing').exec(pathname)
        if (regexp) {
          // dispatch({ type: 'doFilter', payload: { filter } })
          dispatch({ type: 'fetch' })
        }
      })
    }
  },

  effects: {
    *doFilter ({ payload }, { call, put, select }) {
      yield put({ type: 'updateState', payload })
    },

    // 表格数据
    *fetch ({ payload }, { call, put, select }) {
      const search = yield select(state => state.routing.location.search)
      const params = qs.parse(search, { ignoreQueryPrefix: true })
      const data = yield call(billingServices.billingList, { ...params, ...payload })
      let { list, ...pagination } = data
      yield put({ type: 'updateState', payload: { list, pagination, selectedRowKeys: [] } })
    },
    *fetchDetail({ payload }, { call, put }) {
      const detail = yield call(billingServices.billingDetail, payload)
      yield put({ type: 'updateState', payload: { detail } })
    },
    *fetchUpdate({ payload }, { call, put }) {
      yield call(billingServices.billingUpdate, payload)
      yield put({ type: 'updateState', payload: { visible: false } })
      message.success('update success')
      yield put({ type: 'fetch' })
    },
    *billingStatus({ payload }, { call, put, select }) {
      const billing = yield select(state => state.billing)
      let { selectedRowKeys, list } = billing
      let clone = selectedRowKeys.map( v => list[v])
      const pending = _.findIndex(clone, v => v.billing_status != 0)
      switch (true) {
        case selectedRowKeys.length < 1:
            message.error('please select item')
            break;
        case pending != -1 && payload.billing_status === -1:
          message.error('status is not pending')
          break;
        default:
          const billing_id_arr = selectedRowKeys.map(v => list[v].billing_id)
          yield call(billingServices.billingStatus, {...payload, billing_id_arr })
          selectedRowKeys.map( v => list[v].billing_status = payload.billing_status)
          yield put({ type: 'updateState', payload: { list }})
          message.success('status change success')
      }
    },

    *fetchDelete({ payload }, { call, put }) {
      yield call(billingServices.billingDelete, payload)
      yield put({ type: 'fetch' })
      message.success('delete success')
    },
    *download ({ payload }, { call }) {
      yield call(billingServices.billingList, payload)
    },
  },

  reducers: {
    // 表格数据 || Filter
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}