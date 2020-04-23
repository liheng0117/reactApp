import React from 'react'
import _ from 'loadsh'
import is from 'is_js'
// 事件类型的 钩子装饰器
function eventHook(action, event = 'onClick') {
  function doEvent(...args) {
    const { _store } = window.g_app
    if (typeof action === 'function') {
      let _action = action(...args)
      _action && _store.dispatch(_action)
    } else {
      action && _store.dispatch(action)
    }
  }
  return WrappedComponent => {
    return React.cloneElement(WrappedComponent, {
      [event]: doEvent
    }) 
  }
}
// 渲染类型的 钩子装饰器
function connectHook(cb = () => {}, other = { }) {
  const { _store } = window.g_app
  let { valuePropName = 'children', field, defaultValue = null} = other
  let rest = _store && _store.getState() || {}
  if (field) rest = _.get(rest, field, defaultValue)
  let text = cb(rest)
  let children = valuePropName === 'children' ? text : null
  return WrappedComponent => {
    return React.cloneElement(WrappedComponent, {
      [valuePropName]: text
    }, children) 
  }
}
// 函数类型的 钩子装饰器
function funHook(parameter, ...others) {
  const { _store } = window.g_app
  let rest = _store && _store.getState() || {}
  let result = undefined
  if (Object.prototype.toString.call(parameter) === '[object Object]') {
    let { field, defaultValue } = parameter
    result = _.get(rest, field, defaultValue)
  } else {
    result = parameter(rest)
  }
  return func => is.function(func) ? func(result, ...others) : result
}
function eventFunc(payload) {
  const { _store } = window.g_app
  return type => _store.dispatch({ type, payload })
}

export default {
  eventHook,
  connectHook,
  eventFunc,
  funHook
}