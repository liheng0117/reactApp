import * as reportsServices from '@/services/report'
import { offerPageList } from '@/services/offer'
import * as billingServices from '@/services/billing'
import { pathToRegexp, qs, _ } from '@/utils'
import { COLUMNS, FILTER, BUTTONLIST, multiOptionFilter } from '@/constants/reports'
import { message } from '@/components'
import { bounsColumns, orderColumns, summaryColumns } from '@/constants/reports'

// 接口列表 对照表
// const pathObj = {
//   '/reports/summary': 'report-summary',
//   '/admin/reports/summary': 'report-summary',
//   '/reports/order': 'reports-order',
//   '/reports/bouns': 'reports-bonus',
// }

// // Columns 对照表
// const objColumns = {
//   '/reports/bouns': bounsColumns,
//   '/reports/order': orderColumns,
//   '/reports/summary': summaryColumns,
// }

// // Filter 对照表
// const filterList = {
//   '/reports/summary': FRONTEND.summaryFilter,
//   '/reports/order': FRONTEND.orderFilter,
//   '/reports/bouns': FRONTEND.bounsFilter,
// }


// // checked 初始化选中列表
// const setChecked = (list, optionArr = []) => {
//   list.forEach(ls => ls.checked && optionArr.push(ls.dataIndex) )
//   return optionArr
// }

