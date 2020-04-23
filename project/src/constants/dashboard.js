import { formatMessage } from 'umi-plugin-locale'
import { moment, motor, tools, numeral } from '@/utils'
import { Badge } from '@/components'

export const REVENUE_COLUMNS = [
  { title: formatMessage({ id: 'common.today' }), dataIndex: 'today' }, 
  { title: formatMessage({ id: 'common.yesterday' }), dataIndex: 'yesterday' },
  { title: formatMessage({ id: 'common.week' }), dataIndex: 'last_7d' },
  { title: formatMessage({ id: 'common.month' }), dataIndex: 'last_30d' },
  { title: formatMessage({ id: 'common.year' }), dataIndex: 'this_year' }
]
export const RATE_COLUMNS = [
  { title: formatMessage({ id: 'common.week' }), dataIndex: 'conversion_rate', suffix: '%' }
]
export const BOUNS_COLUMNS = [
  { title: 'This Month', dataIndex: 'this_month', prefix: '$'},
  { title: 'Last Month', dataIndex: 'last_month', prefix: '$' },
  { title: 'This Year', dataIndex: 'this_year', prefix: '$' },
]
// 前台offer 列表头配置
export const OFFERS_COLUMNS = [
  {
    width: 120,
    title: 'Offer',
    dataIndex: 'offer_code',
  }, {
    width: 120,
    title: 'Payout',
    dataIndex: 'payout',
    render: v => numeral(v).format('$0,0.00')
  }, {
    title: 'Clicks',
    dataIndex: 'clicks',
    render: v => numeral(v).format('0,0')
  }, {
    title: 'Orders',
    dataIndex: 'orders',
    render: v => numeral(v).format('0,0')
  }, {
    width: 200,
    title: <span>Conversions<br/>(Confirmed Order)</span>,
    dataIndex: 'conversions',
    render: v => numeral(v).format('0,0')
  }, {
    title: 'Revenue',
    dataIndex: 'revenue',
    render: v => numeral(v).format('$0,0.00')
  }, {
    title: 'EPC',
    dataIndex: 'epc',
    render: v => numeral(v).format('$0,0.00')
  }, {
    title: 'Repeat Orders',
    dataIndex: 'repeat_orders',
  }, {
    title: <span>Bonus from <br/>repeat order</span>,
    dataIndex: 'repeat_orders_bonus',
  }, 
]
// 前台payout 列表头配置
export const PAYOUT_COLUMNS = [
  {
    title: formatMessage({ id: 'dashbord.payout.date' }),
    dataIndex: 'create_time',
    render: d => d && moment.unix(d).format('LLL')
  }, {
    title: formatMessage({ id: 'dashboard.payout.period' }),
    dataIndex: 'period_time',
    render(item) {
      return Array.isArray(item) && item.map(d => moment.unix(d).format('LLL')).join('-')
    }
  },
  {
    title: formatMessage({ id: 'dashboard.payout.amount' }),
    dataIndex: 'total_amount',
    render: v => numeral(v).format('$0,0.00')
  }, {
    title: formatMessage({ id: 'dashboard.payout.method' }),
    dataIndex: 'payment_method',
  }, {
    title: formatMessage({ id: 'dashboard.payout.status' }),
    dataIndex: 'billing_status',
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
export const PERIOD = [
  { key: '1', label: 'Today' },
  { key: '2', label: 'Yestoday' },
  { key: '3', label: 'Last 7 Days' }
]