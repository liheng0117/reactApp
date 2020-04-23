import * as userServices from '@/services/user'
import { message } from '@/components'
import { pathToRegexp, MD5 } from '@/utils'

export default {
  namespace: 'account',
  state: {
    editAccount: false,
    // editBilling: false,
    billing_detail: {},
    affiliate_detail: {},
    timezone_id: null,
    user_detail: {},
    modalVisbile: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathToRegexp('/account').exec(pathname)) {
          dispatch({ type: 'detailAccount' })
        }else{
          dispatch({ type: 'updateState', payload: { editAccount: false } })
        }
        if (pathToRegexp('/account/billing').exec(pathname)) {
          dispatch({ type: 'detailBilling' })
        }else{
          // dispatch({ type: 'updateState', payload: { editBilling: false } })
        }
      })
    }
  },
  effects: {
    *detailAccount({ payload }, { call, put }) {
      const data = yield call(userServices.accountSettings, payload)
      const { user_detail, affiliate_detail, timezone_id } = data
      yield put({ 
        type: 'updateState', 
        payload: { user_detail, affiliate_detail, timezone_id }
      })
    },
    *updateAccount({ payload }, { call, put }) {
      const { affiliate_detail, user_detail, timezone_id } = payload
      yield call(userServices.accountSettingsUpdate, payload)
      message.success('account info update success!')
      yield put({ 
        type: 'updateState', 
        payload: {
          editAccount: false,
          affiliate_detail: affiliate_detail ? affiliate_detail : {}, 
          user_detail: user_detail ? user_detail : {}, 
          timezone_id        
        }
      })
    },
    *passwordChange({ payload }, { call, put, select }) {
      const user_detail = yield select(state => state.account.user_detail)
      const params = {
        email: user_detail.email,
        origin_password: MD5(payload.origin_password),
        password: MD5(payload.password),
        confirm_password: MD5(payload.confirm_password)
      }
      yield call(userServices.accountPasswordUpdate, params)
      message.success('password update success')
      yield put({ 
        type: 'updateState', 
        payload: {
          modalVisbile: false
        }
      })
    },
    *detailBilling({ payload }, { call, put }) {
      const data = yield call(userServices.accountBilling, payload)
      yield put({ type: 'updateState', payload: { billing_detail: data ? data : {} } })
    },
    // *updateBilling({ payload }, { call, put }) {
    //   yield call(userServices.accountBillingUpdate, payload)
    //   yield put({ 
    //     type: 'updateState', 
    //     payload: {
    //       editBilling: false,
    //       billing_detail: payload
    //     }
    //   })
    //   message.success('Billing update success!')
    // },
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
