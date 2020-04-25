import React from 'react'
import Loadable from 'react-loadable'

// 默认的loading
const Loading = () => <div style={{textAlign:'center'}}> loading...</div>

export default function(loader,loading=Loading) {
  return Loadable({
    loader,
    loading,
  })
}
