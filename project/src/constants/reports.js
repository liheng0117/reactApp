import { motor, numeral, formatLocale, moment } from '@/utils'
import { MODAL_COM_TABLE, MODAL_COM_TABLE_1, MODAL_COM_TABLE_2 } from './billing'
const addonBefore = [
  { value: '1', name: 'SUB ID 1' },
  { value: '2', name: 'SUB ID 2' },
  { value: '3', name: 'SUB ID 3' },
  { value: '4', name: 'SUB ID 4' },
  { value: '5', name: 'SUB ID 5' },
]
const getDiv = (text, width = '100') => (
  <div style={{ minWidth: `${width}px` }}>
    {text}
  </div>
  )
// 所有表格头配置
export const SUMMARY_COLUMNS = [
  {
    title: formatLocale('report.backend.summary.list.columns.OfferID'),
    dataIndex: 'offer_code',
    sorter: true,
    _visible: true,
    render: text => getDiv(text),
  }, {
    title: formatLocale('report.backend.summary.list.columns.OfferName'),
    dataIndex: 'offer_name',
    sorter: true,
    _visible: true,
    render: text => getDiv(text, '130'),
  }, {
    title: formatLocale('report.backend.summary.list.columns.OfferPage'),
    dataIndex: 'offer_page_name',
    sorter: true,
    _visible: false,
    render: text => getDiv(text, '150'),
  }, { 
    $platform: 'backend',
    title: formatLocale('report.backend.summary.list.columns.AffName'),
    dataIndex: 'affiliate_name', 
    sorter: true, 
    _visible: true,
    render: text => getDiv(text),
  }, { 
    title: formatLocale('report.backend.summary.list.columns.Goal'), 
    dataIndex: 'goal_id', 
    sorter: true, 
    _visible: false,
    render: text => text ? getDiv(motor(text).format('postback_goal'), 150) : getDiv('', 150)
  }, { 
    title: formatLocale('report.backend.summary.list.columns.Country'),
    dataIndex: 'country_id', 
    sorter: true, 
    _visible: false,
    render: text => text ? getDiv(motor(text).format('country.%.en_name'), 150) : getDiv('', 150)
  }, { 
    title: formatLocale('report.backend.summary.list.columns.Category'), 
    dataIndex: 'category_id', 
    sorter: true, 
    _visible: false,
    render: text => text ? getDiv(motor(text).format('offer_category_id'), '150') : getDiv('', 150),
  }, { 
    $platform: 'frontend',
    title: formatLocale('report.order.list.columns.subID1'), 
    dataIndex: 'sub_id_1', 
    _visible: false,
    sorter: true ,
    render: text => getDiv(text, '150'),
  }, { 
    $platform: 'frontend',
    title: formatLocale('report.order.list.columns.subID2'),
    dataIndex: 'sub_id_2', 
    _visible: false,
    sorter: true,
    render: text => getDiv(text, '150'),
  }, { 
    $platform: 'frontend',
    title: formatLocale('report.order.list.columns.subID3'), 
    dataIndex: 'sub_id_3', 
    _visible: false,
    sorter: true,
    render: text => getDiv(text, '150'),
  }, { 
    $platform: 'frontend',
    title: formatLocale('report.order.list.columns.subID4'), 
    dataIndex: 'sub_id_4', 
    _visible: false,
    sorter: true,
    render: text => getDiv(text, '150'),
  }, { 
    $platform: 'frontend',
    title: formatLocale('report.order.list.columns.subID5'), 
    dataIndex: 'sub_id_5', 
    _visible: false,
    sorter: true,
    render: text => getDiv(text, '150'),
  }, { 
    title: formatLocale('report.backend.summary.list.columns.Clicks'), 
    dataIndex: 'clicks', 
    sorter: true, 
    _visible: true,
    render: v => numeral(v).format('0,0'),
  }, { 
    title: formatLocale('report.backend.summary.list.columns.Orders'), 
    dataIndex: 'orders', 
    sorter: true, 
    _visible: false,
  }, { 
    title: formatLocale('report.backend.summary.list.columns.ClickToOrderRate'), 
    dataIndex: 'order_click_rate', 
    sorter: true, 
    _visible: false,
    render: text => getDiv(numeral(text).format('%'), '250'),
  }, { 
    $platform: 'backend',
    title: formatLocale('report.backend.summary.list.columns.EPC'), 
    dataIndex: 'epc', 
    sorter: true, 
    _visible: true,
    render: v => numeral(v).format('$0,0.00') 
  }, { 
    title: formatLocale('report.backend.summary.list.columns.ConversionsConfirmedOrder'), 
    dataIndex: 'conversions', 
    sorter: true, 
    _visible: true,
    render: text => getDiv(text, '150'),
  }, { 
    title: formatLocale('report.backend.summary.list.columns.OrderToConversionRate'), 
    dataIndex: 'conversion_order_rate', 
    sorter: true, 
    _visible: false,
    render: text => getDiv(numeral(text).format('%'), '130'),
  }, { 
    title: formatLocale('report.backend.summary.list.columns.ConversionRate'),
    dataIndex: 'conversion_click_rate', 
    sorter: true, 
    _visible: true,
    render: text => getDiv(numeral(text).format('%'), '150'),
  }, 
  // { 
  //   $platform: 'backend',
  //   title: formatLocale('report.backend.summary.list.columns.Payout'), 
  //   dataIndex: 'payout', 
  //   sorter: true, 
  //   _visible: true,
  //   render: v => numeral(v).format('$0,0.00')  
  // }, 
  { 
    title: formatLocale('report.backend.summary.list.columns.Revenue'), 
    dataIndex: 'revenue', 
    sorter: true, 
    _visible: true,
    render: text => text ? getDiv(numeral(text).format('$0,0.00'), '120') : getDiv('', 120)
  }, { 
    title: formatLocale('report.backend.summary.list.columns.RepeatOrders'), 
    dataIndex: 'repeat_orders', 
    sorter: true, 
    _visible: true,
    render: text => getDiv(text, '200'), 
  }, { 
    title: formatLocale('report.backend.summary.list.columns.BonusFromRepeatOrders'), 
    dataIndex: 'repeat_orders_bonus', 
    sorter: true, 
    _visible: true, 
    render: text => text ? getDiv(numeral(text).format('$0,0.00'), '125') : getDiv('', 125)
  }, { 
    title: formatLocale('report.backend.summary.list.columns.TotalRevenue'), 
    dataIndex: 'total_revenue', 
    sorter: true, 
    _visible: true,
    render: v => v ? getDiv(numeral(v).format('$0,0.00'), '150') : getDiv('', 150)
  }
]
export const ORDER_COLUMNS = [
  { 
    title: formatLocale('report.order.list.columns.time'), 
    dataIndex: 'create_time', 
    sorter: true,
    render: v => v && getDiv(moment.unix(Number(v)).format('YYYY-MM-DD HH:mm:ss'), 200)
  }, { 
    title: formatLocale('report.order.list.columns.orderID'), 
    dataIndex: 'order_no', 
    sorter: true,
    render: v => getDiv(v, 200),
  }, { 
    title: formatLocale('report.order.list.columns.offer'), 
    dataIndex: 'offer_name', 
    sorter: true,
    render: (v,k) => v && getDiv(`(${k.offer_code})${v}`, 200),
  }, { 
    title: formatLocale('report.order.list.columns.offerPage'), 
    dataIndex: 'offer_page_name', 
    sorter: true,
    render: v => getDiv(v, 180),
  }, { 
    title: formatLocale('report.order.list.columns.country'), 
    dataIndex: 'country_id', 
    sorter: true,
    render: v => v && getDiv(motor(v).format('country.%.en_name'), 130)
  }, { 
    title: formatLocale('report.order.list.columns.payout'), 
    dataIndex: 'payout', 
    sorter: true,
    render: v => getDiv(numeral(v).format('$0,0.00'), 100)
  }, { 
    title: formatLocale('report.order.list.columns.orderStatus'), 
    dataIndex: 'order_status', 
    sorter: true, 
    render: v => getDiv(motor(v).format('order_status'), 120)
  }, { 
    title: formatLocale('report.backend.summary.list.columns.RepeatOrders'), 
    dataIndex: 'repeat_order_count', 
    sorter: true, 
    render: v => getDiv(v, 120)
  },
  { 
    $platform: 'backend',
    title: formatLocale('report.order.list.columns.confirmedTime'), 
    dataIndex: 'confirmed_time', 
    sorter: true, 
    render: v => v ? getDiv(moment.unix(v).format('LLL'), 200) : getDiv('', 200)
  },
  { 
    $platform: 'backend',
    title: formatLocale('report.backend.summary.list.columns.BonusFromRepeatOrders'), 
    dataIndex: 'repeat_orders_bonus', 
    sorter: true, 
    render: v => v ? getDiv(numeral(v).format('$0,0.00'), 125) : getDiv('', 125)
  }, { 
    $platform: 'backend',
    title: formatLocale('report.backend.summary.list.columns.AffName'),
    dataIndex: 'affiliate_name', 
    sorter: true,
    render: v => v ? getDiv(v, 150) : getDiv('', 150)
  }, { 
    $platform: 'frontend',
    title: formatLocale('report.backend.summary.list.columns.Revenue'),
    dataIndex: 'revenue', 
    sorter: true,
    render: v => v ? getDiv(v, 150) : getDiv('', 150)
  }, { 
    title: formatLocale('report.order.list.columns.subID1'), 
    dataIndex: 'sub_id_1', 
    sorter: true,
    render: v => v ? getDiv(v, 250) : getDiv('', 250)
  }, { 
    title: formatLocale('report.order.list.columns.subID2'),
    dataIndex: 'sub_id_2', 
    sorter: true,
    render: v => v ? getDiv(v, 250) : getDiv('', 250)
  }, { 
    title: formatLocale('report.order.list.columns.subID3'), 
    dataIndex: 'sub_id_3', 
    sorter: true,
    render: v => v ? getDiv(v, 250) : getDiv('', 250)
  }, { 
    title: formatLocale('report.order.list.columns.subID4'), 
    dataIndex: 'sub_id_4', 
    sorter: true,
    render: v => v ? getDiv(v, 250) : getDiv('', 250)
  }, { 
    title: formatLocale('report.order.list.columns.subID5'), 
    dataIndex: 'sub_id_5', 
    sorter: true,
    render: v => v ? getDiv(v, 250) : getDiv('', 250)
  }, { 
    $platform: 'backend',
    title: formatLocale('report.order.list.columns.BillingID'),
    dataIndex: 'billing_code', 
    sorter: true, 
    render: (v,k) => v ? (
      <span
        style={{wordWrap: 'break-word', wordBreak: 'break-word', display: 'block', minWidth: '150px'}}
        className='report-aciton' 
        onClick={() => motor('reports/fetchBillingDetail').emitter({billing_id: k.billing_id})}
      >
        {v}
      </span>
    ) : getDiv('', 150)
  }, { 
    $platform: 'backend',
    title: formatLocale('common.action'),
    render: v => <span 
        className='report-aciton' 
        data-status={v.order_status != 1}
        onClick={() => motor('reports/modalShow').emitter({add_type:'bonus', order_bonus_extro: v})}
      >
        Add Bonus
      </span>
  }, 
]
export const BOUNS_CLUMNS = [
  { 
    title: formatLocale('report.Bonus.list.columns.Time'), 
    dataIndex: 'create_time', 
    sorter: true,
    render: v => v ? getDiv(moment.unix(v).format('LLL'), 180) : getDiv('', 180)
  }, { 
    title: formatLocale('report.Bonus.list.columns.BonusID'), 
    dataIndex: 'bonus_code', 
    sorter: true,
    render: v => getDiv(v, 180)
  }, { 
    $platform: 'backend',
    title: formatLocale('report.Bonus.list.columns.RelatedOrderID'), 
    dataIndex: 'related_order_no', 
    render: v => getDiv(v, 200),
    sorter: true 
  }, { 
    title: formatLocale('report.Bonus.list.columns.Type'), 
    dataIndex: 'bonus_type', 
    sorter: true, 
    render: v => v ? getDiv(motor(v).format('bonus_type'), 150) : getDiv('', 100)
  },{ 
    $platform: 'frontend',
    title: formatLocale('report.Bonus.list.columns.OfferID'), 
    dataIndex: 'offer_code', 
    sorter: true,
    render: v => getDiv(v, 150),
  }, { 
    $platform: 'frontend',
    title: formatLocale('report.Bonus.list.columns.Offer'), 
    dataIndex: 'offer_name', 
    sorter: true,
    render: v => getDiv(v, 180),
  }, { 
    $platform: 'backend',
    title: formatLocale('report.Bonus.list.columns.Offer'), 
    dataIndex: 'offer_name', 
    sorter: true,
    render: (v,k) => v && getDiv(`(${k.offer_code}${v})`, 200),
  }, { 
    $platform: 'frontend',
    title: formatLocale('report.backend.summary.list.columns.Country'),
    dataIndex: 'country_id', 
    sorter: true, 
    _visible: true,
    render: v => v ? getDiv(motor(v).format('country.%.en_name'), 150) : getDiv('', 150)
  }, { 
    $platform: 'frontend',
    title: formatLocale('report.Bonus.list.columns.Status'),
    dataIndex: 'bonus_status', 
    sorter: true, 
    _visible: true,
    render: v => getDiv(motor(v).format('bonus_status'), 150)
  }, { 
    $platform: 'backend',
    title: formatLocale('report.Bonus.list.columns.Affiliate'), 
    dataIndex: 'affiliate_name',
    sorter: true,
    render: v => getDiv(v, 150)
  }, { 
    title: formatLocale('report.Bonus.list.columns.RepeatOrder'), 
    dataIndex: 'repeat_order_count', 
    sorter: true,
    render: v => v ? getDiv(numeral(v).format('$0,0.00'), 130) : getDiv('', 130)
  }, { 
    title: formatLocale('report.Bonus.list.columns.Bonus'), 
    dataIndex: 'amount', 
    sorter: true,
    render: v => numeral(v).format('$0,0.00') 
  }, { 
    $platform: 'backend',
    title: formatLocale('report.Bonus.list.columns.BillingID'), 
    dataIndex: 'billing_code', 
    sorter: true,
    render: (v,k) => v ? (
      <span 
        className='report-aciton' 
        onClick={() => motor('reports/fetchBillingDetail').emitter({billing_id: k.billing_id})}
      >
        {v}
      </span>
    ) : null 
  }, { 
    title: formatLocale('report.Bonus.list.columns.Memo'), 
    dataIndex: 'memo',
    render: v => getDiv(v, 150)
  }
]
export const COLUMNS = {
  summary: SUMMARY_COLUMNS,
  order: ORDER_COLUMNS,
  bonus: BOUNS_CLUMNS
}
// 所有filter 配置
export const SUMMARY_FILTER = [
  {
    id: 'offer_id',
    label: formatLocale('report.backend.summary.filter.OfferIDName'),
    type: 'Search',
    props: {
      minWidth: '120',
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'offer_name', 
        value, 
        _v: 'offer_id', 
        _n: 'offer_name'
      })
    },
  }, {
    id: 'date',
    label: formatLocale('report.backend.summary.filter.Period'),
    type: 'RangePicker',
    onPull: v => v.map(m => m.unix()),
    onPush: v => v && v.map(t => moment.unix(Number(t)))
  }, { 
    $platform: 'frontend',
    id: 'timezone_id', 
    label: formatLocale('report.summary.list.filter.Timezone'),
    type: 'Select', 
    option: motor('timezone').valueOf('en_name'),
    props: {
      showSearch: true,
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  }, {
    id: 'goal_id',
    label: formatLocale('report.summary.list.columns.goal'),
    type: 'Select',
    placeholder: 'Goal',
    option: motor('postback_goal').valueOf()
  }, {
    id: 'offer_page_id',
    label: formatLocale('report.summary.list.filter.OfferPage'),
    type: 'Search',
    props: {
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'offer_page_name', 
        value, 
        _v: 'offer_page_id', 
        _n: 'offer_page_name'
      })
    }
  }, {
    $platform: 'backend',
    id: 'affiliate_id',
    label: formatLocale('report.backend.summary.filter.AffIDName'),
    type: 'Search',
    props: {
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'affiliate_name', 
        value, 
        _v: 'affiliate_id', 
        _n: 'affiliate_name'
      })
    }
  }, {
    id: 'country_id',
    label: formatLocale('report.Bonus.list.columns.Country'),
    type: 'Select',
    placeholder: 'Country',
    option: motor('country').valueOf('en_name'),
    props: {
      showSearch: true,
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  }, 
  {
    $platform: 'frontend',
    id: 'sub_id',
    label: formatLocale('report.summary.list.filter.SubID'),
    type: 'InputSelect',
    placeholder: 'SubID',
    props: {
      option: addonBefore
    },
  },
]
export const ORDER_FILTER = [
  {
    id: 'offer_id',
    label: formatLocale('report.summary.list.filter.OfferIDName'),
    type: 'Search',
    props: {
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'offer_name', 
        value, 
        _v: 'offer_id', 
        _n: 'offer_name'
      })
    }
  },
  {
    id: 'date',
    label: formatLocale('report.backend.summary.filter.Period'),
    type: 'RangePicker',
    onPull: v => v.map(m => m.unix()),
    onPush: v => v && v.map(t => moment.unix(Number(t)))
  },
  { 
    $platform: 'frontend',
    id: 'timezone_id', 
    label: formatLocale('report.summary.list.filter.Timezone'),
    type: 'Select', 
    option: motor('timezone').valueOf('en_name'),
    props: {
      showSearch: true,
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  },
  { 
    $platform: 'frontend',
    id: 'offer_page_id', 
    label: formatLocale('report.order.list.columns.offerPage'),
    type: 'Search',
    props: {
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'offer_page_name', 
        value, 
        _v: 'offer_page_id', 
        _n: 'offer_page_name'
      })
    }
  },
  {
    $platform: 'backend',
    id: 'affiliate_id',
    label: formatLocale('report.backend.summary.filter.AffIDName'),
    type: 'Search',
    props: {
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'affiliate_name', 
        value, 
        _v: 'affiliate_id', 
        _n: 'affiliate_name'
      })
    }
  },
  {
    id: 'order_status',
    label: formatLocale('report.order.list.columns.orderStatus'),
    type: 'Select',
    placeholder: 'Order Status',
    option: motor('order_status').valueOf(),
  },
  {
    id: 'country_id',
    label: formatLocale('report.Bonus.list.columns.Country'),
    type: 'Select',
    option: motor('country').valueOf('en_name'),
    props: {
      showSearch: true,
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  },
  {
    id: 'sub_id',
    label: formatLocale('report.summary.list.filter.SubID'),
    type: 'InputSelect',
    placeholder: 'SubID',
    props: {
      option: addonBefore
    },
  },
  {
    $platform: 'backend',
    id: 'confirmed_time',
    label: formatLocale('report.backend.order.filter.ConfirmedPeriod'),
    type: 'RangePicker',
    onPull: v => v.map(m => m.unix()),
    onPush: v => v && v.map(t => moment.unix(Number(t)))
  },
  {
    $platform: 'backend',
    id: 'billing_code',
    label: formatLocale('report.backend.order.filter.BillingID'),
    type: 'Input'
  },
]
export const BONUS_FILTER = [
  {
    id: 'offer_id',
    label: formatLocale('report.summary.list.filter.OfferIDName'),
    type: 'Search',
    props: {
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'offer_name', 
        value, 
        _v: 'offer_id', 
        _n: 'offer_name'
      })
    }
  },
  {
    $platform: 'backend',
    id: 'affiliate_id',
    label: formatLocale('report.backend.summary.filter.AffIDName'),
    type: 'Search',
    props: {
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'affiliate_name', 
        value, 
        _v: 'affiliate_id', 
        _n: 'affiliate_name'
      })
    }
  }, {
    id: 'bonus_type',
    label: formatLocale('report.Bonus.list.columns.Type'),
    type: 'Select',
    placeholder: 'Type',
    option: motor('bonus_type').valueOf(),
  }, {
    id: 'date',
    label: formatLocale('report.backend.summary.filter.Period'),
    type: 'RangePicker',
    onPull: v => v.map(m => m.unix()),
    onPush: v => v && v.map(t => moment.unix(Number(t)))
  }, { 
    $platform: 'frontend',
    id: 'timezone_id', 
    label: formatLocale('report.summary.list.filter.Timezone'),
    type: 'Select', 
    option: motor('timezone').valueOf('en_name'),
    props: {
      showSearch: true,
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  }, {
    id: 'bonus_status',
    label: formatLocale('report.Bonus.list.columns.Status'),
    type: 'Select',
    placeholder: 'Status',
    option: motor('bonus_status').valueOf(),
  }, {
    id: 'bonus_code',
    label: formatLocale('report.backend.bonus.filter.BonusID'),
    type: 'Input',
    placeholder: 'bonus_id',
  }, {
    $platform: 'backend',
    id: 'billing_code',
    label: formatLocale('report.backend.order.filter.BillingID'),
    type: 'Input',
    placeholder: 'billing_id',
  }
]
//
export const FILTER = {
  summary: SUMMARY_FILTER,
  order: ORDER_FILTER,
  bonus: BONUS_FILTER
}
export const BONUS_ADD = {
  bonus: [
    {
      id: 'affiliate_id',
      label: formatLocale('report.backend.bonus.add.bonusL_Affiliate'),
      type: 'Search',
      required: true,
      props: {
        onSearch: value => motor('app/fetchSearch').emitter({ 
          field: 'affiliate_name', 
          value, 
          _v: 'affiliate_id', 
          _n: 'affiliate_name',
          _c: 'affiliate_code',
        })
      }
    }, {
      id: 'amount',
      label: formatLocale('report.backend.bonus.add.bonusL_Amount'),
      type: 'InputNumber',
      required: true,
      props: {
        min: 0,
        max: 999999.99,
        formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser:value => value.replace(/\$\s?|(,*)/g, '')
      }
    }, { 
      id: 'date',
      label: formatLocale('report.backend.bonus.add.bonusL_Period'),
      type: 'RangePicker',
      required: true,
      onPull: v => v && v.map(m => m.unix()),
    }, { 
      id: 'memo',
      label: formatLocale('report.backend.bonus.add.bonusL_Memo'),
      type: 'TextArea',
    }
  ],
  order: [
    {
      id: 'order_no',
      label: formatLocale('report.order.list.columns.orderID'),
      type: 'Input',
      props: {
        disabled: true
      }
    },
    {
      id: 'related_order_no',
      label: formatLocale('report.backend.order.add.bonusL_RelatedOrderID'),
      type: 'Input',
    }, {
      id: 'repeat_order_count',
      label: formatLocale('report.backend.order.add.bonusL_RepeatOrder'),
      type: 'InputNumber',
      required: true,
      props:{
        min: 1,
        max: 100,
        formatter: v => v && Number(v),
        parser: v => v && Number(v)
      }
    }, {
      id: 'amount',
      label: formatLocale('report.backend.order.add.bonusL_Bonus'),
      type: 'InputNumber',
      required: true,
      props: {
        min: 0,
        max: 999999.99,
        formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser:value => value.replace(/\$\s?|(,*)/g, '')
      }
    }, { 
      id: 'memo',
      label: formatLocale('report.backend.bonus.add.bonusL_Memo'),
      type: 'TextArea',
    }
  ]
}
export const BILLINGCOLUMNS = {
  add: {
    1: [
      { 
        title: formatLocale('report.Bonus.list.columns.OfferID'), 
        dataIndex: 'offer_code', 
      }, { 
        title: formatLocale('report.Bonus.list.columns.Offer'), 
        dataIndex: 'offer_name', 
      }, { 
        title: formatLocale('report.backend.order.add.bonusC_DefaultPayout'), 
        dataIndex: 'payout', 
        render: v => v && numeral(v).format('$0,0.00')
      },{ 
        title: formatLocale('report.order.list.columns.orderID'), 
        dataIndex: 'order_no', 
      }, { 
        title: formatLocale('report.backend.order.add.bonusC_Amount'), 
        dataIndex: 'amount',
        render: v => numeral(v).format('$0,0.00') 
      }
    ],
    2: [
      { 
        title: formatLocale('report.Bonus.list.columns.OfferID'), 
        dataIndex: 'offer_code', 
      }, { 
        title: formatLocale('report.Bonus.list.columns.Offer'), 
        dataIndex: 'offer_name', 
      }, { 
        title: formatLocale('report.order.list.columns.orderID'), 
        dataIndex: 'order_no', 
      }, { 
        title: formatLocale('report.summary.list.columns.orders'), 
        dataIndex: 'repeat_order_count', 
      }, { 
        title: formatLocale('report.Bonus.list.columns.Bonus'), 
        dataIndex: 'amount',
        render: v => numeral(v).format('$0,0.00') 
      }
    ],
    form: [
      { 
        id: 'date',
        label: formatLocale('report.backend.bonus.add.bonusL_Period'),
        type: 'RangePicker',
        onPull: v => v && v.map(m => m.unix()),
        required: true,
      }, { 
        id: 'memo',
        label: formatLocale('report.backend.bonus.add.bonusL_Memo'),
        type: 'TextArea',
      }
    ],
  },
  edit: {
    1: MODAL_COM_TABLE.concat(MODAL_COM_TABLE_1),
    2: MODAL_COM_TABLE.concat(MODAL_COM_TABLE_2),
    form:  [
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
    ],
  },
}
export const BUTTONLIST = {
  bonus: [
    { key: 'Billing', name: 'Generating Billing', click: () => motor('reports/modalShow').emitter({add_type:'billing'})},
    { key: 'Bonus', name: 'Add Bonus', click: () => motor('reports/modalShow').emitter({add_type:'bonus'})},
  ],
  order: [
    { key: 'Billing', name: 'Generating Billing', click: () => motor('reports/modalShow').emitter({add_type:'billing', billing_type: 1})},
  ],
}
export const multiOptionFilter = {
  'offer_name': 'offer_id',
  'offer_page_name': 'offer_page_id',
  'goal_id': 'goal_id',
  'affiliate_name': 'affiliate_id',
  'country_id': 'country_id',
  'category_id': 'category_id',
  'sub_id_1': 'sub_id_1',
  'sub_id_2': 'sub_id_2',
  'sub_id_3': 'sub_id_3',
  'sub_id_4': 'sub_id_4',
  'sub_id_5': 'sub_id_5',
}