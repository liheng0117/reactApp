import { decorator, moment, motor, formatLocale } from '@/utils'
import { Input } from '@/components'
const { eventHook, } = decorator

const Con = {
  dh: { d: '16', h: [1, 2] },
  head: 'head',
  top: 'top',
  affiliateInformation: formatLocale('affiliates.add.affiliateInformation'),
  basicInformation: formatLocale('affiliates.edit.basicInformation'),
  userInformation: formatLocale('affiliates.add.userInformation'),
  billingInformation: formatLocale('affiliates.add.billingInformation'),
  offerSettings: formatLocale('affiliates.add.offerSettings'),
  add: formatLocale('affiliates.add.add'),
  save: formatLocale('affiliates.add.Save'),
  edit: formatLocale('affiliates.edit.edit'),
  clear: formatLocale('affiliates.add.clear'),
  affiliateID: formatLocale('affiliates.list.columns.affiliateID'),
  affiiiate: formatLocale('affiliates.list.columns.affiiiate'),
  accountManager: formatLocale('affiliates.list.columns.accountManager'),
  orders: formatLocale('affiliates.list.columns.Orders'),
  clicks: formatLocale('affiliates.list.columns.clicks'),
  clickToOrderRate: formatLocale('affiliates.list.columns.clickToOrderRate'),
  conversions: formatLocale('affiliates.list.columns.conversions'),
  conversionRate: formatLocale('affiliates.list.columns.conversionRate'),
  confirmedOrder: formatLocale('affiliates.list.columns.confirmedOrder'),
  Revenue: formatLocale('affiliates.list.columns.Revenue'),
  repeatOrders: formatLocale('affiliates.list.columns.repeatOrders'),
  bonus: formatLocale('affiliates.list.columns.bonus'),
  totalRevenue: formatLocale('affiliates.list.columns.totalRevenue'),
  source: formatLocale('affiliates.list.columns.source'),
  status: formatLocale('affiliates.list.columns.status'),
  actions: formatLocale('affiliates.list.columns.actions'),
  addAffiliate: formatLocale('affiliates.list.button.addAffiliate'),
  pendingAffiliate: formatLocale('affiliates.list.button.pendingAffiliate'),
  offerName: formatLocale('affiliates.columns.offerName'),
  defaultPayout: formatLocale('affiliates.columns.defaultPayout'),
  payout: formatLocale('affiliates.columns.payout'),
  EffectiveTime: formatLocale('affiliates.add.EffectiveTime'),
  AffiliateIDName: formatLocale('affiliates.list.filter.AffiliateIDName'),
  filterState: formatLocale('affiliates.list.filter.Status'),
  filterSource: formatLocale('affiliates.list.filter.Source'),
  filterPeriod: formatLocale('affiliates.list.filter.Period'),
  filterAccountManager: formatLocale('affiliates.list.filter.AccountManager'),
  ConversionsConfirmedOrder: formatLocale('affiliates.list.columns.ConversionsConfirmedOrder'),
}

const filter = [
  { 
    id: 'affiliate_id',
    label: Con.AffiliateIDName, 
    type: 'Search', 
    props: {
      placeholder: '',
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
    id: 'affiliate_status',
    label: Con.filterState, 
    type: 'Select',
    option: motor('affiliate_status').valueOf(),
  },
  {
    id: 'affiliate_source',  
    label: Con.filterSource, 
    type: 'Select', 
    placeholder: 'Type', 
    option: motor('affiliate_source').valueOf(),
  },
  {
    id: 'date',
    label: Con.filterPeriod,
    type: 'RangePicker',
    initialValue: [moment().startOf(), moment().endOf()],
    onPull: v => v.map(m => m.unix()),
    onPush: v => v && v.map(t => moment.unix(Number(t)))
  },
  {
    id: 'manager_id',
    label: Con.filterAccountManager, 
    type: 'Search',
    props: {
      placeholder: 'Offer ID/Name',
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'manager_email', 
        value, 
        _v: 'manager_id', 
        _n: 'manager_email'
      }),
    }
  },
]

