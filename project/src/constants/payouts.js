import { moment, formatLocale, motor, numeral } from '@/utils'
import { Badge } from '@/components'
const COLUMNS = {
    default: [
    { title: formatLocale('payouts.list.columns.ID'), dataIndex: 'billing_code', },
    { title: formatLocale('payouts.list.columns.Date'), dataIndex: 'create_time',
      render: v => v && moment.unix(Number(v)).format('LLL')
    },
    { title: formatLocale('payouts.list.columns.Type'), dataIndex: 'billing_type', 
      render: v => motor(v).format('billing_type')
    },
    { title: formatLocale('payouts.list.columns.Period'), dataIndex: 'period_time', 
      render: v => v && (
        <div>
          {moment.unix(Number(v[0])).format('LLL')}
          -
          {moment.unix(Number(v[1])).format('LLL')}
        </div>
      )
    },
    { title: formatLocale('payouts.list.columns.Amount'), dataIndex: 'total_amount',
      render: v => numeral(v).format('$0,0.00')
    },
    { title: formatLocale('payouts.list.columns.Payment'), dataIndex: 'payment_method', },
    { 
      title: formatLocale('payouts.list.columns.Status'), 
      dataIndex: 'billing_status', 
      render: v => {
        const s = {
          '1': 'success',
          '-1': 'error',
          '0': 'processing'
        }
        return <Badge status={s[v]} text={motor(v).format('billing_status')} />
      }
    },
    { 
      title: formatLocale('payouts.list.columns.Detail'), 
      dataIndex: 'Detail', 
      render: (v, d) => <span className='detail' disabled={d.billing_type === 3}>View</span>,
    },
  ],

  1: [
    { title: formatLocale('payouts.pop.payoutsDetail.Offer'), dataIndex: 'offer_name' },
    { title: formatLocale('payouts.pop.payoutsDetail.Payout'), dataIndex: 'payout',
      render: v => v && numeral(v).format('$0,0.00')
    },
    { title: formatLocale('payouts.pop.payoutsDetail.ConfirmedOrder'), dataIndex: 'conversions', },
    { title: formatLocale('payouts.pop.payoutsDetail.Amount'), dataIndex: 'amount',
      render: v => v && numeral(v).format('$0,0.00') 
    },
  ], 
    2: [
    { title: formatLocale('payouts.pop.payoutsDetail.Offer'), dataIndex: 'offer_name' },
    { title: formatLocale('payouts.pop.payoutsDetail.Payout'), dataIndex: 'payout',
      render: v => v && numeral(v).format('$0,0.00')
    },
    { title: formatLocale('payouts.pop.payoutsDetail.RepeatOrder'), dataIndex: 'repeat_order_count', },
    { title: formatLocale('payouts.pop.payoutsDetail.Amount'), dataIndex: 'amount',
      render: v => numeral(v).format('$0,0.00')
    },
  ]
}
const FILTER = [
  {
    id: 'date',  // 后台参数
    label: 'Period',  // 表头名字
    type: 'RangePicker',
    onPull: v => v.map(m => m.unix()),
    onPush: v => v && v.map(t => moment.unix(Number(t)))
  },
  {
    id: 'billing_type',  // 后台参数
    label: 'Type',  // 表头名字
    type: 'Select', // 表单类型
    disabled: false,
    option: motor('billing_type').valueOf(),
  },
  {
    id: 'billing_status',  // 后台参数
    label: 'Status',  // 表头名字
    type: 'Select', // 表单类型
    option: motor('billing_status').valueOf().filter( v => Number(v.value) != -1),
  },
]

export {
  FILTER,
  COLUMNS
} 
