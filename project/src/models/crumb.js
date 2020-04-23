import { pathToRegexp, tools, qs, memory } from '@/utils'
import update from 'immutability-helper'
import router from 'umi/router'


function searchTitle(pathname) {
  let routes =  window.g_routes
  let item = routes.find(d => !!d.isHistory)
  routes = item.routes
  let curr = routes.find(d => pathToRegexp(d.path || '/').exec(pathname))
  return curr && curr.title
}
 
update.extend('$unpush', (proportion, original) => {
  let obj = update(original, { $push: proportion })
    .reduce((prev, next ) => ({ ...prev, [next.pathname]: next}), {})
  return Object.keys(obj).map(k => obj[k])
})
export default {
  namespace: 'crumb',
  state: memory.pullCrumb(),
  subscriptions: {
    setupHistory({ history, dispatch }) {
      const { action, listen } = history 
      return listen(({ pathname, search }) => {
        if (!(pathname.includes('user')) && action) {
          let payload = {
            pathname,
            search,
            title: searchTitle(pathname)
          }
          dispatch({ type: 'add', payload })
        }
      })
    }
  },
  effects: {
    *add({ payload }, { put, select }) {
      const { pathname, search, title } = payload
      let crumb = yield select(d => d.crumb || [])
      crumb = update(crumb, {$unpush: [payload] })
      yield put.resolve({ type: 'updateState', payload: crumb })
      memory.pushCrumb(crumb) // 缓存历史记录
    },
    *remove({ payload: index }, { call, put, select }) {
      let crumb = yield select(d => d.crumb)
      let current = crumb[index - 1]
      crumb = update(crumb, { $splice: [[ index, 1]] })
      yield put.resolve({ type: 'updateState', payload: crumb })
      return current
    }
  },

  reducers: {
    updateState (state, { payload }) {
      return payload
    },
  },
}
