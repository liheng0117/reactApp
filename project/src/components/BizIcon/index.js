import './styles.less'
import React from 'react'

export default class BizIcon extends React.Component {
  render() {
    const { type, ...props } = this.props
    return (
      <i className={`iconfont icon-${type}`} {...props}/>
    )
  }
}
