import { qs, memory } from '@/utils'
import * as userServices from '@/services/user'
export default {
  namespace: 'forgetPassword',
  state: {
    progress: 'verification', // 重设密码进行到的阶段 
    findPasswordType: 'email',
    current: {
      verificationEmail: 0,
      passwordReset: 1,
      finished: 2,
    },
    email: null
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen((location) => {
        const query = qs.parse(location.search, { ignoreQueryPrefix: true })
        let { token, email } = query
        let pullUser = memory.pullUser() ? memory.pullUser() : {}
        token && memory.pushUser(Object.assign(pullUser,{ authorization: `bearer ${token}` }))
        email && dispatch({ 
          type:'updateState', 
          payload: { progress: 'passwordReset', email } 
        })
      })
    }
  },
  effects: {
    // 
    *forgetCheck({ payload }, { call, put }) {
      yield call(userServices.sendPasswordEmail, payload )
      yield put({
        type: 'updateState',
        payload: { progress: 'verificationEmail', email: payload.email }
      })
    },
    // 邮件方式更新密码
    *updatePasswordByEmail({ payload }, { call, put }) {
      yield call(userServices.passwordReset, payload )
      yield put({ type: 'updateState', payload: { progress: 'finished' } })
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
