import { formatLocale, motor, moment } from '@/utils'
import { Switch } from '@/components'
const zone = motor().unique().zone
export const COLUMNS = {
  default: [
    { title: formatLocale('postback.columns.goal'), 
      dataIndex: 'goal_id', sorter: true, width: 120,
      render: v => motor(v).format('postback_goal')
    },
    { 
      title: formatLocale('postback.columns.type'), 
      dataIndex: 'postback_type', 
      sorter: true, width: 140,
      render: v => motor(v).format('postback_type')
    },
    { 
      title: formatLocale('postback.columns.offer id'), 
      dataIndex: 'offer_code', 
      sorter: true, width:120
    },
    { 
      title: formatLocale('postback.columns.offer'), 
      dataIndex: 'offer_name', 
      sorter: true, 
      width: 120
    },
    { 
      title: formatLocale('postback.columns.url/code'),
      dataIndex: 'url_code',
      sorter: true, 
      width: 360
    },
    { 
      title: formatLocale('postback.columns.status'), 
      dataIndex: 'postback_status', 
      width: 120,
      render: (v, d, index) => <Switch checked={v === 1} onChange={() => motor('postback/fetchUpdate').emitter({d, index})}/>
    },
    { title: formatLocale('postback.columns.date'), dataIndex: 'create_time', sorter: true, width: 150,
      render: v => moment.unix(v).format('LLL')
    },
  ]
}
export const FILTER = [
  { 
    id: 'offer_id',  
    label: formatLocale('postback.filter.offer id/name'), 
    type: 'Search', 
    props: {
      placeholder: 'Luck1',
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'offer_name', 
        value, 
        _v: 'offer_id', 
        _n: 'offer_name'
      })
    }
  },
  { id: 'postback_type',
    label: formatLocale('postback.filter.type'),  // 表头名字
    type: 'Select', // 表单类型
    placeholder: formatLocale('postback.filter.type'),
    option: motor('postback_type').valueOf(),
  },
  { id: 'goal_id',
    label: formatLocale('postback.filter.goal'),  // 表头名字
    type: 'Select', // 表单类型
    placeholder: formatLocale('postback.filter.goal'),
    option: motor('postback_goal').valueOf(),
  },
  { id: 'postback_status',
    label: formatLocale('postback.filter.state'),  // 表头名字
    type: 'Select', // 表单类型
    placeholder: formatLocale('postback.filter.state'),
    option: motor('postback_status').valueOf(),
  },
]

export const FORM_GLOBAL = detail => {
  return [
    { 
      label: formatLocale('pastback.g.pbr-leads'), 
      id: 'lead_url', 
      type: 'Input', 
      required: true, 
      props: {
        layout: 'vertical',
      }
    }, 
    { 
      label: formatLocale('pastback.g.pbr-confirmed'), 
      id: 'confirmed_url', 
      type: 'Input', 
      required: true, 
    }, 
    { 
      label: formatLocale('pastback.g.if-leads'), 
      id: 'lead_code', 
      type: 'TextArea', 
      required: true, 
    }, 
    // {
    //   label: formatLocale('pastback.g.if-confirmed'),
    //   id: 'confirmed_code',
    //   type: ''
    // }, 
    {
      id: 'global_postback_flag',
      type: 'Checkbox',
      props: {
        children: formatLocale('pastback.g.want-pk'),
        // checked: Number(detail.global_postback_flag) === 1 ? true : false
      }
    }, 
    {
      
      id: 'global_pixel_flag',
      type: 'Checkbox',
      props: {
        children: formatLocale('pastback.g.want-if'),
        // checked: Number(detail.global_pixel_flag) === 1 ? true : false
      }
    }, 
  ]
}