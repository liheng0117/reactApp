import { pathToRegexp, tools, _, memory} from '@/utils'
import router from 'umi/router'
import * as commonServices from '@/services/common'
import * as userServices from '@/services/user'
import { offerPageList } from '@/services/offer'

const { conversionObj } = tools

// console.dir(update)

const cacheRegion = (cfgs, region = {}) => {
  Object.values(cfgs.REGION).forEach(v => {
    const id = v.country_id
    if (!region[id]) {
      region[id] = []
    }
    region[id].push(v)
  })
  return region
} 


export default {
  namespace: 'app',
  state: {
    scroll: { x: 1620 },
    ...memory.pullUser()
  },
  effects: {
    *fetchSearch({ payload }, { put, call}) {
      let { field, value, _v, _n, _c } = payload
      let data = yield call(commonServices.search, {field, value })
      return data.map(item => {
        return {
          value: item[_v],
          name: _c ? `(${item[_c]}) ${item[_n]}` : item[_n]
          // name: item[_n]
        }
      })
    },
    *fetchSearchOfferPage({ payload }, { put, call}) {
      let { field, value, _v, _n, _c } = payload
      let data = yield call(offerPageList, {[field]: value })
      return data.map(item => {
        return {
          value: item[_v],
          name: _c ? `(${item[_c]}) ${item[_n]}` : item[_n]
          // name: item[_n]
        }
      })
    },
    *logout({ }, { call, select }) {
      const platform = yield select(state => state.app.platform)
      yield call(userServices.logout)
      memory.clear()
      router.push(`/user/login${platform != 'frontend' ? '/admin' : ''}`)
    },
    *concactAM({ }, { select }) {
      let manager_email = yield select(d => d.app.manager_email)
      let link = document.createElement("a")
      let evt = document.createEvent("HTMLEvents")
      evt.initEvent("click", false, false)
      link.setAttribute('href', `mailto:${manager_email}`)
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
    },
  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
