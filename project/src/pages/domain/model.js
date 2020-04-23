import { pathToRegexp, qs } from '@/utils'
import { message } from '@/components'
import * as domainServices from '@/services/domain'
import { filter } from '@/constants/domain'
import { POP } from '@/constants/domain'
import update from 'immutability-helper'

const cacheData = POP[`${window.g_platform}Pop`]

const setOffer = (isTrue, data = '') => {
  cacheData.forEach(dt => {
    // Type 值是 Global时 Offer 禁用
    if ( dt.id !== 'offer_id' ) return false

    const newData = {...dt, ...{
      props: {
        ...dt.props,
        disabled: !isTrue,
      },
      required: isTrue
    }}

    data = update(cacheData, { $splice: [[2, 1], [2, 0, newData]] })
  })

  return data
}

export default {
  namespace: 'domain',
  state: {
    filter, // Filter 
    tableData: [],  // 表格数据
    popData: cacheData, // 弹层配置
    pageSize: 0,
    total: 0,
    current: 1,
    popDetail: {},  // 弹窗数据
    disabledArr: [],
    isEdit: false, // 是否是编辑
  },
  
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const regexp = pathToRegexp(/(\/domain)|(\/admin\/domain)/img).exec(pathname)
        if (regexp) {
          const payload = qs.parse(history.location.search, { ignoreQueryPrefix: true })
          dispatch({ type: 'doData', payload } )
        }
      })
    }
  },

  effects: {
    *doData ({ payload }, { call, put, select }) {
      const data = yield call(domainServices.list, payload)
      const { list, ...option } = data
      yield put({ type: 'updateData', payload: { tableData: list, filter, ...option } })
    },

    // Switch
    *doUpdateStatus ({ payload }, { call, put, select }) {
      const params = qs.parse(window.location.href.split('?')[1], { ignoreQueryPrefix: true })
      const tableData = yield select(d => d.domain.tableData)
      const { domain_id, domain_status } = payload
      
      // 更新 Switch 状态
      yield call(domainServices.update, payload)
      message.success('Successfully modified')
      yield put({ type: 'doData', payload: params })

      // 过滤当前 Switch 
      // const filterTable = tableData.map(dt => {
      //   if ( domain_id === dt.domain_id ) {
      //     dt.domain_status = domain_status ? 1 : 0
      //   }
      //   return dt
      // })

      // 更新表格数据
      // yield put({ type: 'updateData', payload: { tableData: filterTable } })
    },

    *doSubmit ({ payload }, { call, put, select }) {
      let data = yield call(domainServices.update, payload)
      // 这里要考虑 Filter的值 应该带入
      yield put({ type: 'doData', payload: { page: 1 } })
      message.success('Added successfully')
    }
  },

  reducers: {
    // 表格数据 || Filter
    updateData (state, { payload }) {
      return { ...state, ...payload }
    },

    updateDomainForms (state, { payload }) {
      const { isTrue, all } = payload
      const { edit, popDetail } = state

      // 如果选中 Globl 清空 offer ID的内容
      !edit && (all.offer_id = '')

      return {
        ...state,
        popDetail: { ...popDetail, ...all },
        popData: setOffer(isTrue)
      }
    },

    updateEdit (state, { payload }) {
      let { popDetail } =  payload
      const { edit } = state
      let data = cacheData
      const copyPopDetail = JSON.parse(JSON.stringify(popDetail))

      // 前台才走这段逻辑
      if (window.g_platform === 'frontend') {
        for (let [key, value] of Object.entries(popDetail)) {
          if (key === 'domain_type' && !value) {
            data = setOffer(false)
          }
        }

        if (Object.values(copyPopDetail).length) {
          copyPopDetail.id = copyPopDetail.offer_id
          copyPopDetail.offer_id = `(${copyPopDetail.domain_code}) ${copyPopDetail.offer_name}`
        }
      } else {
        if (Object.values(copyPopDetail).length) {
          copyPopDetail.id = copyPopDetail.affiliate_id
          copyPopDetail.affiliate_id = `(${copyPopDetail.domain_code}) ${copyPopDetail.affiliate_name}`
        }
      }

      return { 
        ...state, 
        ...payload,
        popData: data,
        popDetail: copyPopDetail,
      }
    }
  }
}