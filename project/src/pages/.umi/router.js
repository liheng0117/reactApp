import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/xsa/project/network-front/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    exact: true,
    _title: 'network',
    _title_default: 'network',
  },
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__User" */ '../../layouts/User'),
        })
      : require('../../layouts/User').default,
    routes: [
      {
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__models__forgetPassword.js' */ '/Users/xsa/project/network-front/src/pages/user/models/forgetPassword.js').then(
                  m => {
                    return { namespace: 'forgetPassword', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__user__models__index.js' */ '/Users/xsa/project/network-front/src/pages/user/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__login" */ '../user/login'),
            })
          : require('../user/login').default,
        exact: true,
        _title: 'network',
        _title_default: 'network',
      },
      {
        path: '/user/login/admin',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__models__forgetPassword.js' */ '/Users/xsa/project/network-front/src/pages/user/models/forgetPassword.js').then(
                  m => {
                    return { namespace: 'forgetPassword', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__user__models__index.js' */ '/Users/xsa/project/network-front/src/pages/user/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__login" */ '../user/login'),
            })
          : require('../user/login').default,
        ignore: true,
        exact: true,
        _title: 'network',
        _title_default: 'network',
      },
      {
        path: '/user/register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__models__forgetPassword.js' */ '/Users/xsa/project/network-front/src/pages/user/models/forgetPassword.js').then(
                  m => {
                    return { namespace: 'forgetPassword', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__user__models__index.js' */ '/Users/xsa/project/network-front/src/pages/user/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__register" */ '../user/register'),
            })
          : require('../user/register').default,
        exact: true,
        _title: 'network',
        _title_default: 'network',
      },
      {
        path: '/user/forgetPassword',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__models__forgetPassword.js' */ '/Users/xsa/project/network-front/src/pages/user/models/forgetPassword.js').then(
                  m => {
                    return { namespace: 'forgetPassword', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__user__models__index.js' */ '/Users/xsa/project/network-front/src/pages/user/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__forgetPassword" */ '../user/forgetPassword'),
            })
          : require('../user/forgetPassword').default,
        exact: true,
        _title: 'network',
        _title_default: 'network',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/xsa/project/network-front/node_modules/_umi-build-dev@1.10.16@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'network',
        _title_default: 'network',
      },
    ],
    _title: 'network',
    _title_default: 'network',
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__Baisc" */ '../../layouts/Baisc'),
        })
      : require('../../layouts/Baisc').default,
    isHistory: true,
    Routes: [require('../authorization.js').default],
    routes: [
      {
        path: '/dashboard',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__dashboard__model.js' */ '/Users/xsa/project/network-front/src/pages/dashboard/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__dashboard__index" */ '../dashboard/index'),
            })
          : require('../dashboard/index').default,
        title: 'Dashboard',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Dashboard',
        _title_default: 'network',
      },
      {
        path: '/reports/summary',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__reports__model.js' */ '/Users/xsa/project/network-front/src/pages/reports/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__reports__list" */ '../reports/list'),
            })
          : require('../reports/list').default,
        title: 'Summary Report',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Summary Report',
        _title_default: 'network',
      },
      {
        path: '/reports/bonus',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__reports__model.js' */ '/Users/xsa/project/network-front/src/pages/reports/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__reports__list" */ '../reports/list'),
            })
          : require('../reports/list').default,
        title: 'Bonus Report',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Bonus Report',
        _title_default: 'network',
      },
      {
        path: '/reports/order',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__reports__model.js' */ '/Users/xsa/project/network-front/src/pages/reports/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__reports__list" */ '../reports/list'),
            })
          : require('../reports/list').default,
        title: 'Order Report',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Order Report',
        _title_default: 'network',
      },
      {
        path: '/postbacks',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__postbacks__model.js' */ '/Users/xsa/project/network-front/src/pages/postbacks/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__postbacks__postbacks" */ '../postbacks/postbacks'),
            })
          : require('../postbacks/postbacks').default,
        title: 'Postbacks',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Postbacks',
        _title_default: 'network',
      },
      {
        path: '/postbacks/gPostback',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__postbacks__model.js' */ '/Users/xsa/project/network-front/src/pages/postbacks/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__postbacks__globalPostback" */ '../postbacks/globalPostback'),
            })
          : require('../postbacks/globalPostback').default,
        title: 'Global Postback',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Global Postback',
        _title_default: 'network',
      },
      {
        path: '/affiliates',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__affiliate__models__add.js' */ '/Users/xsa/project/network-front/src/pages/affiliate/models/add.js').then(
                  m => {
                    return { namespace: 'add', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__affiliate__models__list.js' */ '/Users/xsa/project/network-front/src/pages/affiliate/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__affiliate__list" */ '../affiliate/list'),
            })
          : require('../affiliate/list').default,
        title: 'Affiliates',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Affiliates',
        _title_default: 'network',
      },
      {
        path: '/affiliates/add',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__affiliate__models__add.js' */ '/Users/xsa/project/network-front/src/pages/affiliate/models/add.js').then(
                  m => {
                    return { namespace: 'add', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__affiliate__models__list.js' */ '/Users/xsa/project/network-front/src/pages/affiliate/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__affiliate__add" */ '../affiliate/add'),
            })
          : require('../affiliate/add').default,
        title: 'Add Affiliate',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Add Affiliate',
        _title_default: 'network',
      },
      {
        path: '/affiliates/:affiliates_id/edit',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__affiliate__models__add.js' */ '/Users/xsa/project/network-front/src/pages/affiliate/models/add.js').then(
                  m => {
                    return { namespace: 'add', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__affiliate__models__list.js' */ '/Users/xsa/project/network-front/src/pages/affiliate/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__affiliate__add" */ '../affiliate/add'),
            })
          : require('../affiliate/add').default,
        title: 'Edit Affiliate',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Edit Affiliate',
        _title_default: 'network',
      },
      {
        path: '/domain',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__domain__model.js' */ '/Users/xsa/project/network-front/src/pages/domain/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__domain__list" */ '../domain/list'),
            })
          : require('../domain/list').default,
        title: 'Domain',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Domain',
        _title_default: 'network',
      },
      {
        path: '/offer/create',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__offer__models__detail.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/detail.js').then(
                  m => {
                    return { namespace: 'detail', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__offer__models__list.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__offer___detail" */ '../offer/_detail'),
            })
          : require('../offer/_detail').default,
        title: 'Offers Add',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Offers Add',
        _title_default: 'network',
      },
      {
        path: '/offer/:offer_id',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__offer__models__detail.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/detail.js').then(
                  m => {
                    return { namespace: 'detail', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__offer__models__list.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__offer___detail" */ '../offer/_detail'),
            })
          : require('../offer/_detail').default,
        title: 'Offer Detail',
        ignore: 'frontend',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Offer Detail',
        _title_default: 'network',
      },
      {
        path: '/offer/:offer_id',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__offer__models__detail.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/detail.js').then(
                  m => {
                    return { namespace: 'detail', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__offer__models__list.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__offer__detail" */ '../offer/detail'),
            })
          : require('../offer/detail').default,
        title: 'Offer detail',
        ignore: 'backend',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Offer detail',
        _title_default: 'network',
      },
      {
        path: '/offer/:offer_id/edit',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__offer__models__detail.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/detail.js').then(
                  m => {
                    return { namespace: 'detail', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__offer__models__list.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__offer___detail" */ '../offer/_detail'),
            })
          : require('../offer/_detail').default,
        title: 'Offer Edit',
        ignore: 'frontend',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Offer Edit',
        _title_default: 'network',
      },
      {
        path: '/offers/creatives',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__offer__models__detail.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/detail.js').then(
                  m => {
                    return { namespace: 'detail', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__offer__models__list.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__offer__list" */ '../offer/list'),
            })
          : require('../offer/list').default,
        title: 'Offers Creatives',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Offers Creatives',
        _title_default: 'network',
      },
      {
        path: '/offers/list',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__offer__models__detail.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/detail.js').then(
                  m => {
                    return { namespace: 'detail', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__offer__models__list.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__offer__list" */ '../offer/list'),
            })
          : require('../offer/list').default,
        title: 'Offers List',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Offers List',
        _title_default: 'network',
      },
      {
        path: '/offers',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__offer__models__detail.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/detail.js').then(
                  m => {
                    return { namespace: 'detail', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__offer__models__list.js' */ '/Users/xsa/project/network-front/src/pages/offer/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__offer__list" */ '../offer/list'),
            })
          : require('../offer/list').default,
        title: 'Offers',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Offers',
        _title_default: 'network',
      },
      {
        path: '/payouts',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__payouts__models__list.js' */ '/Users/xsa/project/network-front/src/pages/payouts/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__payouts__list" */ '../payouts/list'),
            })
          : require('../payouts/list').default,
        title: 'Payouts',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Payouts',
        _title_default: 'network',
      },
      {
        path: '/account',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__account__models__index.js' */ '/Users/xsa/project/network-front/src/pages/account/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__account__detail" */ '../account/detail'),
            })
          : require('../account/detail').default,
        title: 'User Detail',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'User Detail',
        _title_default: 'network',
      },
      {
        path: '/account/billing',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__account__models__index.js' */ '/Users/xsa/project/network-front/src/pages/account/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__account__billing" */ '../account/billing'),
            })
          : require('../account/billing').default,
        title: 'User Billing',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'User Billing',
        _title_default: 'network',
      },
      {
        path: '/modifyPwd',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__models__forgetPassword.js' */ '/Users/xsa/project/network-front/src/pages/user/models/forgetPassword.js').then(
                  m => {
                    return { namespace: 'forgetPassword', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__user__models__index.js' */ '/Users/xsa/project/network-front/src/pages/user/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__resetPassword" */ '../user/resetPassword'),
            })
          : require('../user/resetPassword').default,
        title: 'Reset Password',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Reset Password',
        _title_default: 'network',
      },
      {
        path: '/member',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__member__models__list.js' */ '/Users/xsa/project/network-front/src/pages/member/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__member" */ '../member'),
            })
          : require('../member').default,
        title: 'System Users',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'System Users',
        _title_default: 'network',
      },
      {
        path: '/member/add',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__member__models__list.js' */ '/Users/xsa/project/network-front/src/pages/member/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__member__add" */ '../member/add'),
            })
          : require('../member/add').default,
        title: 'Add User',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Add User',
        _title_default: 'network',
      },
      {
        path: '/member/:id/edit',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__member__models__list.js' */ '/Users/xsa/project/network-front/src/pages/member/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__member__add" */ '../member/add'),
            })
          : require('../member/add').default,
        title: 'Edit User',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Edit User',
        _title_default: 'network',
      },
      {
        path: '/billing',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__billing__model.js' */ '/Users/xsa/project/network-front/src/pages/billing/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__billing" */ '../billing'),
            })
          : require('../billing').default,
        title: 'Billing',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'Billing',
        _title_default: 'network',
      },
      {
        path: '/test',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__test__index" */ '../test/index.js'),
            })
          : require('../test/index.js').default,
        title: '测试页面',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '测试页面',
        _title_default: 'network',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/xsa/project/network-front/node_modules/_umi-build-dev@1.10.16@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'network',
        _title_default: 'network',
      },
    ],
    _title: 'network',
    _title_default: 'network',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/xsa/project/network-front/node_modules/_umi-build-dev@1.10.16@umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: 'network',
    _title_default: 'network',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
