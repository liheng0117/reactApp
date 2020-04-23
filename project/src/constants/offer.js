import Link from 'umi/link'
import router from 'umi/router'
import { tools, moment, numeral, motor, formatLocale } from '@/utils'
import { Badge, Switch, Input, Button, message} from '@/components'


export const FILE_TYPE = {
  zip: 1,
  image: 2,
  video: 3,
}
// filter 配置结构
export const FILTER = {
  default: [
    { 
      id: 'offer_id',  
      label: formatLocale('offers.list.filter.name'), 
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
    }, { 
      id: 'country_id',  
      label: formatLocale('offers.list.filter.country'), 
      type: 'Select', 
      option: motor('country').valueOf('en_name'),
      props: {
        mode: 'multiple'
      }
    }, { 
      id: 'category_id',  
      label: formatLocale('offers.list.filter.category'), 
      type: 'Select', 
      option: motor('offer_category_id').valueOf()
    }
  ],  
  list: [
    { 
      id: 'offer_id',  
      label: formatLocale('offers.list.filter.name'), 
      type: 'Search', 
      props: {
        placeholder: 'Luck1',
        onSearch: value => motor('app/fetchSearch').emitter({ field: 'offer_name', value, 
          _v: 'offer_id', 
          _n: 'offer_name'
        })
      }
    }, { 
      id: 'country_id',  
      label: formatLocale('offers.list.filter.country'), 
      type: 'Select', 
      option: motor('country').valueOf('en_name'),
      props: {
        mode: 'multiple'
      }
    }, { 
      id: 'category_id',  
      label: formatLocale('offers.list.filter.category'), 
      type: 'Select', 
      option: motor('offer_category_id').valueOf()
    }, { 
      id: 'date',  
      label: formatLocale('offers.list.filter.ExpireDate'), 
      type: 'RangePicker',
      onPull: v => v.map(m => m.unix()),
      onPush: v => v && v.map(t => moment.unix(Number(t)))
    }
  ],
  creatives: [
    { 
      id: 'id1',  
      label: formatLocale('offers.creative.filter.name'), 
      type: 'Search', 
      placeholder: '', 
      option: [] 
    }, { 
      id: 'id2',  
      label: formatLocale('offers.creative.filter.period'), 
      type: 'RangePicker', 
      placeholder: '', 
      option: []
    }, { 
      id: 'creative_status',  
      label: formatLocale('offers.creative.filter.status'), 
      type: 'Select', 
      placeholder: '', 
      option: motor('creative_status').valueOf()
    }
  ]
}
// 所有列表操作的配置结构
export const OPERATION = {
  list: [
    { 
      key: 'create-offer', 
      name: formatLocale('offers.list.operating.create'), 
    }, { 
      key: 'pending-offer', 
      name: formatLocale('offers.list.operating.pending') 
    }
  ],
  creatives: [
    { 
      key: 'add-creative', 
      name: formatLocale('offers.creative.operating.add'), 
    },
  ]
}
// 所有列表表格头的配置结构
export const COLUMNS = {
  default: [
    { 
      width: 120,
      title: formatLocale('offers.default.columns.id'), 
      dataIndex: 'offer_code',
      sorter: true  
    }, { 
      width: 160,
      title: formatLocale('offers.list.columns.name'),
      dataIndex: 'offer_name',
      sorter: true,
      render: (t, d) => {
        return <Button type="link" onClick={() => {
              if (d.offer_status === -1) {
                message.warn('offer is expired.')
                return
              }
              router.push(`/offer/${d.offer_id}`)
            }}
          >
        {t}</Button>
      }
    }, { 
      width: 120,
      title: formatLocale('offers.default.columns.payout'), 
      dataIndex: 'payout', 
      sorter: true,
      render: v => numeral(v).format('$0,0.00')
    }, { 
      width: 100,
      title: formatLocale('offers.default.columns.epc'), 
      dataIndex: 'epc',
      sorter: true,
      render: v => numeral(v).format('$0,0.00')
    }, { 
      width: 100,
      title: formatLocale('offers.default.columns.country'),
      dataIndex: 'country',
      sorter: true,
      render: v => v && v.map(d => d.en_name).join(',')
    }, { 
      width: 100,
      title: formatLocale('offers.default.columns.category'), 
      dataIndex: 'category_id',
      sorter: true,
      render: v => motor(v).format('offer_category_id')
    }, { 
      width: 120,
      title: formatLocale('offers.default.columns.expire'),
      sorter: true,
      dataIndex: 'expired_time',
      render: v => moment.unix(v).format('LLL')
    }, 
  ],
  list: [
    { 
      width: 120,
      title: formatLocale('offers.list.columns.id'), 
      dataIndex: 'offer_code',
      sorter: true
    }, { 
      width: 200,
      title: formatLocale('offers.list.columns.name'), 
      dataIndex: 'offer_name',
      sorter: true,
      render: (t, d) => (<Link to={`/admin/offer/${d.offer_id}`}>{t}</Link>)
    }, { 
      width: 120,
      title: formatLocale('offers.list.columns.payout'),
      sorter: true,
      dataIndex: 'payout',
      render: v => numeral(v).format('$0,0.00')
    }, { 
      width: 120,
      title: formatLocale('offers.list.columns.epc'),
      sorter: true,
      dataIndex: 'epc',
      render: v => numeral(v).format('$0,0.00') 
    }, { 
      width: 120,
      title: formatLocale('offers.list.columns.country'), 
      dataIndex: 'country',
      sorter: true,
      render: v => v && v.map(d => d.en_name).join(',')
    }, { 
      width: 120,
      title: formatLocale('offers.list.columns.category'), 
      dataIndex: 'category_id', 
      sorter: true,
      render: k => motor(k).format('offer_category_id')
    }, { 
      width: 120,
      title: formatLocale('offers.list.columns.expire'), 
      dataIndex: 'expired_time',
      sorter: true,
      render: v => moment.unix(v).format('LLL')
    }, { 
      width: 120,
      title: formatLocale('offers.list.columns.status'), 
      dataIndex: 'offer_status',
      sorter: true,
      render: v => {
        const status = {
          '1': 'success',
          '-1': 'error',
          '0': 'processing'
        }
        return <Badge status={status[v]} text={motor(v).format('offer_status')} />
      }
    }, 
  ],
  creatives: [
    { 
      title: formatLocale('offers.creative.columns.id'), 
      dataIndex: 'creative_id' 
    }, { 
      title: formatLocale('offers.creative.columns.offerName'), 
      dataIndex: 'creative_name',
      render: (v, d) => <Button type="link" onClick={() => motor('offers/fetchCreative').emitter(d)}>{v}</Button>
    }, { 
      title: formatLocale('offers.creative.columns.type'), 
      dataIndex: 'creative_type',
      render:  v => motor(v).format('creative_type')
    }, { 
      title: formatLocale('offers.creative.columns.offer'), 
      dataIndex: 'offer.name' 
    }, { 
      title: formatLocale('offers.creative.columns.size'), 
      dataIndex: 'creative_size',
      render: v => v && numeral(v).format('0.0 b')
    }, { 
      title: formatLocale('offers.creative.columns.created'), 
      dataIndex: 'create_time',
      render: v => moment.unix(v).format('LLL')
    }, { 
      title: formatLocale('offers.creative.columns.status'), 
      dataIndex: 'creative_status',
      render: (v, { creative_id }, index) => (
        <Switch 
          checked={Boolean(v)} 
          onChange={creative_status => {
            motor('offers/doModifyCreatives').emitter({ creative_status, creative_id, index })
          }}
        />
      )
    }, { 
      title: formatLocale('offers.creative.columns.action'), 
      render: (v) => (
        <Button type="link" onClick={() => motor('offers/fetchDelCreatives').emitter(v)}>
          delete
        </Button>
      )
    }, 
  ]
}
// 前台详情 basic 配置表头
export const DETAIL_BAISC_COLUMNS = [
  {
    title: 'Offer ID',
    dataIndex: 'offer_code'
  },
  {
    title: 'Description',
    dataIndex: 'description'
  },
  {
    title: 'Payout',
    dataIndex: 'payout',
    render: v => numeral(v).format('$0,0.00')
  },
  {
    title: 'Epc',
    dataIndex: 'epc',
    render: v => numeral(v).format('$0,0.00')
  },
  {
    title: 'Country',
    dataIndex: 'country_id',
    render: k => motor(k).format('country.%.en_name')
  },
  {
    title: 'Category',
    dataIndex: 'category_id',
    render: k => motor(k).format('offer_category_id')
  }, 
  {
    title: 'Expire Date',
    dataIndex: 'expired_time',
    render: v => moment.unix(v).format('LLL')
  }
]
// 前台详情 postbacks 配置表头
export const POSTBACKS_COLUMS = [
  { 
    title: 'Goal', 
    dataIndex: 'goal_id',
    render: v => motor(v).format('postback_goal')
  }, { 
    title: 'Type', 
    dataIndex: 'postback_type',
    render: v => motor(v).format('postback_type')
  }, { 
    title: 'URL/Code', 
    dataIndex: 'url_code', 
    render: (v, rec, index) => (
      <Input 
        defaultValue={v} 
        onBlur={e => motor('offer/setPostbackURL').emitter({ value: e.target.value, index })} 
      />
    )
  }, { 
    title: 'Date', 
    dataIndex: 'create_time',
    render: t => moment.unix(t).format('LLL')
  }, { 
    title: 'Action', 
    width: 60, 
    render: (v) => 
      <Button 
        type="link" 
        onClick={() => motor('offer/fetchPostbackRemove').emitter(v)}
      >
       Delete
      </Button>
  }
]
export const POSTBACKS_SHEET = [
  { 
    label: 'Type', 
    id: 'postback_type', 
    type: 'Select', 
    option: motor('postback_type').valueOf()
    
  }, { 
    label: 'Goal', 
    id: 'goal_id', 
    type: 'Select', 
    option: motor('postback_goal').valueOf()
  }, { 
    label: 'URL/Code', 
    id: 'url_code', 
    type: 'TextArea',
    props: {
      autosize: {
        minRows: 11
      }
    } 
  }, 
]
// 后台offer 添加
export const OFFER_ADD_SHEET = [
  { 
    label: 'Offer ID', 
    id: 'offer_code', 
    type: 'Input', 
    props: {
      disabled: true
    }
  },
  { 
    label: 'Name', 
    id: 'offer_name', 
    type: 'Input',
    required: 'Offer name cannot be empty'
  }, { 
    label: 'Category', 
    id: 'category_id', 
    type: 'Select',
    option: motor('offer_category_id').valueOf()
  }, { 
    label: 'Country', 
    id: 'country_id', 
    type: 'Select', 
    option: motor('country').valueOf('en_name'),
    props: {
      mode: 'multiple'
    }
  }, { 
    label: 'Description', 
    id: 'description', 
    type: 'TextArea' 
  }, { 
    label: 'Payout', 
    id: 'payout', 
    type: 'InputNumber', 
    props: { 
      min: 0,   
      formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      parser: value => value.replace(/\$\s?|(,*)/g, '')
    } 
  }, { 
    label: 'Offer Status', 
    id: 'offer_status', 
    type: 'Select',
    option: motor('offer_status').valueOf()
  }, { 
    label: 'Expiration Date', 
    id: 'expired_time', 
    type: 'DatePicker',
    onPull: v => v && v.unix(),
    onPush: v => v && moment.unix(Number(v)),
    props: {
      disabledDate: current => current.valueOf() < moment().valueOf()
    }
  },
]
export const OFFER_DETAIL_SHEET = [

  ...OFFER_ADD_SHEET
]
export const CREATIVE_SHEET = [
  { 
    label: formatLocale('offers.list.dialog.add.offer'), 
    id: 'offer_id', 
    type: 'Search',
    props: {
      placeholder: 'Select the offer(s) to add creative files',
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'offer_name', 
        value, 
        _v: 'offer_id', 
        _n: 'offer_name'
      })
    }
  }, { 
    label: formatLocale('offers.list.dialog.add.status'), 
    id: 'creative_status', 
    type: 'Select',
    option: motor('creative_status').valueOf()
  }, 
  { 
    label: formatLocale('offers.list.dialog.add.upload'), 
    id: 'upload', 
    type: 'Upload',
    onPull: v => v && v.map(d => ({ 
      creative_type: FILE_TYPE[d.FileType], 
      creative_size: d.size,
      creative_name: d.name,
      creative_url: d.ObjectURL
    })),
    onPush: v => v && v.map(d => ({
        uid: d.creative_id,
        name: d.creative_name,
        status: 'done',
        url: d.creative_url,
    })),
    props:{
      accept: '.gif, .jpg, .jpeg, .png, .zip, .rar, .mp4'
    }
  }, 
]