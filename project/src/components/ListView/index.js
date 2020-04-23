import React, { PureComponent } from 'react'
import { List } from '../'
const Item = List.Item
export default class ListView extends PureComponent {
  render() {
    const { dataSource= [], dataIndex, dataExtra, actions } = this.props
    return (
      <List
        bordered
        dataSource={dataSource}
        renderItem={
          item => (
            <List.Item actions={actions && actions(item)}
          >
            {item[dataIndex] || 'Empty'}
          </List.Item>
        )}
      />
    )
  }
}