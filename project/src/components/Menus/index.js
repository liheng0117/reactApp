import React from 'react'
import { Menu, Icon } from '../'
import { is } from '@/utils'
const Item = Menu.Item
const SubMenu = Menu.SubMenu

export default class extends React.Component {
  render() {
    const { option = [], onClick, selectedKey } = this.props
    return (
      <Menu 
        mode="inline" 
        style={{ border: 'none'}}
        onClick={onClick}
        selectedKeys={[selectedKey]}
      > 
        {
          is.array(option) && option.map(item => is.array(item.children) ? (
            <SubMenu
              key={item.key}
              title={
                <span>
                  {is.existy(item.icon) && <Icon type={item.icon} />} 
                  <span>{item.label}</span>
                </span>
              }
            >
            {
              item.children.map(jtem => (
                <Item key={`${item.key}${jtem.key}`} data-path={jtem.key}>
                  {is.existy(jtem.icon) && <Icon type={jtem.icon} />} 
                  <span className="nav-text">{jtem.label}</span>
                </Item>
              ))
          
            }
          </SubMenu>
          ) : (
            <Item key={item.key} data-path={item.key}>
              {is.existy(item.icon) && <Icon type={item.icon} />} 
              <span className="nav-text">{item.label}</span>
            </Item>
          ))
        }
      </Menu>
    )
  }
}