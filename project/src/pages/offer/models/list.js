
import update from 'immutability-helper'
import * as offerServices from '@/services/offer'
import { FILTER, OPERATION, COLUMNS } from '@/constants/offer'
import { qs, pathToRegexp } from '@/utils'
import { message } from '@/components';
export default {
  namespace: 'offers',
  state: {
    classes: 'default', // 页面区分类别
    pagination: {},
    list: [],
    filter: [],
    operation: [],
    columns: [],
    selectedRowKeys: [], 
    creative: null
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname, search }) => {
        let regexp = pathToRegexp('*/offers/:type?').exec(pathname)
        if (regexp) {
          let params = qs.parse(search, { ignoreQueryPrefix: true, plainObjects: true })
          let classes = regexp[2] || 'default'
          let payload = {
            filter: FILTER[classes],
            operation: OPERATION[classes],
            columns: COLUMNS[classes],
            // list: []
          } 
          if (params.order_by) {
            let { field, order } = params.order_by
            payload.columns = payload.columns.map(d => d.dataIndex === field ? {...d, sortOrder: `${order}end`} : d)
          }
          dispatch({ type: 'updateState', payload, classes })
          dispatch({ type: 'fetchList', classes, payload: params })
        } 
      })
    }
  },
  effects: {
    // 所有list 请求入口 为了跟踪统一的loading
    *fetchList({ payload, classes }, { put }) {
      if (classes === 'creatives') {
    
        yield put.resolve({ type: 'fetchCreatives', payload })
      } else {
        yield put.resolve({ type: 'fetchOffers', payload })
      }
    },
    // 获取offer 列表
    *fetchOffers({ payload = {} }, { call, put }) {
      let { current: page, ...rest } = payload
      let params = { page, ...rest }
      let { list, ...pagination } = yield call(offerServices.offerList, params)
      yield put({ type: 'updateState', payload: { pagination, list } })
    },
    // 批量修改offers
    *fetchBatchOffers({ payload = {} }, { call, put, select }) {
      const list = yield select(d => d.offers.list)
      const offer_id_arr = yield select(d => d.offers.selectedRowKeys)
      switch (true) {
        case offer_id_arr.length < 1:
          message.error('please select item')
          break;
        default:
          offer_id_arr.map(v => {
            list.filter( (k, i) => k.offer_id === v && (list[i].offer_status = 0) )
          })
          yield call(offerServices.offerBatch, { offer_id_arr, ...payload })
          yield put({ type: 'updateState', payload: { list } })
      }
    },
    // 获取 creatives 列表数据
    *fetchCreatives({ payload = {}}, { call, put }) {
     let { current: page, ...rest } = payload
     let params = { page, ...rest }

     let { list, ...pagination } = yield call(offerServices.creativeList, params)
     yield put({ type: 'updateState', payload: { pagination, list } })
    },
    // 创建creative
    *fetchCreativeSave({ payload = {} }, { call, put, select }) {
      yield call(offerServices.creativeSave, payload)
      let { search } = yield select(d => d.routing.location)
      let params = qs.parse(search, { ignoreQueryPrefix: true, plainObjects: true }) // 取出当前路由参数
      message.success('Operation is successful')
      yield put({ type: 'updateState', payload: { creative: null } }) // 关闭弹出
      yield put({ type: 'fetchCreatives', payload: params }) // 根据当前参数更新列表数据
    },
    // 编辑creatives 
    *doModifyCreatives({ payload }, { call, put, select }) {
      let { creative_status, creative_id, index } = payload
      let data = { creative_id_arr: [creative_id], creative_status: Number(payload.creative_status) }
      yield call(offerServices.creativeBatch, data)
      let list = yield select(d => d.offers.list)
      list = update(list, { [index]: { creative_status: { $set: creative_status } } })
      yield put({ type: 'updateState', payload: { list }})
    },
    // 删除 creatives
    *fetchDelCreatives({ payload }, { call, put, select }) {
      let { creative_id } = payload
      let data = { creative_id }
      yield call(offerServices.createRemove, data)
      message.success('Operation is successful')
      let { search } = yield select(d => d.routing.location)
      let params = qs.parse(search, { ignoreQueryPrefix: true, plainObjects: true }) // 取出当前路由参数
      yield put({ type: 'fetchCreatives', payload: params }) // 根据当前参数更新列表数据
    },
    *fetchCreative({ payload = {} }, { put }) {
      let { creative_id, offer_id, name, creative_status, url: creative_url, ...upload } = payload
      let creative = { offer_id: name, name, creative_status, upload: [{ ...upload, creative_url, creative_id }]}
      yield put({
        type: 'updateState',
        payload: {
          creative
        }
      })
    },
  },

  reducers: {
    updateState(state, { payload, classes }) {
      return classes ? { ...state, classes, ...payload } : { ...state, ...payload }
    }
  },
}