// 保存表单配置
const addFromData = {
  affiliateInformation: [
    {
      label: 'Affiliate', 
      id: 'affiliate_name', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '限制500字符',
        maxLength: 500,
      }
    }, 
    { 
      label: 'Adress 1', 
      id: 'address1', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '限制1000字符',
        maxLength: 1000,
      }
    }, 
    { 
      label: 'Adress 2', 
      id: 'address2', 
      type: 'Input', 
      props: {
        placeholder: '限制1000字符',
        maxLength: 1000,
      }
    }, 
    { 
      label: 'City', 
      id: 'city', 
      type: 'Input', 
      required: true,
      props: {
        placeholder: '限制200字符',
        maxLength: 200,
      }
    }, 
    { 
      label: 'Country', 
      id: 'country_id', 
      type: 'Select',
      required: true,
      option: motor('country').valueOf('en_name'),
      props: {
        placeholder: 'Country',
      }
    }, 
    {
      label: 'Phone', 
      id: 'phone', 
      type: 'Input', 
      required: true,
      props: {
        placeholder: '限制200字符',
        maxLength: 200,
      },
      verify: v => {
        const reg = /[^0-9-_()]/
        if (String(v).match(reg)) {
          return Promise.reject('Mobile phone number is not standardized')
        }
        return Promise.resolve('')
      }
    }, 
  ],
  userInformation: [
    { 
      label: 'First Name', 
      id: 'first_name', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '限制100字符',
        maxLength: 200,
      }
    },
    {
      label: 'Last Name', 
      id: 'last_name', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '限制100字符',
        maxLength: 100,
      }
    },
    { 
      label: 'E-mail', 
      id: 'email', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '限制100字符',
        maxLength: 100,
      },
      verify: v => {
        const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
        if (!String(v).match(reg)) {
          return Promise.reject('E-mail format is incorrect')
        }
        return Promise.resolve('')
      }
    },
    { 
      label: 'Status', 
      id: 'affiliate_status', 
      type: 'Select', 
      required: true,
      option: motor('affiliate_status').valueOf(),
    },
    { 
      label: 'Account Manager', 
      id: 'manager_id', 
      type: 'Search', 
      required: true, 
      props: {
        placeholder: 'Offer ID/Name',
        onSearch: value => motor('app/fetchSearch').emitter({ 
          field: 'manager_email', 
          value, 
          _v: 'manager_id', 
          _n: 'manager_email'
        }),
      },
    },
  ],
  billingInformation: [
    { 
      label: 'Address 1', 
      id: 'address1', 
      type: 'Input',
      required: false, 
      props: {
        placeholder: '',
      }
    }, 
    { 
      label: 'Address 2', 
      id: 'address2', 
      type: 'Input', 
      required: false, 
      props: {
        placeholder: '',
      }
    },
    { 
      label: 'City', 
      id: 'city', 
      type: 'Input', 
      required: false,
      props: {
        placeholder: '',
      }
    },
    { 
      label: 'Country', 
      id: 'country_id', 
      type: 'Select', 
      required: false,
      option: motor('country').valueOf('en_name'),
      props: {
        placeholder: '',
      }
    },
    { 
      label: 'Region', 
      id: 'region_id', 
      type: 'Select', 
      required: false,
      option: motor('region').valueOf('en_name'),
      props: {
        placeholder: '',
      }
    },
    { 
      label: 'Zipcode', 
      id: 'zip_code', 
      type: 'Input', 
      required: false,
      props: {
        placeholder: '',
      }
    },
    { 
      label: 'Payment Method', 
      id: 'payment_method', 
      type: 'Input', 
      required: false,
      props: {
        placeholder: '',
      }
    },
    { 
      label: 'Beneficiary Name', 
      id: 'beneficiary_name', 
      type: 'Input', 
      required: false,
      props: {
        placeholder: '',
      }
    },
    { 
      label: 'Bank Name', 
      id: 'bank_name', 
      type: 'Input', 
      required: false,
      props: {
        placeholder: '',
      }
    },
    { 
      label: 'Swift Number', 
      id: 'swift_number', 
      type: 'Input', 
      required: false,
      props: {
        placeholder: '',
      }
    },
    { 
      label: 'Account Number', 
      id: 'account_number', 
      type: 'Input', 
      required: false,
      props: {
        placeholder: '',
      }
    },
    // { 
    //   label: 'Billing Frequency', 
    //   id: 'billing_frequency', 
    //   type: 'Select',
    //   option: motor('billing_frequency').valueOf(),
    //   required: false,
    //   props: {
    //     placeholder: '',
    //   }
    // },
    {
      label: 'Other Details',
      id: 'other_detail',
      type: 'TextArea',
    },
  ],
}

