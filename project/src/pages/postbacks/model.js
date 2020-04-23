import { pathToRegexp, _, qs } from '@/utils'
import * as pastbackServices from '@/services/postback'
import { message } from '@/components'

export default {
  namespace: 'postback',
  state: {
    list: [],  // 表格数据
    globalDetail: {}
  },

  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, search }) => {
        const regexp = pathToRegexp('/postbacks/').exec(pathname)
        const regexp_gPostback = pathToRegexp('/postbacks/gPostback').exec(pathname)
        if (regexp) {
          // const payload = qs.parse(search, { ignoreQueryPrefix: true })
          dispatch({ type: 'fetch' })
        }
        regexp_gPostback && dispatch({ type: 'fetchDetail_global' })
      })
    }
  },

  effects: {
    // 表格数据
    *fetch ({ payload }, { call, put, select }) {
      const search = yield select(state => state.routing.location.search)
      const params = qs.parse(search, { ignoreQueryPrefix: true })
      const data = yield call(pastbackServices.postbackList, { ...params, ...payload })
      let { list, ...pagination } = data
      yield put({ type: 'updateState', payload: { list, pagination } })
    },
    // 更新表格状态
    *fetchUpdate ({ payload }, { call, put, select }) {
      const { d, index } = payload
      const postback_status = Number(d.postback_status) === 1 ? 0 : 1
      yield call(pastbackServices.postbackChangeStatus, { postback_status, postback_id: d.postback_id })
      const list = yield select(state => state.postback.list)
      const clone = _.cloneDeep(list)
      clone[index].postback_status = postback_status
      yield put({ type: 'updateState', payload: { list: clone } })
    },
    // 删除postback
    *fetchDelete ({ payload }, { call, put }) {
      const { postback_id } = payload.record
      yield call(pastbackServices.postbackDelete, { postback_id })
      message.success('delete success!')
      yield put({ type: 'fetch' })
    },
    // 保存postback_global
    *fetchSave_global ({ payload }, { call }) {
      yield call(pastbackServices.postbackSave_global, payload)
      message.success('save success!')
    },
    *fetchDetail_global ({ }, { call, put }) {
      const data = yield call(pastbackServices.postbackdDetail_global)
      const globalDetail = data || {}
      globalDetail.global_pixel_flag = Boolean(Number(globalDetail.global_pixel_flag))
      globalDetail.global_postback_flag = Boolean(Number(globalDetail.global_postback_flag))
      yield put({ type: 'updateState', payload: { globalDetail } })
    },
  },

  reducers: {
    // 表格数据 || Filter
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}