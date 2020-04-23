import React, { PureComponent } from 'react'
import { Row, Col, Select } from 'antd'
const Option = Select.Option

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue || props.value || []
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || []
      })
    }
  }
  onParentChange = (key) => {
    let { value } = this.state
    let [ parentValue, childValue ] = value
    parentValue = key
    childValue = undefined
    this.setState({
      value: [parentValue, childValue]
    })
  }
  onChildChange = (key) => {
    let { value } = this.state
    let [ parentValue, childValue ] = value
    childValue = key
    this.setState({
      value: [parentValue, childValue]
    }, () => {
      const { onChange } = this.props
      onChange && onChange(this.state.value)
    })
  }
  render () {
    let { placeholder = [], option } = this.props
    let [ parentValue, childValue ] = this.state.value
    let current = option.find(d => String(d.value) === String(parentValue))
    let _option = current && current.children ? current.children  : []
    return (
      <Row gutter={12}>
        <Col span={12}>
          <Select 
            placeholder={placeholder[0]} 
            style={{ width: '100%' }}
            onChange={this.onParentChange}
            value={parentValue}
          >
             {
               Array.isArray(option) && option.map(item => (
                 <Option key={item.value}>{item.name}</Option>
               ))
             }
          </Select>
        </Col>
        <Col span={12}>
          <Select 
            placeholder={placeholder[1]} 
            style={{ width: '100%' }}
            onChange={this.onChildChange}
            value={childValue}
          >
            {
              Array.isArray(_option) && _option.map(item => (
                <Option key={item.value}>{item.name}</Option>
              ))
            }
          </Select>
        </Col>
      </Row>
    )
  }
}