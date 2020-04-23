import React, { PureComponent } from 'react'
import { Select, Spin } from 'antd'
import { _ } from '@/utils'
function isPromise (p) {
  return p && typeof p.then === 'function'
}
export default class extends PureComponent {
  constructor(props) {
    super(props)
    const { multiple, value } = props
    this.state = {
      value: props.value,
      fetching: false,
      option: []
    }
    this.onSearch = _.debounce(this.onSearch, 800)
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      })
    }
  }
  onChange = (value) => {
    this.setState({
      value: value,
      fetching: false
    }, this.onCallBack)
  }
  onSearch = (value) => {
    const { onSearch } = this.props 
    if (!!value) {
      if (onSearch) {
        this.setState({ value, fetching: true })
        onSearch(value)
        .then(option => this.setState({ value, option: option, fetching: false }))
        .catch(() => this.setState({ value, fetching: false }))
      } else {
        this.setState({
          value,
          option: []
        })
      } 
    }
  }
  onCallBack = () => {
    const { onChange } = this.props
    onChange && onChange(this.state.value)
  }
  render() {
    const { label, multiple } = this.props
    const { value, option, fetching } = this.state
    return (
      <Select
        allowClear
        showSearch
        value={value}
        placeholder={label}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        showArrow={false}
        getPopupContainer={trigger => trigger.parentNode}
        onSearch={this.onSearch}
        onChange={this.onChange}
        style={{ width: '100%' }}
      >
        {
          option.map(item => (
            <Select.Option key={item.value}>
              {item.name}
            </Select.Option>
          ))
        }
      </Select>
    )
  }
}
