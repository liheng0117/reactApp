import './styles.less'
import React, { PureComponent } from 'react'
import cs from 'classnames'
import { Dropdown, Icon } from '../'
import Option from './Option'

const prefixCls = 'nwd-multi-select'

class MultiSelect extends PureComponent {
  static defaultProps = {
    cancelText: 'Cancel',
    okText: 'Apply',
    footer: true,
    placeholder: 'placeholder'
  }
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
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
  onVisibleChange = visible => {
    this.setState({ visible })
  }
  onCancel = () => {
    this.setState({ visible: false, value: []}, () => {
      this.props.onChange([])
    })
  }
  onOk = (value) => {
    this.setState({
      value,
      visible: false
    }, () => {
      this.props.onChange && this.props.onChange(value, 'ok')
    })
  }
  renderItem() {
    const { placeholder,  option } = this.props
    const { value } = this.state
    if (value.length === 0) {
      return (
        <span className={`${prefixCls}-selection--placeholder`}>{placeholder}</span>
      )
    }
    const _value = value.map(d => option.find(item => item.value === d))
    return _value.map((d, idx) => (
      <span key={`${d.name}-${idx}`} className={`${prefixCls}-selection--item`}>
        <span>{d.name}</span>
        <span className={`${prefixCls}-selection--item_break`}>,</span>
      </span>
    ))
  }
  render() {
    const { visible, value } = this.state
    const { placeholder, title, option, footer, cancelText, okText } = this.props
    const props = {
      title,
      option,
      footer,
      cancelText,
      okText,
      onOk: this.onOk,
      onCancel: this.onCancel,
      value: value
    }
    return (
      <Dropdown 
        overlay={<Option {...props}/>}
        trigger={['click']}
        visible={visible}
        onVisibleChange={this.onVisibleChange}
      >
        <div className={cs({
          [`${prefixCls}`]: true, 
          [`${prefixCls}-open`]: visible
         })}
        >
          <div className={`${prefixCls}-selection`}>
            <div className={`${prefixCls}-selection--multiple--content`} title={placeholder}>
              {this.renderItem()}
            </div>
            <span className={`${prefixCls}-arrow`}>
              <Icon type="down" />
            </span>
          </div>     
        </div>
      </Dropdown>
    )
  }
}
export default MultiSelect