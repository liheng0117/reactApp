import React, { PureComponent } from 'react'
import { Card, Checkbox, Row, Col, Button } from '../'
const prefixCls = 'nwd-multi-select'

export default class Option extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || []
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value || [] })
    }
  }
  onOk = () => {
    const { value } = this.state
    const { onOk } = this.props
    onOk && onOk(value)
  }
  onCancel = () => {
    const { onCancel } = this.props
    this.onCancel && onCancel()
  }
  onChange = (value) => {
    this.setState({ value })
  }
  render() {
    const { title, option, footer, okText, cancelText } = this.props
    const { value } = this.state
    return (
      <div className={[`${prefixCls}-warp`]}>
        <Card size="small" title={title} bordered={false}>
          <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange} value={value}>
            <Row gutter={24} style={{lineHeight: 2.5}}>
            {
              option.map((option, idx) => (
                <Col 
                  className={`${prefixCls}-warp--col`}
                  span={8} 
                  key={`${idx}-${option.value}`} 
                >
                  <Checkbox value={option.value}>{option.name}</Checkbox>
                </Col>
              ))
            }
            </Row>
            {
              footer && (
                <div className={`${prefixCls}-warp--footer`}>
                  <Button type="primary" onClick={this.onOk}>{okText}</Button>
                  <Button onClick={this.onCancel}>{cancelText}</Button>
                </div>
              )
            }
          </Checkbox.Group>
        </Card>
      </div>
    )
  }
}