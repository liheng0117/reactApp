import { pathToRegexp, tools, _, moment } from '@/utils'
import router from 'umi/router'
import * as affiliateServices from '@/services/affililate'
import { message } from '@/components'
import { addFromData } from '@/constants/affiliate'
import update from 'immutability-helper'

export default {
  namespace: 'addAffiliate',
  
  state: {
    tableData: [],  // Offer 表格数据
    addFromData, // Add、Edit 表单数据结构
    cacheData: {  // 保存表单值
      affiliate: {},
      user: {},
      billing: {},
    },
    current: 1,
    total: 0,
    pageSize: 1,
    affiliate_id: '',
    saveTime: [], // 保存修改的 time 列表
  },

  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname }) => {
        let regexp = pathToRegexp('*/affiliates/:affiliates_id/:edit?').exec(pathname)
        if (regexp) {
          let [pathname, platform, affiliate_id] = regexp
          
          // 如果是编辑
          if (affiliate_id !== 'add') {
            dispatch({ type: 'doEdit', payload: { affiliate_id } })
            // 编辑 和 Add 都要拉 Offer接口
            dispatch({ type: 'doOfferList', payload: { edit_affiliate_id: affiliate_id } })

          } else {
            dispatch({ type: 'doAdd', payload: { affiliate_id: '' } })
            dispatch({ type: 'doOfferList' })
          }
        }
      })
    }
  },

  effects: {
    *doAdd ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateData',
        payload: { addFromData, ...payload }
      })

      yield put({
        type: 'updateInitCacheData',
        payload: { affiliate: {}, billing: {}, user: {} }
      })
    },

    *doEdit ({ payload }, { call, put, select }) {
      const data = yield call(affiliateServices.affiliateDetail, payload)
      const { affiliate_detail, billing_detail, user_detail } = data
      const region = localStorage.getItem('cacheRegion')
      const country_id = _.get(data, `billing_detail.country_id`, '')
      const copyBillingInformation = _.cloneDeep(addFromData.billingInformation)

      yield put({
        type: 'updateInitCacheData',
        payload: {
          affiliate: affiliate_detail || {},
          billing: billing_detail || {},
          user: {
            ...user_detail, 
            ...affiliate_detail,
            manager_idd: user_detail.manager_id,
            manager_id: user_detail.manager_email,
          } || {},
        }
      })

      // Edit时 动态插入 Affiliate ID
      const newInformation = update(
        addFromData.affiliateInformation, 
        {
          $unshift: [{
            label: 'Affiliate ID', 
            id: 'affiliate_code',
            type: 'Input',
            props: {
              disabled: true,
            }
          }]
        } 
      )
      
      copyBillingInformation.forEach(op => {
        if (op.id === 'region_id') {
          op.option = tools.serializeOptions(
            JSON.parse(region)[country_id], 
            { name: 'en_name', value: 'id', fKey: 'country_id', id: country_id }
          )
        }
      })

      yield put({
        type: 'updateAffiliateId',
        payload: {
          addFromData: update(addFromData, {
            affiliateInformation: { $set: newInformation }, 
            billingInformation: { $set: copyBillingInformation },
          }),
          ...payload,
        }
      })
    },

    *doOfferList ({ payload }, { call, put, select }) {
      const cacheTableData = yield select(d => d.addAffiliate.tableData, payload)
      let { list, ...options } = yield call(affiliateServices.offerList, payload )
      if (payload && payload.page > 1) {
        list.push(...cacheTableData)
      }
      list = list.map(v => {
        v.default_payout = v.payout
        return v
      })
      yield put.resolve({ type: 'updateData', payload: { tableData: [] } })
      yield put.resolve({ type: 'updateData', payload: { tableData: list, ...options } })
    },

    *doCreate ({ payload }, { call, put, select }) {
      yield call(affiliateServices.create, payload )
      yield put({ type: 'updateData', payload })
      message.success('create success')
      router.push('/admin/affiliates')
    },

    *doAffiliateUpdate ({ payload }, { call, put, select }) {
      yield call(affiliateServices.affiliateUpdate, payload)
      message.success('update success')
      router.push('/admin/affiliates')
      // setTimeout(() => router.push('/admin/affiliates'), 2000)
    },
  },

  reducers: {
    // 表格数据 || Filter
    updateData (state, { payload }) {
      return { ...state, ...payload }
    },

    updateRegion (state, { payload }, newObject = {}) {
      const { option, name, id } = payload
      const { addFromData } = state
    
      return { ...state, addFromData: { 
        ...addFromData, [name]: addFromData[name].map(v => {
          // id 相同 修改它的 option 值
          if ( v.id === id ) {
            v.option = option
          }
          return v
        })
      } }
    },

    updateInitCacheData (state, { payload }) {
      return { ...state, cacheData: payload }
    },

    updateAffiliateId (state, { payload }) {
      return { ...state, ...payload }
    },

    updateCacheData (state, { payload }) {
      const { key, all } = payload
      const { cacheData } = state
      return { ...state, cacheData: { ...cacheData, [key]: all } }
    },

    updateEditTime (state, { payload }) {
      let { tableData, saveTime } = state
      let arr = []
      const { time, opt } = payload
      const tableDataTwo = tableData.map((table, key) => {
        if (table.offer_id === opt.offer_id) {
          table.effective_time = Math.ceil(time/1000)
          // table.create_time = Math.ceil(moment(time).format('X'))
          arr = [...saveTime, opt.offer_id]
        }
        return table
      })
      return { ...state, tableData: tableDataTwo, saveTime: arr }
    },

    updateEditTable (state, { payload }) {
      let { tableData } = state
      const { value, index } = payload
      return { ...state, ...payload, tableData: tableData.map((table, key) => {
        if ( key == index ) {
          table.payout = value
        }
        return table
      }) }
    },
  }
}