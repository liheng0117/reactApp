import { pathToRegexp, numeral, qs } from '@/utils'
import * as payoutServices from '@/services/payout'

export default {
  namespace: 'payouts',

  state: {
    tableBillData: [],
    tableData: [],
    tablePayoutsData: [],
    tableDetailData: [],
  },

  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const regexp = pathToRegexp('/payouts').exec(pathname)

        if (regexp) {
          const tableBillData = [
            {
              OfferID: '10298',
              Offer: 'ABC. comABC comABC comABC ',
              LTV: 'ABC.com',
              Bonus: 'Global',
            },
          ]

          const tableData = [
            {
              ID: '10298',
              Date: 'ABC.com',
              Type: 'ABC.com',
              Period: 'Global',
              Amount: 'Offer Name',
              Payment: 'abc',
              Status: 'Jun 11,2019',
              Detail: 'View',
            },
          ]

          const tablePayoutsData = [
            {
              OfferID: '102981029810029810298102981002981029810298100298',
              Offer: 'ABC.com',
              Payout: 'ABC.com',
              ConfirmedOrder: 'Global',
              Amount: 'Offer',
            },
            {
              OfferID: 'sfs',
              Offer: 'ABC.com',
              Payout: 'ABC.com',
              ConfirmedOrder: 'Global',
              Amount: 'Offer',
            },
          ]

          // dispatch({ type: 'doTable', payload: { tableData } })
          dispatch({ type: 'doTable', payload: { tableBillData } })
          dispatch({ type: 'doTable', payload: { tablePayoutsData } })
          dispatch({ type: 'fetch' })
        }
      })
    }
  },

  effects: {
    *doTable ({ payload }, { call, put, select }) {
      yield put({ type: 'updateData', payload })
    },
    *fetch ({ payload }, { call, put, select }) {
      const search = yield select(state => state.routing.location.search)
      const params = qs.parse(search, { ignoreQueryPrefix: true })
      const data = yield call(payoutServices.payoutList, { ...params, ...payload })
      let { list, ...pagination } = data
      yield put({ type: 'updateData', payload: { tableData: list, pagination } })
    },
    *getDetail ({ payload }, { call, put }) {
      const data = yield call(payoutServices.payoutDetail, payload)
      const { list, total_amount } = data
      const tableDetailData = list.concat([{
        offer_code: 'Total Amount',
        amount: `${numeral(total_amount).format('$0,0.00')}`,
      }])
      yield put({ type: 'updateData', payload: { tableDetailData } })
    },
  },

  reducers: {
    // 表格数据 || Filter
    updateData(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}