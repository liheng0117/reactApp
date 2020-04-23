import './styles.less'
import React, { PureComponent } from 'react'
import { Statistic } from '../'
const prefixCls = 'nwd-clay'
export default class Clay extends PureComponent {
  render() {
    const { columns = [], valueColor = "#E26C6B", dataSource = {} } = this.props
    let len = columns.length
    return (
      <div className={prefixCls}>
        {
          columns.map((d, idx) => (
            <div 
              key={idx}
              className={`${prefixCls}-cell`}
              style={len === 1 ? {alignItems: 'center', width: `${ 100 / len}%` } : { width: `${ 100 / len}%`}}
            >
              <Statistic 
                title={d.title}
                value={dataSource && dataSource[d.dataIndex]}
                prefix={d.prefix}
                suffix={d.suffix}
                valueStyle={{ color: d.color || valueColor }}
              />

            </div>
          ))
        }
      </div>
    )
  }
}