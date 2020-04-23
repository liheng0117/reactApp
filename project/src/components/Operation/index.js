import './styles.less'
import React, { PureComponent } from 'react'
import { Row, Col, Button } from '../'
import { BizIcon } from '@/components'

export default class Operation extends PureComponent {
  static defaultProps = {
    // deploy: [
    //   { key: 'a1', name: '测试按钮一' },
    //   { key: 'a2', name: '测试按钮二' },
    //   { key: 'a3', name: '测试按钮三' },
    //   { key: 'a4', name: '测试按钮四', disabled: true }
    // ]
  }
  onClick (item) {
   const { onClick } = this.props
   onClick && onClick(item.key, item)
  }
  render() {
    const { deploy = {}, justify } = this.props
    return (
      <Row 
        gutter={6} 
        type="flex" 
        justify={justify}
        style={{ 
          marginLeft: -12, 
          marginRight: -12,
          marginTop: 24,
          marginBottom: 24
        }}
      >
        {
          Array.isArray(deploy) && deploy.map((item, idx) => (
            <Col key={item.key || idx} style={{ paddingLeft: 12, paddingRight: 12 }}>
              <Button
                type={item.type || 'primary'} 
                onClick={item.click || this.onClick.bind(this, item)}
                disabled={item.disabled || false}
                loading={item.loading}
                className="operation-button"
              >
                { item.icon && <BizIcon type={item.icon} /> }
                <span>{item.name}</span>
              </Button>
            </Col>
          ))
        }
      </Row>
    )
  }
}