export default {
  namespace: 'reports',
  state: {
    classes: 'summary', // 页面分类
    pagination: {}, // 分页信息
    list: [], // 表格数据
    filter: [], // filter
    multiOption: [],  // 复选器,
    multiValues: [], // 复选器选择的值
    multiValuesClone: [], // 复选器选择的值
    summaryChecked: [],  // checkbox 选中列表
    columns: [],  // 动态获取当前使用的 Columns
    columnsClone: [],  // 动态获取当前使用的 Columns
    selectedRowKeys: [] // table 批量操作
  },

  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname }) => {
        let regexp = pathToRegexp('*/reports/:type').exec(pathname)
        if (regexp) {
          let [path, platform, classes ] = regexp
          const { location } = history
          platform = !!platform ? 'frontend' : 'backend'
          let columns = COLUMNS[classes] || []
          columns = columns.filter(d => '$platform' in d ? (d.$platform !== platform) : true)
          let multiOption = columns.map(d => ({ name: d.title, value: d.dataIndex }))
          let multiValues = columns.filter(d => ('_visible' in d && d._visible)).map(d => d.dataIndex)
          let filter = FILTER[classes].filter(d => '$platform' in d ? (d.$platform !== platform) : true) || []
          let buttonlist = platform != 'frontend' ? [] : BUTTONLIST[classes]|| []
          let group_by = []
          Object.keys(multiOptionFilter).map(k => {
            multiValues.includes(k) && group_by.push(multiOptionFilter[k])
          })
          classes != 'summary' && localStorage.removeItem('summaryStorage')
          classes === 'summary' && !location.search && dispatch({ type: 'updateState', payload: { columns, multiValues, group_by }})
          classes !== 'summary' && dispatch({ type: 'updateState', payload: { columns, multiValues }})
          dispatch({ type: 'updateState', payload: { classes, multiOption, filter, buttonlist, columnsClone: columns, multiValuesClone: multiValues }})
          dispatch({ type: 'fetch', classes, regexp, payload: {} })

        }
      })
    }
  },

  effects: {
    *fetch({ classes, payload }, { call, put, select }) {
      const search = yield select(state => state.routing.location.search)   
      const group_by = yield select(state => state.reports.group_by)  
      const params = qs.parse(search, { ignoreQueryPrefix: true })
      payload = classes === 'summary' ? { group_by, ...payload } : payload
      let { list, ...pagination } = yield call(reportsServices[classes], {...params, ...payload}) 
      yield put({ type: 'updateState', payload: { list, pagination } })
    },
    // summary 更新 columns
    *doCloumns({ payload }, { put, select }) {
      let reports = yield select(s => s.reports)
      let { columns, columnsClone } = reports
      columns = columns.length ? columns : columnsClone
      columns = columns.map(d => d.dataIndex && payload.includes(d.dataIndex) ? { ...d, _visible: true } : { ...d, _visible: false })
      console.log('afsfs', columns,payload)
      yield put({ type: 'updateState', payload: { columns, multiValues: payload } })
    },
    *download ({ payload }, { call, put, select }) {
      const reports = yield select(state => state.reports)
      const { group_by, classes } = reports
      payload =  { group_by, ...payload, filename: classes.replace(classes[0],classes[0].toUpperCase())}
      const data = yield call(reportsServices[classes], payload)
    },
    *add ({ payload }, { call, put, select }) {
      let reports = yield select(s => s.reports)
      const { classes, list, selectedRowKeys } = reports
      const { type, result } = payload
      let params = result
      if(type === 'createBilling'){
        let idArr = classes === 'bonus' ? 
                    { bonus_id: selectedRowKeys.map(v => list[v].bonus_id)} : 
                    { order_id: selectedRowKeys.map(v => list[v].order_id)}
        params = { ...result, ...idArr }
      }
      console.log(params)
      yield call(reportsServices[type],params)
      yield put({ type: 'fetch', classes, payload: {} })
      yield put({ type: 'updateState', payload: { visible: false, selectedRowKeys: [] } })
      message.success('add success')
    },
    *modalShow ({ payload }, { put, select }) {
      const { add_type, order_bonus_extro, billing_type } = payload
      let data = yield select(s => s.reports)
      add_type === 'bonus' && (yield put({ type: 'updateState', payload: {visible: add_type, order_bonus_extro } }))
      if(add_type === 'billing'){
        const { selectedRowKeys, list, classes } = data
        let clone = selectedRowKeys.map( v => list[v])
        const affiliate_id = _.findIndex(clone, v => v.affiliate_id != clone[0].affiliate_id)
        const bonus_type = _.findIndex(clone, v => v.bonus_type != clone[0].bonus_type)
        const billing_code = _.findIndex(clone, v => v.billing_code)
        const order_status = _.findIndex(clone, v => v.order_status !== 1)
        switch (true) {
          case selectedRowKeys.length < 1:
            message.error('please select item')
            break;
          case billing_code != -1:
            message.error('Orders that already have billing ID cannot be generated again')
            break;
          case order_status != -1 && classes === 'order':
            message.error(`Order ID is ${clone[order_status].order_no} order status is not Confirmed, unable to generate Billing`)
            break;
          case affiliate_id != -1:
            message.error('affiliate_id is not same')
            break;
          case bonus_type != -1:
            message.error('type is not same')
            break;
          default:
            let idArr = classes === 'bonus' ? 
                    { bonus_id: clone.map(v => v.bonus_id)} : 
                    { order_id: clone.map(v => v.order_id)}
            yield put({ 
              type: 'fetchbillingPreview', 
              payload: {
                visible: add_type,...idArr, 
                billing_type: billing_type ? billing_type : clone[0].bonus_type === 1 ? 3 : 2
              }
            })
        }
      }
    },
    *fetchBillingDetail({ payload }, { call, put }) {
      const billing_detail = yield call(billingServices.billingDetail, payload)
      let { offer_list, total_amount } = billing_detail
      if(offer_list){
        offer_list =  offer_list.concat([{
          amount: total_amount,
          offer_code: 'Total Amount'
        }])
      }
      yield put({ 
        type: 'updateState', 
        payload: { 
          billing_detail: { ...billing_detail, isDetail: true, offer_list}, 
          visible: 'billing',
        } 
      })
    },
    *fetchbillingPreview({ payload }, { call, put }) {
      const { visible, ...other } = payload
      const detail = yield call(billingServices.billingPreview, other)
      let { offer_list, total_amount } = detail
      if(offer_list){
        const repeat_order_count = payload.billing_type === 2 && _.reduce(offer_list, (sum, n) => Number(n.repeat_order_count) + sum, 0) 
        offer_list =  offer_list.concat([{
          amount: total_amount,
          repeat_order_count,
          offer_code: 'Total Amount'
        }])
      }
      yield put({ 
        type: 'updateState', 
        payload: {
          visible,
          billing_detail: {
            ...detail,
            billing_type: payload.billing_type,
            offer_list
          }
        } 
      })
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state, 
        ...payload
      }
    }
  }
}