const editData = {
  basicInformation: [
    { 
      label: 'Affiliate ID', 
      id: 'affiliate_code', 
      type: 'Text',
    },
    { 
      label: 'Affiliate', 
      id: 'affiliate_name', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '限制500字符',
      }
    },
    { 
      label: 'Adress 1', 
      id: 'address1', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '限制1000字符',
      }
    },
    { 
      label: 'Adress 2', 
      id: 'address2', 
      type: 'Input', 
      props: {
        placeholder: '限制1000字符',
      }
    },
    { 
      label: 'City', 
      id: 'city', 
      type: 'Input', 
      required: true,
      props: {
        placeholder: '限制200字符',
      }
    },
    { 
      label: 'Country', 
      id: 'country_id', 
      type: 'Input', 
      required: true,
      props: {
        placeholder: '限制200字符',
      }
    },
    { 
      label: 'Phone', 
      id: 'phone', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '6-16位字符',
      }
    },
    {
      label: 'First Name', 
      id: 'first_name', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '限制100字符',
      }
    },
    { 
      label: 'Last Name', 
      id: 'last_name', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '限制100字符',
      }
    },
  ],
  userDefail: [
    { 
      label: 'E-mail', 
      id: 'email', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '限制100字符',
      }
    },
    { 
      label: 'Status', 
      id: 'affiliate_status', 
      type: 'Select', 
      required: true,
      option: motor('affiliate_status').valueOf(),
      props: {
        placeholder: '6-16位字符',
      },
      onPush: v => String(v),
    },
    {
      label: 'Account Manager', 
      id: 'manager_id', 
      type: 'Search', 
      required: true,
      props: {
        placeholder: 'Offer ID/Name',
        onSearch: value => motor('app/fetchSearch').emitter({ 
          field: 'manager_email', 
          value, 
          _v: 'manager_id', 
          _n: 'manager_name'
        }),
      }
    },
  ],
  billingInformation: [
    { 
       label: 'Address 1', 
       id: 'address1', 
       type: 'Input', 
       required: true, 
       props: {
         placeholder: '',
       }
     }, 
     { 
       label: 'Address 2', 
       id: 'address2', 
       type: 'Input', 
       required: true, 
       props: {
         placeholder: '',
       }
     },
     { 
       label: 'City', 
       id: 'city', 
       type: 'Input', 
       required: true,
       option: [
         { name: '汉皇重色思倾国', value: '1' },
         { name: '御宇多年求不得', value: '2' },
         { name: '杨家有女初长成', value: '3' },
       ],
     },
     { 
       label: 'Country', 
       id: 'country_id', 
       type: 'Select', 
       required: true,
       option: motor('country_id').valueOf('en_name'),
       props: {
         placeholder: '',
       }
     },
     { 
       label: 'Region', 
       id: 'region_id', 
       type: 'Select', 
       required: true,
       option: [
         { name: '汉皇重色思倾国', value: '1' },
         { name: '御宇多年求不得', value: '2' },
         { name: '杨家有女初长成', value: '3' },
       ],
       props: {
         placeholder: '',
       }
     },
     { 
       label: 'Zipcode', 
       id: 'zip_code', 
       type: 'Input', 
       required: true,
       props: {
         placeholder: '',
       }
     },
     { 
       label: 'Payment Method', 
       id: 'payment_method', 
       type: 'Input', 
       required: true,
       props: {
         placeholder: '',
       }
     },
     { 
       label: 'Beneficiary Name', 
       id: 'beneficiary_name', 
       type: 'Input', 
       required: true,
       props: {
         placeholder: '',
       }
     },
     { 
       label: 'Bank Name', 
       id: 'bank_name', 
       type: 'Input', 
       required: true,
       props: {
         placeholder: '',
       }
     },
     { 
       label: 'Swift Number', 
       id: 'swift_number', 
       type: 'Input', 
       required: true,
       props: {
         placeholder: '',
       }
     },
     { 
       label: 'Account Number', 
       id: 'account_number', 
       type: 'Input', 
       required: true,
       props: {
         placeholder: '',
       }
     },
     { 
       label: 'Billing Frequency', 
       id: 'billing_frequency', 
       type: 'Select',
       option: motor('billing_frequency').valueOf(),
       required: true,
       props: {
         placeholder: '',
       }
     },
     {
       label: 'Other Details',
       id: 'other_detail',
       type: 'TextArea',
     }, 
  ],
  offerSettings: [
    { 
      label: '', 
      id: 'offer_name', 
      type: 'Input', 
      required: true, 
      props: {
        placeholder: '',
      }
    },
  ]
}

const editColumns = [
  { title: 'Offer Name', dataIndex: 'offer_name' },
  { title: 'Default Payout', dataIndex: 'default_payout' },
  {
    title: 'Payout', 
    dataIndex: 'payout', 
    render(v, rec, index) {
      return eventHook(e => ({ 
        type: 'saveEdit/updateEditTable',
        payload: { value: e.target.value, index }
      }), 'onBlur')(<Input defaultValue={v} placeholder='$' />)
    }
  },
  { title: Con.EffectiveTime, dataIndex: 'create_time', render: text => <Input value={moment(+text*1000).format('YYYY-MM-DD')} /> },
]

export {
  Con,
  filter,
  // addColumns,
  addFromData,  // add 页面
  editData, // edit 页面
  editColumns,
}