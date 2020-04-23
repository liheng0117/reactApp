import React, { PureComponent } from 'react'
import { Tabs } from '../'
export default class Nav extends PureComponent {
  static defaultProps = {
    deploy: [
      { key: 'b1', name: '测试一' }
    ],
    onChange: () => {}
  }
  onTabClick = (key) => {
    const { onChange, deploy } = this.props
    if (Array.isArray(deploy)) {
      let curr = deploy.find(d => d.key === key)
      curr && typeof curr.click === 'function' ? curr.click() : onChange(key)
    } else {
      onChange(key)
    }
  }
  render() {
    const { deploy, activeKey } = this.props
    // console.log(deploy, '111')
    return (
      <div className="nwd-protal">
        <Tabs activeKey={activeKey} onTabClick={this.onTabClick}>
        {
          Object.keys(deploy).map(key => (
            <Tabs.TabPane 
              tab={deploy[key]} 
              key={key} 
            />
          ))
        }
        </Tabs>
      </div>

    )
  }
}