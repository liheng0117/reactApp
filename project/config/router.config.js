export default [
  // { path: '/test', component: './test/index.js', title: '测试页面' },
  {
    path: '/user',
    component: '../layouts/User',
    routes: [
      { path: '/user/login', component: './user/login' },
      { path: '/user/login/admin', component: './user/login', ignore: true },
      { path: '/user/register', component: './user/register' },
      { path: '/user/forgetPassword', component: './user/forgetPassword' },
    ]
  }, {
    path: '/', 
    component: '../layouts/Baisc', 
    isHistory: true,
    Routes: ['src/pages/authorization.js'],
    routes: [
      { path: '/', redirect: '/dashboard' },
      { path: '/dashboard', component: './dashboard/index', title: 'Dashboard' },
      { path: '/reports/summary', component: './reports/list', title: 'Summary Report' },
      { path: '/reports/bonus', component: './reports/list', title: 'Bonus Report' },
      { path: '/reports/order', component: './reports/list', title: 'Order Report' },
      { path: '/postbacks', component: './postbacks/postbacks', title: 'Postbacks' },
      { path: '/postbacks/gPostback', component: './postbacks/globalPostback', title: 'Global Postback' },
      { path: '/affiliates', component: './affiliate/list', title: 'Affiliates' },
      { path: '/affiliates/add', component: './affiliate/add', title: 'Add Affiliate' },
      { path: '/affiliates/:affiliates_id/edit', component: './affiliate/add', title: 'Edit Affiliate' },
      { path: '/domain', component: './domain/list', title: 'Domain' },
      { path: '/offer/create', component: './offer/_detail', title: 'Offers Add'},
    
      { path: '/offer/:offer_id', component: './offer/_detail', title: 'Offer Detail', ignore: 'frontend'},
      { path: '/offer/:offer_id', component: './offer/detail', title: 'Offer detail', ignore: 'backend'},
      { path: '/offer/:offer_id/edit', component: './offer/_detail', title: 'Offer Edit', ignore: 'frontend'},
      { path: '/offers/creatives', component: './offer/list', title: 'Offers Creatives' },
      { path: '/offers/list', component: './offer/list', title: 'Offers List' },
      { path: '/offers', component: './offer/list', title: 'Offers' },
      
      { path: '/payouts', component: './payouts/list', title: 'Payouts' },
      { path: '/account', component: './account/detail', title: 'User Detail' },
      { path: '/account/billing', component: './account/billing', title: 'User Billing' },
      { path: '/modifyPwd', component: './user/resetPassword', title: 'Reset Password' },
      { path: '/member', component: './member', title: 'System Users' },
      { path: '/member/add', component: './member/add', title: 'Add User' },
      { path: '/member/:id/edit', component: './member/add', title: 'Edit User' },
      { path: '/billing', component: './billing', title: 'Billing' },
      { path: '/test', component: './test/index.js', title: '测试页面' },
    ]
  },
  
]