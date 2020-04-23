import { formatLocale, motor } from '@/utils'
// 自定义的平台标识状态
export const PLATFORM = {
  0: '', // 用户平台
  1: '/admin' // 管理平台
}
export const MENUS = [
  { 
    label: 'Dashboard', 
    icon: 'dashboard', 
    key: '/dashboard', 
  }, 
  { 
    label: 'Offers', 
    icon: 'copy', 
    key: '/offers', 
    children: [
      { label: 'Offers', key: '/', rule: 'frontend' }, 
      { label: 'Offers', key: '/list', rule: 'backend' }, 
      { label: 'Creatives', key: '/creatives', rule: 'backend' }
    ]
  }, 
  { 
    label: 'Reports', 
    icon: 'fund', 
    key: '/reports',
    children: [
      { label: 'Summary Report', key: '/summary', }, 
      { label: 'Order Report', key: '/order' },
      { label: 'Bonus Report', key: '/bonus' },
    ]
  }, 
  { 
    label: 'Affiliates', 
    icon: 'rollback', 
    key: '/affiliates',
    rule: 'backend',
  }, 
  { 
    label: 'Domain', 
    icon: 'global', 
    key: '/domain'
  },
  {
    label: 'Billing', 
    icon: 'dollar', 
    key: '/billing',
    rule: 'backend',
  },
  { 
    label: 'System Users', 
    icon: 'user', 
    key: '/member', 
    rule: 'backend',
    children: [
      { label: 'User List', key: '/' },
      { label: 'User Add', key: '/add' }
    ]
  },
  { 
    label: 'Postbacks', 
    icon: 'rollback', 
    key: '/postbacks',
    rule: 'frontend',
    children: [
      { label: 'Postbacks', key: '/' },
      { label: 'Global Postback', key: '/gPostback' },
    ] 
  }, 
  {
    label: 'Payouts', 
    icon: 'dollar', 
    key: '/payouts',
    rule: 'frontend',
  },
]
// 排序
export const ORDER = {
  ascend: 'asc',
  descend: 'desc',
}

// status
export const STATUS = {
  false: 0, 
  true: 1,
}

export const USER_OPTION = {
  frontend: [
    {
      icon: 'user',
      title: formatLocale('common.center'),
      link: '/account'
    }, {
      icon: 'business',
      title: formatLocale('user.billing'),
      link: '/account/billing'
    }, {
      icon: 'mail-o',
      title: formatLocale('common.contactMg'),
      click: () => motor('app/concactAM').emitter()
    }, {
      icon: 'power',
      title: formatLocale('common.logout'),
      click: () => motor('app/logout').emitter()
    }
  ],
  backend: [
    {
      icon: 'lock',
      title: 'Password Reset',
      link: '/admin/modifyPwd'
    }, {
      icon: 'power',
      title: formatLocale('common.logout'),
      click: () => motor('app/logout').emitter()
    }
  ]
}
export const SUB_IDS = [
  { key: 'subid1', name: 'Sub ID 1' },
  { key: 'subid2', name: 'Sub ID 2' },
  { key: 'subid3', name: 'Sub ID 3' },
  { key: 'subid4', name: 'Sub ID 4' },
  { key: 'subid5', name: 'Sub ID 5' }
]
