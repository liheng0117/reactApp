import update from 'immutability-helper'
import router from 'umi/router'
import { pathToRegexp, qs } from '@/utils'
import * as offerServices from '@/services/offer'
import * as postbackServices from '@/services/postback'
import { _ } from '@/utils'
import { message } from '@/components'
import { SUB_IDS }  from '@/constants'
import { OFFER_ADD_SHEET } from '@/constants/offer'

const pageSchema = {
  name: null,
  url: null,
  page_download_url: null,
  filename: null
}
const state = {
  frontend: {
    label: undefined,
    visible: false,
    postbackVisible: false,
    activeKey: undefined,
    basic: [],
    subs: SUB_IDS,
    pages: [],
    postbacks: []
  },
  backend: {
    pages: [],
    basic: {},
    sheet: OFFER_ADD_SHEET
  }
}

export default {
  namespace: 'offer',
  state: state,
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {   
        let regexp = pathToRegexp('*/offer/:id/').exec(pathname)
        if (regexp) {
          let [pathname, platform, offer_id] = regexp
          platform = !!platform ? 'backend' : 'frontend'
          dispatch({ type: 'updateState', platform, payload: state[platform] })
          if (offer_id !== "create") {
            dispatch({ type: 'fetchDetail', platform, payload: { offer_id } })
          }
        }
      })
    }
  },
  effects: {
    *fetchDetail({ platform, payload = {} }, { call, put, select }) {
      let data = yield call(offerServices.offerDetail, payload)
      let _payload = {}
      if (platform === 'frontend') {
        let label = _.get(data, 'basic_info.offer_name')
        let basic = _.at(data, 'basic_info')
        let postbacks = _.get(data, 'postback', [])
        let pages = _.get(data, 'offer_page')
        let activeKey = _.get(pages, '0.offer_page_id')
        _payload = { label, basic, postbacks, pages, activeKey }
        yield put({ type: 'fetchPostbacks', payload })
      } else if (platform === 'backend') {
        let sheet = yield select(d => d.offer.backend.sheet)
        _payload = { basic: data.basic_info, pages: data.offer_page}
        _payload.basic.country_id =  _payload.basic.country && _payload.basic.country.map(d => String(d.country_id))
        if (String(_payload.basic.offer_status) === '1') {
          _payload.sheet = sheet.map(item => item.id !== 'description' ? {
            ...item,
            required: `this ${item.label} cannot be empty`
          } : item)
        }
      }
      yield put({ type: 'updateState',  platform, payload: _payload })
    },
    *fetchUpdate({ platform = 'backend', payload }, { call, put }) {
      yield call(offerServices.offerUpdate, payload)
      message.success('operation is successful')
      router.push('/admin/offers/list')
    },
    // postback 保存 --- 前台
    *fetchPostbackSave({ platform = 'frontend', payload }, { call, put }) {
      let data = yield call(postbackServices.create, payload)
      message.success('operation is successful')
      yield put({ type: 'updateState', platform, payload: { postbackVisible: false } })
      let { offer_id } = payload 
      yield put({ type: 'fetchPostbacks', payload: { offer_id } })
    },
    // postback 删除 --- 前台
    *fetchPostbackRemove({ platform = 'frontend', payload }, { call, put, select }) {
      let { postback_id } = payload 
      yield call(postbackServices.remove, { postback_id })
      message.success('operation is successful')
      let postbacks = yield select(d => d.offer.frontend.postbacks)
      postbacks = postbacks.filter(d => d.postback_id !== postback_id )
      yield put({ type: 'updateState', platform, payload: { postbacks } })
    },
    // 获取当前offer下的 postback -- 前台
    *fetchPostbacks({ platform = 'frontend', payload }, { call, put }) {
      let { list: postbacks  } = yield call(postbackServices.postbackList, payload)
      yield put({ type: 'updateState', platform, payload: { postbacks } })
    },
    // offer page 修改 -- 后台
    *doModifyPage({ platform = 'backend', payload }, { call, put, select }) {
      let pages = yield select(d => d.offer.backend.pages)
      let { rest, index } = payload 
      pages = update(pages, { [index]: { $merge: rest }})
      yield put({ type: 'updateState', platform, payload: { pages } })
    },
    // offer page 添加 -- 后台
    *doAddPage({ platform = 'backend', payload }, { call, put, select }) {
      let { rest, index } = payload
      console.log('afs', rest)
      let pages = yield select(d => d.offer.backend.pages)
      pages = [
        ...pages.slice(0, index + 1),
        rest,
        ...pages.slice(index + 1, pages.length)
      ]
      yield put({ type: 'updateState', platform, payload: { pages } })
    },
    *doDelSheet({ platform = 'backend', payload }, { call, put, select }) {
      let { index, id } = payload
      let { sheet: _sheet, sheetValues: _sheetValues } = yield select(d => d.offer.backend)
      let sheet = [
        ..._sheet.slice(0, index),
        ..._sheet.slice(index + 1, _sheet.length)
      ]
      let sheetValues = Object.keys(_sheetValues).reduce((pre, key) => (key === id ? pre : { ...pre, [key]: _sheetValues[key] }), {})
      yield put({ type: 'updateState', platform, payload: { sheet, sheetValues } })
    },
    // 设置tricking_url 设置 前台
    *setURL({ platform = 'frontend', payload }, { call, put, select }) {
      let { activeKey, pages } = yield select(d => d.offer.frontend)
      pages = pages.map(item => {
        let [prefix, search] = item.tracking_url.split('?')
        let query = { ...qs.parse(search), ...payload }
        let tracking_url = `${prefix}${qs.stringify(query, { addQueryPrefix: true })}`
        return {
          ...item,
          tracking_url: decodeURIComponent(tracking_url)
        }
      })
      yield put({ 
        type: 'updateState',
        platform,
        payload: { pages } 
      })
    },
    *setPostbackURL({ platform = 'frontend', payload }, { call, put, select }) {
       const _postbacks = yield select(d => d.offer.frontend.postbacks)
       let { value, index } = payload
       let currentURL = _.get(_postbacks, `${index}.url_code`, undefined)
       if (value !== currentURL) {
          const postbacks = _postbacks.map((d, idx) => idx === index ? { ...d, url_code: value } : d)
          yield put({
            type: 'updateState',
            platform,
            payload: { postbacks }
          })
       }
    }
  },

  reducers: {
    updateState(state, { payload, platform }) {
      return { 
        ...state,
        [platform]: {
          ...state[platform],
          ...payload
        }
      }
    }
  },
}
