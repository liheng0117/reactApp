import { decorator, motor, moment, formatLocale } from '@/utils'
const { eventFunc } = decorator


const Con = {
  domainId: formatLocale('domain.list.columns.domainId'),
  domain: formatLocale('domain.list.columns.domain'),
  type: formatLocale('domain.list.columns.type'),
  offerName: formatLocale('domain.list.columns.offerName'),
  status: formatLocale('domain.list.columns.status'),
  time: formatLocale('domain.list.columns.time'),
  Edit: formatLocale('domain.list.columns.Edit'),
  add: formatLocale('domain.list.button.Add'),
  popTitle: formatLocale('domain.pop.title'),
  popEdit: formatLocale('domain.pop.Edit'),
  cancel: formatLocale('domain.pop.cancel'),
  AffiliateID: formatLocale('domain.list.button.AffiliateID'),
  Affiliate: formatLocale('domain.list.button.Affiliate'),
  AffiliateIDName: formatLocale('domain.pop.AffiliateID/Name'),
  OfferIDName: formatLocale('domain.pop.OfferIDName'),
  popSave: formatLocale('domain.pop.Save'),
}

const backendCon = {
  DomainID: formatLocale('domain.list.backend.columns.DomainID'),
  Domain: formatLocale('domain.list.backend.columns.Domain'),
  AffiliateID: formatLocale('domain.list.backend.columns.AffiliateID'),
  Affiliate: formatLocale('domain.list.backend.columns.Affiliate'),
  Status: formatLocale('domain.list.backend.columns.Status'),
  Date: formatLocale('domain.list.backend.columns.Date'),
  Action: formatLocale('domain.list.backend.columns.Action'),
  Period: formatLocale('domain.list.backend.filter.Period'),
}

const FILTER = {
  frontendFilter: [
    { 
      id: 'offer_id',  
      label: Con.OfferIDName, 
      type: 'Search',
      props: {
        placeholder: 'Offer ID/Name',
        onSearch: value => motor('app/fetchSearch').emitter({ 
          field: 'offer_name', 
          value, 
          _v: 'offer_id', 
          _n: 'offer_name',
          _c: 'offer_code',
        }),
      }
    },
    { 
      id: 'domain_id', 
      label: Con.domain, 
      type: 'Search', 
      props: {
        placeholder: 'domain_name',
        onSearch: value => motor('app/fetchSearch').emitter({ 
          field: 'domain_url', 
          value, 
          _v: 'domain_id', 
          _n: 'domain_url'
        }),
      }
    },
    { 
      id: 'domain_type',  
      label: Con.type, 
      type: 'Select', 
      placeholder: 'Type', 
      option: motor('domain_type').valueOf(),
    },
    {
      id: 'domain_status',  
      label: Con.status, 
      type: 'Select', 
      placeholder: 'Status', 
      option: motor('domain_status').valueOf(),
    },
  ],

  backendFilter: [
    { 
      id: 'affiliate_id',  
      label: Con.AffiliateIDName, 
      type: 'Search', 
      props: {
        placeholder: 'Affiliate ID/Name',
        onSearch: value => motor('app/fetchSearch').emitter({ 
          field: 'affiliate_name', 
          value, 
          _v: 'affiliate_id', 
          _n: 'affiliate_name',
          _c: 'affiliate_code',
        }),
      }
    },
    { 
      id: 'domain_id',  
      label: Con.domain, 
      type: 'Search', 
      props: {
        placeholder: 'domain_name',
        onSearch: value => eventFunc({ 
          field: 'domain_url', 
          value, 
          _v: 'domain_id', 
          _n: 'domain_url'
        })('app/fetchSearch')
      }
    },
    {
      label: 'Status', 
      id: 'domain_status', 
      type: 'Select', 
      required: true, 
      props: {
        placeholder: 'Status',
      },
      option: motor('domain_status').valueOf(),
    },
    {
      id: 'date',
      label: backendCon.Period,
      type: 'RangePicker',
      onPull: v => v.map(m => m.unix()),
      onPush: v => v && v.map(t => moment.unix(Number(t)))
    },
  ]
}

// button 列表
const buttons = [
  {
    id: 4,
    label: 'Apply',
    type: 'submit',
  },
  {
    id: 5,
    label: 'Clear',
    type: 'clear',
  },
]

const POP = { 
  frontendPop: [
    { 
      label: 'Name', 
      id: 'domain_url', 
      type: 'Input', 
      required: true,
      props: {
        placeholder: '限制1000字符',
        maxLength: 1000,
      },
      verify: v => {
        const reg0 = /^http(s)?:\/\/(([\w-]+\.)+)?[\w-]+(\/[\w- .\/?%&=]*)?$/g
        const reg1 = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/g
        if (!v.match(reg0) && !v.match(reg1)) {
          return Promise.reject('not URL')
        } else {
          return Promise.resolve('')
        }
      },
    },
    {
      label: 'Type', 
      id: 'domain_type', 
      type: 'Select', 
      required: true, 
      props: {
        placeholder: 'domain_type',
      },
      option: motor('domain_type').valueOf(),      
    },
    {
      label: 'Offer',
      // id: 'offer_name',
      id: 'offer_id', 
      type: 'Search', 
      required: true,
      props: {
        placeholder: '限制500字符',
        onSearch: value => motor('app/fetchSearch').emitter({ 
          field: 'offer_name', 
          value, 
          _v: 'offer_id', 
          _n: 'offer_name',
          _c: 'offer_code',
        })
      },
    },
    {
      label: 'Status', 
      id: 'domain_status', 
      type: 'Select', 
      required: true, 
      props: {
        placeholder: 'domain_status',
      },
      option: motor('domain_status').valueOf(),
    },
  ],
  backendPop: [
    { 
      label: 'Name', 
      id: 'domain_url', 
      type: 'Input', 
      required: true,
      props: {
        placeholder: '限制500字符',
        maxLength: 500,
      }
    },
    { 
      label: 'Affiliate',
      id: 'affiliate_id', 
      type: 'Search', 
      required: true, 
      props: {
        placeholder: '限制500字符',
        onSearch: value => motor('app/fetchSearch').emitter({ 
          field: 'affiliate_name', 
          value, 
          _v: 'affiliate_id', 
          _n: 'affiliate_name',
          _c: 'affiliate_code'
        })
      },
    },
    {
      label: 'Status', 
      id: 'domain_status', 
      type: 'Select', 
      required: true, 
      props: {
        placeholder: 'Status',
      },
      option: motor('domain_status').valueOf(),
      onPull: v => +v,
    },
  ],
}

export {
  Con,
  backendCon,
  FILTER,
  buttons,
  POP, 
}
