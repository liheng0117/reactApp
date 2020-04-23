import React, { PureComponent } from 'react'
import { Select, Input } from 'antd'
import { _ } from '@/utils'
const { Option } = Select
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      defaultValue: '1'
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      })
    }
  }
  onChange = (e) => {
    const { defaultValue } = this.state 
    this.setState({
      value: { key: defaultValue,value: e.target.value},
    }, this.onCallBack)
  }
  onCallBack = () => {
    const { onChange } = this.props
    onChange && onChange(this.state.value)
  }
  selectChange = defaultValue => {
    const { value } = this.state 
    this.setState({
      defaultValue,
      value: { key: defaultValue, value: value ? value.value : ''},
    },this.onCallBack)
  }
  render() {
    const { value } = this.state
    const { option } = this.props
    const inputVal = _.get(value, 'value', null)
    const key = _.get(value, 'key', '1')
    return (
      <Input
        onChange={ e => this.onChange(e)}
        style={{ width: '100%' }}
        value={inputVal}
        addonBefore={
          <Select 
            onChange={ (e) => this.selectChange(e)} 
            defaultValue={key} 
            style={{ width: 94 }}
          >
            {
              _.isArray(option) ?
              option.map( v => <Option key={v.value} value={v.value}>{v.name}</Option>) : null
            }
          </Select>
        }
      />
    )
  }
}
