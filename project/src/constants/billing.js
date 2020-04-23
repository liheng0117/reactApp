import { moment, motor, numeral, formatLocale } from '@/utils'
import { Badge } from '@/components'

export const MODAL_COM_TABLE = [
  { title: formatLocale('billing.detail.columns.offer_id'), dataIndex: 'offer_code' },
  { title: formatLocale('billing.detail.columns.offer'), dataIndex: 'offer_name' },
]
export const MODAL_COM_TABLE_2 = [
  { title: formatLocale('billing.detail.columns.repeat_orders'), dataIndex: 'repeat_order_count' },
  { title: formatLocale('billing.detail.columns.amount'), dataIndex: 'amount', render: v => numeral(v).format('$0,0.00')},
]
export const MODAL_COM_TABLE_1 = [
  { title: formatLocale('billing.detail.columns.payout'), dataIndex: 'payout' },
  { title: formatLocale('billing.detail.columns.confirmed_orders'), dataIndex: 'conversions' },
  { title: formatLocale('billing.detail.columns.amount'), dataIndex: 'amount', render: v =>  numeral(v).format('$0,0.00') },
]
export const MODAL_COM_FORM = [
  { 
    label: formatLocale('billing.detail.period'), 
    id: 'period_time', 
    type: 'RangePicker',
    onPull: v => v.map(m => m.unix()),
    onPush: v => v && v.map(t => moment.unix(Number(t)))
  }, 
  { 
    label: formatLocale('billing.detail.memo'), 
    id: 'memo', 
    type: 'TextArea',
  }, 
]
export const MODAL_COM_FORM_TEXT = data => {
  const arr = [
    { 
      label: formatLocale('billing.detail.affiliate_id'), 
      id: 'affiliate_code', 
      type: 'Text',
      props: {
        children: data.affiliate_code
      }
    }, 
    { 
      label: formatLocale('billing.detail.affiliate_name'), 
      id: 'affiliate_name', 
      type: 'Text',
      props: {
        children: data.affiliate_name
      }
    }, 
  ]
  return arr
}

export const DEFAULT_COM = [
  { title: formatLocale('billing.columns.id'), dataIndex: 'billing_code', sorter: true, width: 200, },
  { title: formatLocale('billing.columns.period'), dataIndex: 'period_time', sorter: true, width: 260,
    render: v => {
      return (
        <div>
          {moment.unix(Number(v[0])).format('LLL')}
          -
          {moment.unix(Number(v[1])).format('LLL')}
        </div>
      )
    }
  },
  { title: formatLocale('billing.columns.affiliate_id'), dataIndex: 'affiliate_code', sorter: true, width: 200, },
  { title: formatLocale('billing.columns.affiliate_name'), dataIndex: 'affiliate_name', sorter: true, width: 200, },
  { title: formatLocale('billing.columns.billing_type'),  dataIndex: 'billing_type', sorter: true, width: 200,
    render: v => motor(v).format('billing_type')
  },
  { title: formatLocale('billing.columns.amount'), dataIndex: 'total_amount', sorter: true, width: 200,
   render: v => numeral(v).format('$0,0.00')  
  },
  { title: formatLocale('billing.columns.paid_date'), dataIndex: 'paid_time',sorter: true, width: 200,
    render: v => v && moment.unix(Number(v)).format('LLL')
  },
  { title: formatLocale('billing.columns.paid_status'), dataIndex: 'billing_status', sorter: true, width: 200,
    render: v => {
      const status = {
        '1': 'success',
        '-1': 'error',
        '0': 'processing'
      }
      return <Badge status={status[v]} text={motor(v).format('billing_status')} />
    }
  },
]

export const FILTER =[
  {
    id: 'affiliate_id',  // 后台参数
    label: formatLocale('billing.filter.id'),  // 表头名字
    type: 'Search', // 表单类型
    placeholder: formatLocale('billing.filter.id'),
    option: [],
    props: {
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'affiliate_name', 
        value, 
        _v: 'affiliate_id', 
        _n: 'affiliate_name'
      })
    },
  },
  {
    id: 'billing_type',  // 后台参数
    label: formatLocale('billing.filter.billing_type'),  // 表头名字
    type: 'Select', // 表单类型
    placeholder: formatLocale('billing.filter.billing_type'),
    option: motor('billing_type').valueOf(),
  },
  {
    id: 'billing_status',  // 后台参数
    label: formatLocale('billing.filter.status'),  // 表头名字
    type: 'Select', // 表单类型
    placeholder: formatLocale('billing.filter.status'),
    option: motor('billing_status').valueOf(),
  },
  {
    id: 'date',  // 后台参数
    label: formatLocale('billing.filter.period'),  // 表头名字
    type: 'RangePicker',
    initialValue: [moment().startOf('month'), moment().endOf('month')],
    onPull: v => v.map(m => m.unix()),
    onPush: v => v && v.map(t => moment.unix(Number(t)))
  }
]