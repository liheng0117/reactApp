import router from 'umi/router'
import { tools, MD5, pathToRegexp, memory } from '@/utils'
import * as userServices from '@/services/user'
import { message } from '@/components'
import { kMaxLength } from 'buffer';
export default {
  namespace: 'user',
  state: {
    value: {
      email: null,
      password: null,
    },
    error: null,
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {   
        let regexp = pathToRegexp('/user/register').exec(pathname)
        if (regexp) {
          let payload = {
            value: {
              email: null,
              password: null,
            }
          }
          dispatch({ type: 'updateState', payload: payload })
      
        }
      })
    }
  },
  effects: {
    *dologin({ payload, platform }, { call, put, select }) {
      try {
        const cfgs = yield select(state => state.cfgs)
        const { password, ...ohter} = payload
        const data = yield call(userServices.login, { password: MD5(password), ...ohter })
        const { access_token: authorization, timezone_id, ...rest } = data

        let info = {
          timezone_id,
          ...rest,
          platform,
          authorization,
          zone: timezone_id ? cfgs.timezone[timezone_id].en_name : 'Asia/Shanghai'
        } 
        yield put.resolve({ type: 'app/updateState', payload: info })
        memory.pushUser(info) // 缓存登陆的用户信息
        router.push(window.g_prefix_route)
      } catch (error) {
        yield put({ type: 'updateState', payload: { error } })
      }
    },
    *register({ payload }, { call }) {
      const { password, confirm_password, ...other } = payload[1]
      let params = {
        affiliate_detail: payload[0],
        user_detail: {
          password: MD5(password),
          confirm_password: MD5(confirm_password),
          ...other
        },
      }
      yield call(userServices.register, params)
      message.success('sign up success, please login')
      router.push('/user/login')
    },
    *adminResetPassword({ payload }, { call, put, select }) {
      const params = {
        email: payload.email,
        password: MD5(payload.password),
        confirm_password: MD5(payload.confirm_password)
      }
      yield call(userServices.adminPasswordUpdate, params)
      message.success('password reset success!')
      router.push('/admin/dashboard')
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
