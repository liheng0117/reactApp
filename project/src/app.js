import React from 'react'
import router from 'umi/router'
import { initCfgs } from '@/services/common'
import { message, ConfigProvider } from '@/components'

import { pathToRegexp, qs, memory } from '@/utils'
// 全局配置 antd message
message.config({ prefixCls: 'nwd-message' }) 
// 初始化JS时判断当前平台
const platform = /admin/g.test(window.location.pathname) ? 'backend' : 'frontend'
window.g_platform = platform // 注册 当前平台类型 到全局 对象
window.g_prefix_route = platform === 'backend' ? '/admin' : ''
const whitelist = ['app', 'cfgs', 'crumb'] 
// 强化路由加前缀 函数
const intensifyRoutes = (routes, prefix = '/admin') => {
  routes.forEach((route, idx) => {
    if (route.path && !route.path.includes('user')) { 
      route.path = `${prefix}${route.path}` 
      if (route.redirect) {
        route.redirect = `${prefix}${route.redirect}`
      }
      if (Array.isArray(route.routes)) {
        intensifyRoutes(route.routes, prefix)
      }
    }
  })
}
const recursionRoutes = (routes, platform) => {
  routes.forEach((route, idx) => {
    if (route.ignore && platform === route.ignore) {
      routes.splice(idx, 1)
    }
    if (Array.isArray(route.routes)) {
      recursionRoutes(route.routes, platform)
    }
    
  })
}
// 运行时配置dva
export const dva = {
  config: {

    onError(err) {
      err.preventDefault()
      switch (err.code) {
        case 401:
          window.REQUEST_LIST.forEach(item => !RegExp(/\/map/).test(item.url) && item.cancel())
          window.REQUEST_LIST = []
          message.error(err.msg)
          memory.clear()
          router.push(window.g_platform === 'backend' ? '/user/login/admin' : '/user/login')
          break
        case 500:
          message.error(err.msg)
          break
        case 503:
          message.error(err.msg)
          break
        default:
          break;
      }
    }
  }
}
// 动态修改路由
export const patchRoutes = (routes) => {
  /**初始化时，更改路由前缀区分前台路由和后台路由 */
  let prefix = platform === 'backend' ? '/admin' : ''
  intensifyRoutes(routes, prefix)
  recursionRoutes(routes, platform)
}

// 修改 入页面 props 注册当前平台
export function modifyRouteProps(props, router) {
  return { ...props, platform }
}
// export function render(oldRender) {
//   initCfgs(oldRender)
// }
// 全局统一的ConfigProvider配置
export const rootContainer = (container) => {
  const providerProps = {
    prefixCls: 'nwd',
    getPopupContainer: trigger => trigger ? trigger.parentNode : document.body
  }
  return React.createElement(ConfigProvider, providerProps, container);
}
