import './styles.less'

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'

export default class PortalNav extends PureComponent {
  render() { 
    const { node, ...props } = this.props
    if (node) {
      return ReactDOM.createPortal(<Nav {...props}/>, node)
    }
    return <p></p>
  }
}
