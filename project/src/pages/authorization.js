import React from 'react'
import Redirect from 'umi/redirect'
import { memory } from '@/utils/'
const Authorization = (props) => {
  const platform = window.g_platform
  let authorization = memory.getToken()
  if (authorization) {
    return props.children
  }
  return <Redirect to={platform === 'backend' ? '/user/login/admin' : '/user/login'}/>
} 
export default Authorization