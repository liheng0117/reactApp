import { pathToRegexp } from '@/utils'
import { filter } from '@/constants/affiliate'
import * as affiliateServices from '@/services/affililate'
import { qs } from '@/utils'
import { message } from '@/components'

export default {
  namespace: 'affiliate',
  
  state: {
    tableData: [],  // 表格数据
    addTable: [], // add 页面
    editTable: [],  // edit 页面
    filter,
    batchStatus: {
      selectedRowKeys: [],
      selectedRows: [],
    },
    current: 1,
    total: '',
    pageSize: '',
  },

  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const regexp = pathToRegexp('/admin/affiliates').exec(pathname)
        if (regexp) {
          dispatch({ 
            type: 'doList',
            payload: qs.parse(history.location.search, { ignoreQueryPrefix: true })
          })
        }
      })
    }
  },

  effects: {
    *doFilter ({ payload }, { call, put, select }) {
      yield put({ type: 'updateData', payload })
    },

    // 表格数据
    *doList ({ payload }, { call, put, select }) {
      // console.log( payload )
      const { list, ...data } = yield call(affiliateServices.list, payload)
      yield put({ type: 'updateData', payload: { tableData: list, ...data } })
    },

    *doBatchStatus ({ payload }, { call, put, select }) {
      yield call(affiliateServices.affiliateBatchStatus, payload)
      message.success('approved modify pending')
      yield put({ type: 'doList' })
    }
  },

  reducers: {
    // 表格数据 || Filter
    updateData (state, { payload }) {
      return { ...state, ...payload }
    },

    updateBatchStatus (state, { payload }) {
      return { ...state, ...payload }
    }
  }
}