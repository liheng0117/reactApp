import { pathToRegexp, qs, _, MD5 } from '@/utils'
import router from 'umi/router'
import { message } from '@/components'
import * as userServices from '@/services/user'

export default {
  namespace: 'member',
  state: {
    list: [],  // 表格数据
    isEdit: false,
    detail: {},
    visible: false
  },

  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const regexp = pathToRegexp('/admin/member/').exec(pathname)
        const regexpEdit = pathToRegexp('/admin/member/:id/edit').exec(pathname)
        if (regexp) {
          dispatch({ type: 'fetch' })
        }
        dispatch({ type: 'updateData', payload: { isEdit: regexpEdit ? true : false } })
        !regexpEdit && (dispatch({ type: 'updateData', payload: { detail: {} } }))
        if(regexpEdit){
          dispatch({ type: 'getDetail', payload: { admin_id : regexpEdit[1]} })
        }
      })
    }
  },

  effects: {
    // 表格数据
    *fetch ({ payload }, { call, put, select }) {
      const search = yield select(state => state.routing.location.search)
      const params = qs.parse(search, { ignoreQueryPrefix: true })
      const data = yield call(userServices.memberList, { ...params, ...payload })
      let { list, ...pagination } = data
      yield put({ type: 'updateData', payload: { list, pagination } })
    },
    // 更新表格状态
    *fetchUpdate ({ payload }, { call, put, select }) {
      const { d, k } = payload
      yield call(userServices.memberUpdate, { ...d, admin_status: d.admin_status == 1 ? 0 : 1 })
      const list = yield select(state => state.member.list)
      const clone = _.cloneDeep(list)
      clone[k].admin_status = clone[k].admin_status === 1 ? 0 : 1
      yield put({ type: 'updateData', payload: { list: clone } })
    },
    *getDetail({ payload }, { call, put }) {
      const detail = yield call(userServices.memberDetail, payload)
      yield put({ type: 'updateData', payload: { detail } })
    },
    *memberUpdate({ payload }, { call }) {
      yield call(userServices.memberUpdate, payload)
      message.success('update success')
      router.push('/admin/member/')
    },
    *memberSave({ payload }, { call }) {
      const { password, confirm_password, ...other } = payload
      const parmas = {
        password: MD5(password),
        confirm_password: MD5(confirm_password),
      }
      yield call(userServices.memberSave, { ...parmas, ...other })
      message.success('add success')
      router.push('/admin/member/')
    },
    // 重置用户密码
    *memberPasswordReset({ payload }, { call, put, select }) {
      const { password, confirm_password, ...other } = payload
      const parmas = {
        password: MD5(password),
        confirm_password: MD5(confirm_password),
      }
      yield call(userServices.memberPasswordReset, { ...parmas, ...other })
      yield put({ type: 'updateData', payload: { visible: false } })
      message.success('password reset success!')
    },
  },

  reducers: {
    // 表格数据 || Filter
    updateData(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}